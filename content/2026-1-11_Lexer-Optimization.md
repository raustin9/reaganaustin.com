# Tokenizing 15 million lines of code in one second with Viper's toolchain
January 11, 2026 by Alex Austin

\
The [Viper](https://github.com/CurseSoftware/viper) toolchain is built with runtime performance first in mind.
Though in the early stages of development, we are still prioritizing good performance.

Most of the toolchain's design is inspired by the [Carbon compiler toolchain](https://github.com/carbon-language/carbon-lang) and inspired by talks given one of its leads, Chandler Carruth.
In [a CppNow talk](https://www.youtube.com/watch?v=ZI198eFghJk&pp=ygUtbW9kZXJuIGNvbXBpbGVyIGFyY2hpdGVjdHVyZSBjaGFuZGxlciBjYXJydXRo) he speaks in detail about techniques their team used to achieve great runtime performance.
Particularly for lexing and parsing, their techniques were data-driven, and coming from the world of game programming, this was familiar and exciting to me to try out in my own toolchain.

## What is a "toolchain"?
One of the first things to address is what exactly a "toolchain" is.
Well, to simplify, a compiler takes human-readable source code as input and outputs machine-runnable binary, and the "toolchain" is a libary of components that handle the steps necessary to do this.

Here are some common steps you will see in a toolchain
1. Preprocessing
1. **Tokenizing/Lexing**
1. Parsing
1. Semantic Analysis/Checking
1. Lowering
1. Optimizing
1. Linking

We are going to focus on the `Lexing` step in this process.

## What is lexing?
To understand lexing, we need to understand what a "token" is.

Let's use this example of code:
```
let x: i32 = 0;
```
This is easy for us to read. "let" declares a variable named "x" of type "i32" and sets it to 0.
But how can we make it easy for a _computer_ to understand? This is what **tokens** are for!

```cpp
enum class TokenKind
{
    Let,
    Id,
    NumberLiteral,
};

struct Token
{
    TokenKind kind;
    std::string name;
    std::size_t byte_offset;
    source::Location source_location;
};
```
What are we looking at here? The first thing is the `TokenKind`. This shows us what kind of token it is. This is nice because later when we are parsing we can see a token and go "Ok this one is `TokenKind::Let` so we are declaring a variable".

Medium and large projects can be millions of lines of code, so it is critical that this process is incredibly quick, while being accurate. Earlier I mentioned a talk given by Chandler Carruth where he goes into techniques their team used to achieve this.

I modeled my lexer largely after theirs, so I will go into the ways that I was able to tokenize 15 million lines of code in one second.

## Building a quick lexer
When building performant softare, we need to have a baseline understanding of what can tend to make programs slow. One of the most important is memory and memory handling. When we are dealing with files of millions of lines of code, we need to make sure that we are not copying millions of bytes of data around for no reason. 

For this I built some utilities:
```cpp
namespace memory
{
    class MemoryBuffer
    {
        // Info
        public:
            using StorageType = std::uint8_t;
            using SizeType = std::size_t;
        
        // Factory
        public:
            // Create a buffer from a pointer to data and its length
            [[nodiscard]] static auto from(StorageType* data, SizeType length) -> std::optional<std::unique_ptr<MemoryBuffer>>;

            // Create a buffer from a vector of existing memory
            [[nodiscard]] static auto from(std::vector<StorageType>&& vec) -> std::optional<std::unique_ptr<MemoryBuffer>>;
        
        // Public API
        public:
            // Get a `std::string_view` of this buffer.
            [[nodiscard]] auto getStringView() noexcept -> std::string_view;

        // Special Members
        public:
            // Not copyable
            MemoryBuffer(const MemoryBuffer&) = delete;
            auto operator=(const MemoryBuffer&) -> MemoryBuffer& = delete;

            // Movable
            MemoryBuffer(MemoryBuffer&&) noexcept;
            auto operator=(MemoryBuffer&&) noexcept -> MemoryBuffer&;

            // Destructor
            ~MemoryBuffer() noexcept;

        private:
            // Use factory functions to create buffer rather than constructor
            // Constructor is not `noexcept` so taht factory functions can catch
            // throws on allocation failures and return `std::nullopt`
            [[nodiscard]] explicit MemoryBuffer(StorageType* data, SizeType length);
        
        private:
            // Pointer to the owned data
            StorageType* _data { nullptr };

            // The length of the data for the buffer
            SizeType _length {};

    };
} // namespace memory
```
This is a move-only buffer object that owns its memory. Both factory functions take in a pointer and a length (this is read from `std::vector` using `.data()` and `.size()`) and copies that memory into its own buffer. Once the buffer is destroyed, it will then free this memory.

Because our factory API outputs `std::unique_ptr` we restrict to only having one owner for the buffer. We can use the `getStringBuffer()` method to get a `std::string_view` that wraps around the underlying memory. This allows us to use common string operations in our lexer.

Here is a utility for handling source files:
```cpp
namespace source
{
    class SourceBuffer
    {
        public:
            [[nodiscard]] static auto fromPath(const fs::FilePath& path) noexcept -> std::optional<SourceBuffer>;

        public:
            // Non-copyable
            SourceBuffer(const SourceBuffer&) = delete;
            auto operator=(const SourceBuffer&) -> SourceBuffer& = delete;

            // Movable
            SourceBuffer(SourceBuffer&&);
            auto operator=(SourceBuffer&&) -> SourceBuffer&;

        public:
            [[nodiscard]] auto getStringView() const noexcept -> std::string_view { return _memory->getStringView(); }

        private:
            [[nodiscard]] explicit SourceBuffer(
                fs::FilePath path,
                std::unique_ptr<memory::MemoryBuffer> memory
            ) noexcept  
                : _file_path{ std::move(path) }
                , _memory{ std::move(memory) }
            {}

        private:
            fs::FilePath _file_path {};

            std::unique_ptr<memory::MemoryBuffer> _memory { nullptr };
    };
} // namespace source
```
This is a manager object for a `memory::MemoryBuffer` that creates the memory from reading a source file.
It also includes an API for grabbing a `std::string_view` from its memory buffer.

I will get into our use of `std::string_view` shortly, but let's take a look at our lexer first:
```cpp
// lex.h
namespace toolchain::lex
{
    // Tokenize a source file
    [[nodiscard]] auto lex(source::SourceBuffer& source_buffer) -> TokenizedBuffer;
} // namespace toolchain::lex

// lex.cc
namespace toolchain::lex
{
    [[nodiscard]] auto lex(source::SourceBuffer& source_buffer) -> TokenizedBuffer
    {
        // token_spec is a global specification for tokens. I will get to this soon
        auto tokens = Lexer(source_buffer, token_spec);
        return std::move(tokens);
    }
} // namespace toolchain::lex
```
I will get to `TokenizedBuffer` and `TokenSpec` soon.
You will notice that the public `lex::lex()` function uses an internal `lex::Lexer` to tokenize the source.

Here is the API for the `lex::Lexer`:
```cpp
namespace toolchain::lex
{
    using TokenIndex = std::size_t;
    
    class [[nodiscard]] Lexer
    {
        public:
            // A result from attempting to lex a token
            class Result
            {
                public:
                    // Constructing this from a valid index means a valid token was formed
                    Result(TokenIndex discarded_index)
                        : _valid{ true }
                    { (void)discarded_index; }

                    Result(bool valid) : _valid{ valid } {}

                    static auto invalid() -> Result { return Result(false); }

                    explicit operator bool() const { return _valid; }
                private:
                    bool _valid;
            };

        // Special Members
        public:
            [[nodiscard]] explicit Lexer(source::SourceBuffer& source, TokenSpec token_spec)
                : _source{ source }
                , _token_spec{ token_spec }
            {}

        public:
            // Tokenize the held source buffer
            auto lex() && noexcept -> TokenizedBuffer;

        private:
            // Our functions for lexing the source text
            auto lexError(std::string_view text, std::size_t& position) noexcept -> Result;
            auto lexKeywordOrIdentifier(std::string_view text, std::size_t& position) noexcept -> Result;
            auto lexSymbol(std::string_view text, std::size_t& position) noexcept -> Result;
            auto lexNumericLiteral(std::string_view text, std::size_t& position) noexcept -> Result;

            auto scanIdentifier(std::string_view text, std::size_t i) noexcept -> std::string_view;
            auto skipHorizontalWhitespace(std::string_view text, std::size_t i) noexcept -> void;
            auto skipVerticalWhitespace(std::string_view text, std::size_t i) noexcept -> void;

            auto addLexedToken(TokenKind kind) noexcept -> TokenIndex;

        private:
            source::SourceBuffer& _source;
            TokenSpec _token_spec;
    };
} // namespace toolchain::lex
```

The extensive use of `std::string_view` here is extremely powerful. 
Remember what I said about memory and preventing unecessary allocations? 
The use of `std::string_view` means that we get a useful string API without reallocating or copying any memory.
They are all just views into the same buffer of memory stored in a `memory::MemoryBuffer`.

You should notice the `lex<name>` methods. These are the functions that are used to lex the source text and build the `TokenizedBuffer`.
This is our API for lexing the file withing the `toolchain::lex` module. Now we will go into how we can efficiently dispatch those functions to tokenize correctly.

## Specifying the tokens
We still need to decide what tokens actually look like.
To do this, I use a utility called the `TokenSpec` like this
```cpp
static constexpr TokenSpec Spec = TokenSpec::specify()
    .addKeyword(TokenSpecInfo("let", TokenKind::Let))
    .addKeyword(TokenSpecInfo("define", TokenKind::Define))
    .addKeyword(TokenSpecInfo("return", TokenKind::Return))
    .identifierCanStartWith('_')
    .identifierCanStartWithLower()
    .identifierCanStartWithUpper()
    .identifierCanInclude('_')
    .identifierCanIncludeLower()
    .identifierCanIncludeUpper()
    .identifierCanIncludeNumeric()
    .addSymbol(TokenSpecInfo("->", TokenKind::MinusGreater))
    .addSymbol(TokenSpecInfo("(", TokenKind::LeftParen))
    .addSymbol(TokenSpecInfo(")", TokenKind::RightParen))
    .addSymbol(TokenSpecInfo("==", TokenKind::EqualEqual))
    ...
```
Here we configure a specification with different rules for what kinds of tokens can include and start with.
This will be very useful for dynamically creating the dispatch table.

This utility is still **very rough** and is going to be improved a lot.

Also note the `static constexpr` before the variable. This means that this is configured entirely at compile time. While not saving a ton of time, it is useful to be able to create the specification without allocating any memory at runtime.

We are going to genreate the dispatch table at `consteval` and `constexpr` time as well, so we spend no time during execution allocating and building the dispatch table.

## Building the dispatch table
What is a dispatch table? We want a way to be able to efficiently call one of the `Lexer::lex...` functions based on what current character we are reading in the source file.

This about this bit of code:
```cpp
auto lex(std::string_view text, std::size_t& position) -> void 
{
    char current_char = text[position];

    if (isLetter(currentChar) || current_char == '_') 
    {
        lexKeywordOrIdentifier(text, position);
    }
    else if (isNumber(currentChar))
    {
        lexNumericLiteral(text, position);
    }
    ...
}
```
This is not terrible, but we want a way to be able to **construct a system** that handles this for us. This way, we can adjust the **configuration** without having to rewrite a ton of code.
This is where a dispatch table comes in handy.

```cpp
constexpr std::size_t DispatchTableSize = 256;
using DispatchFunctionType = auto(Lexer& lexer, std::string_view text, std::size_t position) -> void;
using DispatchTableType = std::array<, DispatchTableSize>;
static constexpr DispatchTableType DispatchTable = makeDispatchTable();
```
Let's break this down.
The `DispatchFunctionType` is an alias for the function signature of functions to be dispatched from the table.
The `DispatchTableType` is an alias for the type of the table itself.
We set the size of the table to `256` because we want to index into the table based on a `unsigned char` value.

We can leverage the power of macros to create the dispatch functions. I will explain after the example why we do it this way.
```cpp
static auto dispatchNext(Lexer& lexer, std::string_view text, std::size_t position) -> void
{
    [[likely]] if (position < text.size())
    {
        // This calls the dispatch function for the corresponding character read from the text
        MUSTTAIL return DispatchTable[static_cast<unsigned char>(text[position])](lexer, text, position);
    }
}

// Generate the dispatch functions
#define DISPATCH_LEX_TOKEN(LexMethod) \
    static auto Dispatch##LexMethod(Lexer& lexer, std::string_view text, std::size_t position) -> void \
    { \
        Lexer::Result result = lexer.LexMethod(text, position); \
        MUSTTAIL return dispatchNext(lexer, text, position); \
    }

DISPATCH_LEX_TOKEN(lexError)
DISPATCH_LEX_TOKEN(lexKeywordOrIdentifier)
DISPATCH_LEX_TOKEN(lexNumericLiteral)
```
We create a function `dispatchNext` which uses [tail recursion](https://en.wikipedia.org/wiki/Tail_call) to get the compiler to generate an iterative loop rather than an actual recursive chain (fast and prevents stack overflow).
We now call whichever dispatch function is assigned to that spot in the dispatch table.

Here is how we finally generate the dispatch table:
```cpp
static consteval auto makeDispatchTable(TokenSpec spec) -> DispatchTableType
{
    DispatchTableType table {};

    // Defaul all chars to lex an error
    for (std::size_t i = 0; i < table.size(); i++)
    {
        table[i] = &Dispatch_lexError;
    }

    // If the char is at the beginning of what is specified for an identifier
    for (std::size_t i = 0; i < spec.identifierStartByteTable().size(); i++)
    {
        if (spec.identifierStartByteTable()[i])
        {
            table[i] = &Dispatch_lexKeywordOrIdentifier;
        }
    }

    // If the char is at the beginning of what is specified for a symbol 
    for (std::size_t i = 0; i < spec.symbolStartByteTable().size(); i++)
    {
        if (spec.symbolStartByteTable()[i])
        {
            table[i] = &Dispatch_lexSymbol;
        }
    }

    return table;
}
```
Based on an input `TokenSpec` we generate a `DispatchTableType` that can dispatch proper functions depending on the currently read char.

We can now define the `Lexer::lex()` method to actual begin lexing a source buffer.
```cpp
auto Lexer::lex() && noexcept -> TokenizedBuffer
{
    std::string_view source_text = _source.getStringView();
    std::size_t position { 0 };
    dispatchNext(*this, source_text, position);

    return std::move(_buffer);
}
```
This calls the `dispatchNext` function to begin the tail-recursive call chain.

## Profiling
This has been a simplified version of the implementation details of the lexer, but gets the main techniques down.
Now we need to actually profile the tokenizer.

We can generate a test source code file of various lines of code and measure how long it takes to complete.

Let's build our toolchain:
```
$ ./go build --debug toolchain
```
and see our generated file
```
$ wc -l tests/complex.viper
 17606732 tests/complex.viper
```
and run our toolchain!
```
$ time ./viper lex -f tests/complex.viper
Input file: tests/complex.viper
Output file: __viper_lex_subcommand_no_output_file_specified
./viper lex -f tests/complex.viper  15.13s user 0.33s system 98% cpu 15.621 total
```
15 second? I thought this was supposed to be fast??

After some looking, I realized this was the `debug` build.
After doing a good ol'
```
$ ./go build --release toolchain
```
and rerunning
```
$ time ./viper_release lex -f tests/complex.viper
Input file: tests/complex.viper
Output file: __viper_lex_subcommand_no_output_file_specified
./viper_release lex -f tests/complex.viper  1.05s user 0.18s system 95% cpu 1.278 total
```
There we go. Eh, 1.05 seconds for 17 million lines of code is close enough.

## Conclusion
By preventing unecessary memory allocations, using tail-recursion, and a fast dispatch table, we are able to efficiently run through a source file and tokenize it.

And before anyone gets concerned, yes I created tests
```
$ ./viper_release test
[1/11] Running "Filesystem file to string": PASSED in 0 milliseconds
[2/11] Running "Memory buffer span cast": PASSED in 0 milliseconds
[3/11] Running "Filesystem file to vector": PASSED in 0 milliseconds
[4/11] Running "Memory buffer large vector allocation": PASSED in 51 milliseconds
[5/11] Running "Memory buffer simple allocation": PASSED in 10 milliseconds
[6/11] Running "Memory buffer vector allocation": PASSED in 0 milliseconds
[7/11] Running "Memory buffer large string view": PASSED in 30 milliseconds
[8/11] Running "Filesystem file from path": PASSED in 0 milliseconds
[9/11] Running "Memory buffer large allocation": PASSED in 14 milliseconds
[10/11] Running "Lex Keywords": PASSED in 0 milliseconds
[11/11] Running "Memory buffer basic string view": PASSED in 0 milliseconds
Ran 11 tests in 108 milliseconds. 11 Passed. 0 Failed.
```

Thanks for reading!
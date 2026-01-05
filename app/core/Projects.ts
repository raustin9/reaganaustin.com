export interface ProjectTag {
    color?: string
    iconUrl?: string
    name: string
}

export interface Project {
    name: string
    description: string

    url?: string
    icon?: string
    tags: ProjectTag[]
}

// Common tags
export const CppTag: ProjectTag = {
    name: 'C++',
    color: '#659AD2', // corresponds to var(--colors-cpp-primary)
    iconUrl: 'images/Cpp.svg'
}

export const VulkanTag: ProjectTag = {
    name: 'Vulkan',
    color: '#E38190',
    iconUrl: 'images/Vulkan.png'
}

export const CMakeTag: ProjectTag = {
    name: 'CMake',
    color: '#A3A3A3',
    iconUrl: 'images/CMake.svg'
}

export const RustTag: ProjectTag = {
    name: 'Rust',
    color: '#D6795A',
    iconUrl: 'images/Rust.svg'
}

export const PythonTag: ProjectTag = {
    name: 'Python',
    color: '#FFE873',
    iconUrl: 'images/Python.svg'
}

export const OSPRayTag: ProjectTag = {
    name: 'OSPRay',
    color: '#659AD2',
    iconUrl: undefined
}

export const JavascriptTag: ProjectTag = {
    name: 'Javascript',
    color: '#F0DB4F',
    iconUrl: undefined
}

export const WebGL2Tag: ProjectTag = {
    name: 'WebGL 2',
    color: '#D13850',
    iconUrl: undefined
}

export const SwiftTag: ProjectTag = {
    name: 'Swift',
    color: '#F05138',
    iconUrl: 'images/Swift.jpg'
}

export const GoTag: ProjectTag = {
    name: 'Go',
    color: '#29BEB0',
    iconUrl: 'images/Go.png'
}

export const NestJSTag: ProjectTag = {
    name: 'Nest.js',
    color: '#D13850',
    iconUrl: 'images/NestJs.png'
}

export const PostgreSQLTag: ProjectTag = {
    name: 'Postgres',
    color: '#336791',
    iconUrl: '/images/Postgres.png' 
}

export const ExpoTag: ProjectTag = {
    name: 'Expo',
    color: '#787878',
    iconUrl: 'images/Expo.webp' 
}

export const CSharpTag: ProjectTag = {
    name: 'C#',
    color: '#9179E4',
    iconUrl: 'images/CSharp.webp'
}

export const AzureDevOpsTag: ProjectTag = {
    name: 'Azure DevOps',
    color: '#5EACD6',
    iconUrl: 'images/Azure.webp'
}

export const VisualStudioTag: ProjectTag = {
    name: 'Visual Studio',
    color: '#D59DFF',
    iconUrl: 'images/VisualStudio.png' 
}

export const ReactNativeTag: ProjectTag = {
    name: 'React Native',
    color: '#61DAFB',
    iconUrl: 'images/React.svg' 
}

export const ReactTag: ProjectTag = {
    name: 'React',
    color: '#61DAFB',
    iconUrl: 'images/React.svg' 
}

export const NextJSTag: ProjectTag = {
    name: 'Next.js',
    color: '#787878',
    iconUrl: 'images/Vercel.svg' 
}

export const TypescriptTag: ProjectTag = {
    name: 'Typescript',
    color: '#358EF1',
    iconUrl: 'images/TS.svg' 
}

export const SqlServerTag: ProjectTag = {
    name: 'SQL Server',
    color: '#E38190',
    iconUrl: 'images/SqlServer.png' 
}
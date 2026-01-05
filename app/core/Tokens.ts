export const ColorTokens = {
    brand: {
        pink500: '#FF5964',
        green500: '#6BF178',
        blue500: '#35A7FF',
    },
    neutrals: {
        white: '#EFEFEF',
        gray100: '#DEDEDE',
        gray200: '#C4C4C4',
        gray300: '#B3B3B3',
        gray400: '#A3A3A3',
        gray500: '#8C8C8C',
        gray600: '#787878',
        gray700: '#666666',
        gray800: '#4F4F4F',
        gray900: '#333333',
        black: '#1C1C1C'
    }
}

type Theme = {
    background: Record<string, string>
    foreground: Record<string, string>
}

export const LightTheme: Theme = {
    background: {
        primary: ColorTokens.neutrals.white,
        secondary: ColorTokens.neutrals.gray200,
        buttonPrimary: ColorTokens.brand.green500
    },
    foreground: {
        primary: ColorTokens.neutrals.black
    }
}
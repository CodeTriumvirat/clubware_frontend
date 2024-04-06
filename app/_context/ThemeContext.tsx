'use client'
import { createContext, useState, useEffect } from 'react'
import { getTheme } from '@/_styles/theme'
import { getCookie } from 'cookies-next'
import { MantineThemeOverride } from '@mantine/core'

interface ThemeContextType {
    primaryColor: string
    setPrimaryColor: React.Dispatch<React.SetStateAction<string>>
    theme: MantineThemeOverride
    isLoadingTheme: boolean
}

export const ThemeContext = createContext<ThemeContextType>(
    {} as ThemeContextType
)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [primaryColor, setPrimaryColor] = useState<string>('funkyPurple')
    const [theme, setTheme] = useState<MantineThemeOverride>(
        getTheme('funkyPurple')
    )
    const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(true)

    useEffect(() => {
        const color = getCookie('primaryColor') || 'funkyPurple'
        document.documentElement.setAttribute('primary-color', color)
        setPrimaryColor(color)
        setIsLoadingTheme(false)
    }, [])

    useEffect(() => {
        setTheme(getTheme(primaryColor))
    }, [primaryColor])

    return (
        <ThemeContext.Provider
            value={{ primaryColor, setPrimaryColor, theme, isLoadingTheme }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

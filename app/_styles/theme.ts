'use client'

import { createTheme } from '@mantine/core'

import { Nunito, Nunito_Sans } from 'next/font/google'

const NunitoFont = Nunito({ subsets: ['latin'] })
const NunitoSansFont = Nunito_Sans({ subsets: ['latin'] })

export const theme = createTheme({
    fontFamily: NunitoSansFont.style.fontFamily,
    headings: {
        fontFamily: NunitoFont.style.fontFamily,
    },
    primaryColor: 'funkyPurple',
    colors: {
        funkyPurple: [
            '#f6edfd',
            '#e7d6f6',
            '#cfa9ee',
            '#b679e6',
            '#a051e1',
            '#9339dd',
            '#8d2cdd',
            '#7920c4',
            '#6b1baf',
            '#5d1499',
        ],
        habibiViolet: [
            '#fceef8',
            '#f4d8ed',
            '#ecadda',
            '#e37fc6',
            '#dc5ab6',
            '#d843ac',
            '#d638a8',
            '#bd2c93',
            '#a92483',
            '#941972',
        ],
        sickBlue: [
            '#eef8fc',
            '#ddeef4',
            '#b5dbeb',
            '#8bc8e1',
            '#6bb8d9',
            '#57aed5',
            '#4ca9d3',
            '#3e95bb',
            '#3184a8',
            '#197294',
        ],
        shittyOrange: [
            '#fff4e2',
            '#ffe9ce',
            '#fcd09f',
            '#f9b76b',
            '#f6a140',
            '#f59324',
            '#f58c13',
            '#da7905',
            '#c26a00',
            '#a95a00',
        ],
    },
    autoContrast: true,
    defaultRadius: 'md',
    cursorType: 'pointer',
})

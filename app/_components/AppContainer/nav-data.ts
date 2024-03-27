import {
    IconGauge,
    IconCalendar,
    IconBuildingWarehouse,
    IconConfetti,
    IconUsers,
    IconJumpRope,
    IconHelpOctagon,
    IconBrandHipchat,
    IconAdjustments,
} from '@tabler/icons-react'

export const navData = [
    { label: 'Dashboard', link: '/dashboard', icon: IconGauge },
    {
        label: 'Kalender',
        link: '/marketnews',
        icon: IconCalendar,
        links: [
            { label: 'Übersicht', link: '/a' },
            { label: 'Heute', link: '/b' },
            { label: 'Diese Woche', link: '/c' },
            { label: 'Diesen Monat', link: '/d' },
        ],
    },
    {
        label: 'Warenwirtschaft',
        link: '/releases',
        icon: IconBuildingWarehouse,
        links: [
            { label: 'Übersicht', link: '/' },
            { label: 'Bestand', link: '/' },
            { label: 'Einkaufsliste', link: '/' },
            { label: 'Produkte Hinzufügen', link: '/' },
            { label: 'Inventur', link: '/' },
        ],
    },
    {
        label: 'Veranstaltungen',
        link: '/analytics',
        icon: IconConfetti,
        links: [
            { label: 'Übersicht', link: '/' },
            { label: 'nächste Verantaltungen', link: '/' },
            { label: 'Veranstaltung hinzufügen', link: '/' },
        ],
    },
    { label: 'Mitarbeter*innen', link: '/analytics', icon: IconUsers },

    {
        label: 'Schichtplan',
        link: '/analytics',
        icon: IconJumpRope,
        links: [
            { label: 'Übersicht', link: '/' },
            { label: 'Schicht hinzufügen', link: '/' },
        ],
    },
    { label: 'F.A.Q.', link: '/settings', icon: IconHelpOctagon },
    { label: 'TurboChat3000', link: '/settings', icon: IconBrandHipchat },

    { label: 'Settings', link: '/settings', icon: IconAdjustments },
]

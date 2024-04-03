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
        label: 'Calendar',
        link: '/calendar',
        icon: IconCalendar,
        links: [
            { label: 'Overview', link: '/a' },
            { label: 'Today', link: '/b' },
            { label: 'This Week', link: '/c' },
            { label: 'This Month', link: '/d' },
        ],
    },
    {
        label: 'inventory',
        link: '/intentory',
        icon: IconBuildingWarehouse,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Inventory', link: '/' },
            { label: 'Shopping List', link: '/' },
            { label: 'Add Product', link: '/' },
        ],
    },
    {
        label: 'Events',
        link: '/events',
        icon: IconConfetti,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Add Event', link: '/' },
        ],
    },
    {
        label: 'Members',
        link: '/members',
        icon: IconUsers,
        links: [{ label: 'Add Member', link: '/' }],
    },

    {
        label: 'Shifts',
        link: '/shifts',
        icon: IconJumpRope,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Add Shift', link: '/' },
        ],
    },
    { label: 'F.A.Q.', link: '/faq', icon: IconHelpOctagon },
    { label: 'Settings', link: '/settings', icon: IconAdjustments },
]

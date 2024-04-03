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
        icon: IconBuildingWarehouse,
        links: [
            { label: 'Overview', link: 'inventory' },
            { label: 'Shopping List', link: 'inventory/shoppinglist' },
            { label: 'Add Product', link: 'inventory/add' },
        ],
    },
    {
        label: 'Events',
        icon: IconConfetti,
        links: [
            { label: 'Overview', link: 'events' },
            { label: 'Add Event', link: 'events/add' },
        ],
    },
    {
        label: 'Members',
        icon: IconUsers,

        links: [
            { label: 'Overview', link: 'members' },
            { label: 'Add Member', link: 'members/add' },
        ],
    },

    {
        label: 'Shifts',
        link: '/shifts',
        icon: IconJumpRope,
        links: [
            { label: 'Overview', link: 'shifts' },
            { label: 'Add Shift', link: 'shifts/add' },
        ],
    },
    { label: 'F.A.Q.', link: '/faq', icon: IconHelpOctagon },
    { label: 'Settings', link: '/settings', icon: IconAdjustments },
]

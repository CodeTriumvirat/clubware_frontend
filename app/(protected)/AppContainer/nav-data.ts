import {
    IconAdjustments,
    IconBuildingWarehouse,
    IconCalendar,
    IconClipboardData,
    IconConfetti,
    IconGauge,
    IconHelpOctagon,
    IconJumpRope,
    IconUsers,
} from '@tabler/icons-react'

export const navDataNoAdmin = [
    { label: 'Dashboard', link: '/dashboard', icon: IconGauge },
    {
        label: 'Events',
        icon: IconConfetti,
        links: [
            { label: 'Overview', link: '/events' },
            { label: 'Add Event', link: '/events/add' },
        ],
    },
    {
        label: 'Inventory',
        icon: IconBuildingWarehouse,
        links: [
            { label: 'Overview', link: '/inventory' },
            { label: 'Shopping List', link: '/inventory/shoppinglist' },
            { label: 'Add Product', link: '/inventory/add' },
        ],
    },

    {
        label: 'Members',
        icon: IconUsers,

        links: [{ label: 'Overview', link: '/members' }],
    },

    {
        label: 'Shifts',
        icon: IconJumpRope,
        links: [
            { label: 'Overview', link: '/shifts' },
            { label: 'Add Shift', link: '/shifts/add' },
        ],
    },

    {
        label: 'Guestlist',
        link: '/guestlist',
        icon: IconClipboardData,
        links: [
            { label: 'Personal Overview', link: '/guestlist' },
            { label: 'Add Guests', link: '/guestlist/add' },
            { label: 'Overview', link: '/guestlist/overview' },
        ],
    },

    { label: 'F.A.Q.', link: '/faq', icon: IconHelpOctagon },
]

export const navDataAdmin = navDataNoAdmin.map((item) => {
    const newItem = { ...item }

    if (newItem.label === 'Members' && newItem.links) {
        newItem.links = [
            ...newItem.links,
            { label: 'Add Member', link: '/members/add' },
        ]
    }

    return newItem
})

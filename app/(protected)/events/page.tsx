'use client'
import { useState } from 'react'
import {
    Card,
    Divider,
    MultiSelect,
    ScrollArea,
    Table,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { IconSearch } from '@tabler/icons-react'
import dayjs from 'dayjs'
import styles from './styles.module.css'

interface Event {
    id: string
    eventName: string
    date: string
    category: string
}

const eventData: Event[] = [
    {
        id: '1',
        eventName: 'Moonlight Masquerade',
        date: '2024-05-04',
        category: 'Party',
    },
    {
        id: '2',
        eventName: 'Glow-in-the-Dark Gala',
        date: '2024-06-15',
        category: 'Festival',
    },
    {
        id: '3',
        eventName: 'Retro Roller Disco',
        date: '2024-07-22',
        category: 'Concert',
    },
    {
        id: '4',
        eventName: 'Pirate Beach Bash',
        date: '2024-08-09',
        category: 'Bar',
    },
    {
        id: '5',
        eventName: 'Cosmic Costume Party',
        date: '2024-09-30',
        category: 'Theater',
    },
    {
        id: '6',
        eventName: 'Art & Wine Night',
        date: '2024-10-16',
        category: 'Exhibition',
    },
    {
        id: '7',
        eventName: 'Cinema Under the Stars',
        date: '2024-11-05',
        category: 'Cinema',
    },
    {
        id: '8',
        eventName: 'Annual Jazz Festival',
        date: '2024-12-23',
        category: 'Concert',
    },
    {
        id: '9',
        eventName: "New Year's Eve Bash",
        date: '2025-01-01',
        category: 'Party',
    },
    {
        id: '10',
        eventName: 'Spring Fashion Show',
        date: '2025-03-20',
        category: 'Other',
    },
]

export default function Page() {
    const [selectedDates, setSelectedDates] = useState<Date[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const [search, setSearch] = useState('')

    const eventCategories = [
        'Party',
        'Concert',
        'Bar',
        'Festival',
        'Theater',
        'Cinema',
        'Exhibition',
        'Other',
    ]

    const eventRows = eventData
        .filter(
            (event) =>
                (selectedCategory.length === 0 ||
                    selectedCategory.includes(event.category)) &&
                (search === '' ||
                    event.eventName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    dayjs(event.date).format('DD-MM-YYYY').includes(search) ||
                    event.category.toLowerCase().includes(search.toLowerCase()))
        )
        .map((event) => (
            <Table.Tr key={event.id}>
                <Table.Td>
                    <Text>{event.eventName}</Text>
                </Table.Td>
                <Table.Td>
                    <Text>{dayjs(event.date).format('DD-MM-YYYY')}</Text>
                </Table.Td>
                <Table.Td>
                    <Text>{event.category}</Text>
                </Table.Td>
            </Table.Tr>
        ))

    return (
        <>
            <Title order={3}>Event Overview</Title>
            <Divider my="lg" />

            <TextInput
                placeholder="Search by any field"
                mb="md"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />

            <MultiSelect
                my="xl"
                label="Category"
                placeholder="Select Category"
                data={eventCategories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                clearable
            />

            <Card>
                <Calendar />
            </Card>

            <Divider my="lg" />
            <ScrollArea>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Event Name</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Category</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{eventRows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </>
    )
}
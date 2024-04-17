'use client'
import {
    Button,
    Card,
    Divider,
    Flex,
    MultiSelect,
    ScrollArea,
    Table,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useState } from 'react'

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
    const [selectedDate, setSelectedDate] = useState<Date[]>([])

    const handleSelect = (date: Date) => {
        const isSelected = selectedDate.some((s) =>
            dayjs(date).isSame(s, 'date')
        )
        if (isSelected) {
            setSelectedDate((current) =>
                current.filter((d) => !dayjs(d).isSame(date, 'date'))
            )
            setSearch('')
        } else {
            setSelectedDate([date])
            setSearch(dayjs(date).format('DD-MM-YYYY'))
        }
    }

    const handleClearSearch = () => {
        setSearch('')
        setSelectedDate([])
        setSelectedCategory([])
    }

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
            <Title order={2}>Event Overview</Title>
            <Divider my="lg" />

            <Flex mb="md" justify="space-between" gap="sm">
                <TextInput
                    placeholder="Search by any field"
                    w="100%"
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <Button onClick={() => handleClearSearch()}>
                    <IconX />
                </Button>
            </Flex>

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
                <Calendar
                    getDayProps={(date) => ({
                        selected: selectedDate.some((s) =>
                            dayjs(date).isSame(s, 'date')
                        ),
                        onClick: () => handleSelect(date),
                    })}
                />
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

'use client'
import {
    Checkbox,
    Divider,
    ScrollArea,
    Table,
    Text,
    Title,
} from '@mantine/core'
import { useState } from 'react'
import styles from './styles.module.css'

interface Shift {
    id: string
    eventName: string
    date: string
}

const data: Shift[] = [
    {
        id: '1',
        eventName: 'Moonlight Masquerade',
        date: '05-04-24',
    },
    {
        id: '2',
        eventName: 'Glow-in-the-Dark Gala',
        date: '06-04-24',
    },
    {
        id: '3',
        eventName: 'Retro Roller Disco',
        date: '07-04-24',
    },
    {
        id: '4',
        eventName: 'Pirate Beach Bash',
        date: '08-04-24',
    },
    {
        id: '5',
        eventName: 'Cosmic Costume Party',
        date: '09-04-24',
    },
]
export default function Page() {
    const [selection, setSelection] = useState<string[]>([])

    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        )

    const rows = data.map((item) => (
        <Table.Tr
            key={item.id}
            className={`${selection.includes(item.id) ? styles.rowSelected : ''}`}
        >
            <Table.Td>
                <Checkbox
                    checked={selection.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                />
            </Table.Td>
            <Table.Td>
                <Text>{item.eventName}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{item.date}</Text>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <>
            <Title order={4}>Guestlist</Title>
            <Divider my="lg" />
            <Text size="lg">my next Shifts</Text>
            <ScrollArea>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: '40px' }}>
                                Auswahl
                            </Table.Th>
                            <Table.Th>Event-Name</Table.Th>
                            <Table.Th>Datum</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </>
    )
}

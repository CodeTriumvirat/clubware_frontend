'use client'
import React, { useState } from 'react'
import {
    Title,
    Text,
    Divider,
    Table,
    Checkbox,
    ScrollArea,
    Card,
} from '@mantine/core'
import styles from './styles.module.css'

interface Shift {
    id: string
    name: string
    from: string
}

const data: Shift[] = [
    {
        id: '1',
        name: 'Helene',
        from: 'Timo',
    },
    {
        id: '2',
        name: 'Henritte',
        from: 'Timo',
    },
    {
        id: '3',
        name: 'Ricardo',
        from: 'Lukas',
    },
    {
        id: '4',
        name: 'Josep',
        from: 'Lukas',
    },
    {
        id: '5',
        name: 'Lukas',
        from: 'Arasch',
    },
    {
        id: '6',
        name: 'Harald',
        from: 'Arasch',
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
                <Text>{item.name}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{item.from}</Text>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <>
            <Title order={4}>Guestlist</Title>
            <Divider my="lg" />
            <Card mt="lg">
                <Title order={5}>Party: Kinky Minki All night Long</Title>
                <Text>Datum: 23.04.2023</Text>
                <Text>Location: Kinky Minki Club</Text>
                <Text>Uhrzeit: 23 Uhr - 09 Uhr</Text>
            </Card>
            <Divider my="xl" />
            <ScrollArea>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: '40px' }}>
                                Auswahl
                            </Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>From</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </>
    )
}

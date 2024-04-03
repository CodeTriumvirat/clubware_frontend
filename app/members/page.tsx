'use client'

import cx from 'clsx'
import { useState } from 'react'
import {
    Container,
    Text,
    TextInput,
    Paper,
    Title,
    Divider,
    MultiSelect,
    Pagination,
    Table,
    Checkbox,
    ScrollArea,
    Group,
    Avatar,
    rem,
} from '@mantine/core'
import classes from './members.module.css'

const data = [
    {
        id: '1',
        avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
        name: 'Timo SpoonLika',
        job: 'Barkeeper',
        tel: '0176301798623',
    },
    {
        id: '2',
        avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
        name: 'Lukas Spooni',
        job: 'Barkeeper',
        tel: '0175301798623',
    },
    {
        id: '3',
        avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
        name: 'Arasch Lika',
        job: 'Barkeeper',
        tel: '017654554623',
    },
    {
        id: '4',
        avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
        name: 'Henritte SpoonLiker',
        job: 'Barkeeper',
        tel: '0163071798623',
    },
    {
        id: '5',
        avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
        name: 'Timo SpoonLika',
        job: 'Barkeeper',
        tel: '0171796308623',
    },
]

export default function Page() {
    const [selection, setSelection] = useState(['1'])
    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        )
    const toggleAll = () =>
        setSelection((current) =>
            current.length === data.length ? [] : data.map((item) => item.id)
        )

    const rows = data.map((item) => {
        const selected = selection.includes(item.id)
        return (
            <Table.Tr
                key={item.id}
                className={cx({ [classes.rowSelected]: selected })}
            >
                <Table.Td>
                    <Checkbox
                        checked={selection.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                    />
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={26} src={item.avatar} radius={26} />
                        <Text size="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.tel}</Table.Td>
                <Table.Td>{item.job}</Table.Td>
            </Table.Tr>
        )
    })

    return (
        <>
            <Title order={4}>Member Overview</Title>

            <MultiSelect
                my="xl"
                label="Categorie"
                placeholder="Filter"
                data={['Barkeeper', 'Technik', 'Abendleitung', 'Chef']}
            />

            <ScrollArea>
                <Table miw={800} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: rem(40) }}>
                                <Checkbox
                                    onChange={toggleAll}
                                    checked={selection.length === data.length}
                                    indeterminate={
                                        selection.length > 0 &&
                                        selection.length !== data.length
                                    }
                                />
                            </Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Job</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>

            <Pagination total={2} my="xl" />
        </>
    )
}

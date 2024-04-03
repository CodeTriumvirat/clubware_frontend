'use client'

import cx from 'clsx'
import { useEffect, useState } from 'react'
import {
    Text,
    Title,
    MultiSelect,
    Pagination,
    Table,
    Checkbox,
    ScrollArea,
    Group,
    Avatar,
    rem,
} from '@mantine/core'
import styles from './styles.module.css'
import { UserProfile } from '@/_types'

export default function UserTable({
    userProfiles,
}: {
    userProfiles: UserProfile[]
}) {
    const [selection, setSelection] = useState(['1'])

    const toggleRow = (user_id: string) =>
        setSelection((current) =>
            current.includes(user_id)
                ? current.filter((item) => item !== user_id)
                : [...current, user_id]
        )

    const toggleAll = () =>
        setSelection((current) =>
            current.length === userProfiles.length
                ? []
                : userProfiles.map((item) => item.user_id)
        )

    const rows = userProfiles.map((item) => {
        const selected = selection.includes(item.user_id)
        return (
            <Table.Tr
                key={item.user_id}
                className={cx({ [styles.rowSelected]: selected })}
            >
                <Table.Td>
                    <Checkbox
                        checked={selection.includes(item.user_id)}
                        onChange={() => toggleRow(item.user_id)}
                    />
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={26} radius={26} />
                        <Text size="sm" fw={500}>
                            {item.first_name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.phone_number}</Table.Td>
                <Table.Td>{item.address}</Table.Td>
            </Table.Tr>
        )
    })

    useEffect(() => {}, [])

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
                                    checked={
                                        selection.length === userProfiles.length
                                    }
                                    indeterminate={
                                        selection.length > 0 &&
                                        selection.length !== userProfiles.length
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
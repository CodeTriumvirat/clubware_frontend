'use client'

import { fetchUserProfilePicture } from '@/(protected)/profile/actions'
import { UserContext } from '@/_context/UserContext'
import { UserProfile } from '@/_types'
import { formatKeyToUppercaseWords } from '@/_utils/utils'
import {
    Avatar,
    Button,
    Group,
    Pagination,
    ScrollArea,
    Table,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import {
    IconArrowsSort,
    IconEdit,
    IconSortAscendingLetters,
    IconSortDescendingLetters,
} from '@tabler/icons-react'
import cx from 'clsx'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function UserTable({
    userProfiles,
}: {
    userProfiles: UserProfile[]
}) {
    interface UserProfileWithPicture extends UserProfile {
        pictureUrl: string | null
    }

    const [selection, setSelection] = useState(['1'])
    const [filter, setFilter] = useState('')
    const [sortColumn, setSortColumn] = useState('user')

    const [userProfilesWithPicture, setUserProfilesWithPicture] = useState<
        UserProfileWithPicture[]
    >([])

    const userRole = useContext(UserContext).userRole

    const handleFilter = (e: string) => {
        setFilter(e)
        console.log(filter)
    }

    const handleSort = (column: string) => {
        if (sortColumn === column || sortColumn === '-' + column) {
            if (sortColumn.startsWith('-' + column)) {
                setSortColumn('')
                console.log(sortColumn)
            } else {
                setSortColumn(`-${column}`)
                console.log(sortColumn)
            }
        } else {
            setSortColumn(column)
            console.log(sortColumn)
        }
    }

    useEffect(() => {
        const fetchPictures = async () => {
            const profilesWithPictures: UserProfileWithPicture[] =
                await Promise.all(
                    userProfiles.map(
                        async (item): Promise<UserProfileWithPicture> => ({
                            ...item,
                            pictureUrl: await fetchUserProfilePicture(
                                item.user_id
                            ),
                        })
                    )
                )
            setUserProfilesWithPicture(profilesWithPictures)
        }

        fetchPictures()
    }, [userProfiles])

    const rows = userProfilesWithPicture
        .filter((item) => {
            const firstNameMatch = item.first_name
                .toLowerCase()
                .includes(filter.toLowerCase())
            const lastNameMatch = item.last_name
                .toLowerCase()
                .includes(filter.toLowerCase())
            const userRoleMatch = formatKeyToUppercaseWords(item.user_role)
                .toLowerCase()
                .includes(filter.toLowerCase())
            const emailMatch = item.email
                .toLowerCase()
                .includes(filter.toLowerCase())

            const fullNameMatch = `${item.first_name} ${item.last_name}`
                .toLowerCase()
                .includes(filter.toLowerCase())

            return (
                firstNameMatch ||
                userRoleMatch ||
                emailMatch ||
                lastNameMatch ||
                fullNameMatch
            )
        })
        .sort((a, b) => {
            if (!sortColumn) return 0

            const isAscending = !sortColumn.startsWith('-')
            const column = sortColumn.replace(/^-/, '')

            if (column === 'user') {
                return (
                    (isAscending ? 1 : -1) *
                    a.last_name.localeCompare(b.last_name)
                )
            } else if (column === 'email') {
                return (isAscending ? 1 : -1) * a.email.localeCompare(b.email)
            } else if (column === 'job') {
                return (
                    (isAscending ? 1 : -1) *
                    formatKeyToUppercaseWords(a.user_role).localeCompare(
                        formatKeyToUppercaseWords(b.user_role)
                    )
                )
            }

            return 0
        })
        .map((item) => {
            const selected = selection.includes(item.user_id)
            const formattedUserRole = formatKeyToUppercaseWords(item.user_role)

            return (
                <Table.Tr
                    key={item.user_id}
                    className={cx({ [styles.rowSelected]: selected })}
                >
                    <Table.Td>
                        <Avatar src={item.pictureUrl} size={26} radius={26} />
                    </Table.Td>
                    <Table.Td>
                        <Text size="sm" fw={500}>
                            {item.first_name} {item.last_name}
                        </Text>
                    </Table.Td>
                    <Table.Td>{item.email}</Table.Td>
                    <Table.Td>{formattedUserRole}</Table.Td>

                    <Table.Td>
                        <Group>
                            <Button
                                component={Link}
                                href={`/members/${item.email}`}
                            >
                                Details
                            </Button>
                            {userRole === 'admin' && (
                                <Button
                                    component={Link}
                                    href={`/members/edit/${item.email}`}
                                >
                                    <IconEdit />
                                </Button>
                            )}
                        </Group>
                    </Table.Td>
                </Table.Tr>
            )
        })

    return (
        <>
            <Title order={2}>Member Overview</Title>
            <TextInput
                my="xl"
                placeholder="Filter"
                onChange={(e) => handleFilter(e.target.value)}
            ></TextInput>
            <ScrollArea>
                <Table miw={800} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th onClick={() => handleSort('user')}>
                                <Group className={styles.tableHead}>
                                    User
                                    {!sortColumn.endsWith('user') && (
                                        <IconArrowsSort />
                                    )}
                                    {sortColumn.endsWith('user') && (
                                        <>
                                            {sortColumn.startsWith('-') ? (
                                                <IconSortDescendingLetters />
                                            ) : (
                                                <IconSortAscendingLetters />
                                            )}
                                        </>
                                    )}
                                </Group>
                            </Table.Th>
                            <Table.Th onClick={() => handleSort('email')}>
                                <Group className={styles.tableHead}>
                                    Email
                                    {!sortColumn.endsWith('email') && (
                                        <IconArrowsSort />
                                    )}
                                    {sortColumn.endsWith('email') && (
                                        <>
                                            {sortColumn.startsWith('-') ? (
                                                <IconSortDescendingLetters />
                                            ) : (
                                                <IconSortAscendingLetters />
                                            )}
                                        </>
                                    )}
                                </Group>
                            </Table.Th>
                            <Table.Th onClick={() => handleSort('job')}>
                                <Group className={styles.tableHead}>
                                    Job
                                    {!sortColumn.endsWith('job') && (
                                        <IconArrowsSort />
                                    )}
                                    {sortColumn.endsWith('job') && (
                                        <>
                                            {sortColumn.startsWith('-') ? (
                                                <IconSortDescendingLetters />
                                            ) : (
                                                <IconSortAscendingLetters />
                                            )}
                                        </>
                                    )}
                                </Group>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>

            <Pagination total={2} my="xl" />
        </>
    )
}

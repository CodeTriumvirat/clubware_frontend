'use client'
import {
    Container,
    Paper,
    Title,
    Text,
    Image,
    Stack,
    Group,
    Card,
} from '@mantine/core'
import NextImage from 'next/image'
import myImage from '/public/images/bg-9.png'
import { EditProfileModal } from '@/profile/EditProfileModal'
import { notFound } from 'next/navigation'
import { UserProfile } from '@/_types'
import { useContext } from 'react'
import { UserContext } from '@/_context/UserContext'

const userFields = [
    {
        label: 'Firstname',
        id: 'first_name',
    },
    {
        label: 'Lastname',
        id: 'last_name',
    },
    {
        label: 'Birthday',
        id: 'date_of_birth',
    },
    {
        label: 'Phone',
        id: 'phone_number',
    },
    {
        label: 'Profile Bio',
        id: 'profile_bio',
    },
    {
        label: 'Address',
        id: 'address',
    },
    {
        label: 'Employment Date',
        id: 'employment_date',
    },
]

export function ProfileCard() {
    let { user } = useContext(UserContext)

    type UserProfileWithoutId = Omit<UserProfile, 'id' | 'user_id'> & {
        [key: string]: string | null
    }

    let profileTextFields

    if (user) {
        const { id, user_id, ...rest } = user
        const userProfileWithoutId: UserProfileWithoutId = rest

        profileTextFields = userFields.map((field, index) => (
            <Group
                key={index}
                gap="md"
                justify="space-between"
                align="flex-start"
                wrap="wrap"
            >
                <Text>{field.label}</Text>
                <Text>{userProfileWithoutId[field.id]}</Text>
            </Group>
        ))
    }

    return (
        <>
            {user && (
                <Container size={620} my={40}>
                    <Card p={30} radius="md" mt="xl">
                        <Stack justify="center" align="center">
                            <Title order={2}>User Profile</Title>
                            <Image
                                component={NextImage}
                                src={myImage}
                                radius="md"
                                alt="My image"
                                w="60%"
                                fit="contain"
                                mt="md"
                            />
                            <Stack gap="sm" mt="md" w="80%">
                                {profileTextFields}
                                <EditProfileModal user={user} />
                            </Stack>
                        </Stack>
                    </Card>
                </Container>
            )}
        </>
    )
}

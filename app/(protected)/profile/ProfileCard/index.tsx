'use client'
import { EditProfileModal } from '@/(protected)/profile/EditProfileModal'
import { UserContext } from '@/_context/UserContext'
import { UserProfile } from '@/_types'
import {
    Avatar,
    Button,
    Divider,
    Group,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import Link from 'next/link'
import { useContext } from 'react'

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
        label: 'Street',
        id: 'street',
    },
    {
        label: 'Postcode',
        id: 'postcode',
    },
    {
        label: 'City',
        id: 'city',
    },
    {
        label: 'Employment Date',
        id: 'employment_date',
    },
]

export function ProfileCard() {
    let { user, profilePictureUrl } = useContext(UserContext)

    type UserProfileWithoutId = Omit<UserProfile, 'id' | 'user_id'> & {
        [key: string]: string | null
    }

    let profileTextFields

    if (user) {
        const { id, user_id, ...rest } = user
        const userProfileWithoutId: UserProfileWithoutId = rest
        profileTextFields = userFields.map((field, index) => (
            <Group
                w="85%"
                key={index}
                gap="md"
                justify="space-between"
                wrap="wrap"
                mx="auto"
            >
                <Text fw={700}>{field.label}</Text>
                <Text fw={500}>{userProfileWithoutId[field.id]}</Text>
                <Divider w="100%" />
            </Group>
        ))
    }
    console.log(profilePictureUrl)

    return (
        <>
            {user && (
                <Stack align="stretch">
                    <Title mx="auto" order={2}>
                        User Profile
                    </Title>
                    <Avatar
                        src={profilePictureUrl}
                        alt="My image"
                        size={300}
                        mx="auto"
                        mt="md"
                    ></Avatar>
                    <Stack gap="md">
                        <Divider w="85%" mx="auto" />
                        {profileTextFields}
                        <EditProfileModal user={user} />
                        <Button
                            component={Link}
                            href="/password-recovery"
                            w="85%"
                            mx="auto"
                        >
                            Password recovery
                        </Button>
                    </Stack>
                </Stack>
            )}
        </>
    )
}

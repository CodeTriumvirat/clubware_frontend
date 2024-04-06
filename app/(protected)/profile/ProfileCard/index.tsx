'use client'
import {
    Container,
    Paper,
    Title,
    Text,
    Image,
    Stack,
    Group,
    Divider,
    Avatar,
} from '@mantine/core'
import NextImage from 'next/image'
import myImage from '/public/images/bg-9.png'
import { EditProfileModal } from '@/(protected)/profile/EditProfileModal'
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
                    </Stack>
                </Stack>
            )}
        </>
    )
}

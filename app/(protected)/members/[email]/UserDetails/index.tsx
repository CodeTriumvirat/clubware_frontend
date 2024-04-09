import React from 'react'
import { UserProfile } from '@/_types'
import { Text, Title, Divider, Stack, Avatar } from '@mantine/core'
import { formatKeyToUppercaseWords } from '@/_utils/utils'
import { notifications } from '@mantine/notifications'

export function UserDetails({
    userProfile,
    userProfilePicture,
}: {
    userProfile: UserProfile
    userProfilePicture: string | null
}) {
    const filteredUserProfile = Object.entries(userProfile).filter(
        ([key, value]) => key !== 'id' && key !== 'user_id' && value
    )
    const userProfileFields = filteredUserProfile.map(([key, value], index) => {
        if (key !== 'id' && key !== 'user_id' && value) {
            return (
                <Stack key={index} gap="xs">
                    <Text fw={700}>{formatKeyToUppercaseWords(key)}</Text>
                    <Text fw={500}>{value}</Text>
                    <Divider />
                </Stack>
            )
        }
    })

    return (
        <>
            <Title order={2}>User Profile</Title>
            <Divider my="sm" />
            <Avatar
                src={userProfilePicture}
                alt="User Profile image"
                size={200}
                mx="auto"
                mt="md"
            ></Avatar>
            <Divider my="sm" />

            <Stack>{userProfileFields}</Stack>
        </>
    )
}

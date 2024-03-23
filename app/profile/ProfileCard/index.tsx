import {
    Container,
    Paper,
    Title,
    Text,
    Image,
    Stack,
    Group,
} from '@mantine/core'
import NextImage from 'next/image'
import myImage from '/public/images/bg-9.png'
import { createClient } from '@/_utils/supabase/server'
import { EditProfileModal } from '@/profile/EditProfileModal'
import { User } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { UserProfile } from '@/_types'

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

export async function ProfileCard() {
    const supabase = createClient()

    let authUser = (await supabase.auth.getUser()).data.user as User

    let userProfile = (
        await supabase
            .from('user_profile')
            .select('*')
            .eq('user_id', authUser.id)
            .single()
    ).data

    if (!userProfile) notFound()

    type UserProfileWithoutId = Omit<UserProfile, 'id' | 'user_id'> & {
        [key: string]: string | null
    }

    const { id, user_id, ...rest } = userProfile
    const userProfileWithoutId: UserProfileWithoutId = rest

    const profileTextFields = userFields.map((field, index) => (
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

    return (
        <>
            {userProfile && (
                <Container size={420} my={40}>
                    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                        <Stack justify="center" align="center">
                            <Title order={2}>User Profile</Title>
                            <Image
                                component={NextImage}
                                src={myImage}
                                radius="md"
                                alt="My image"
                                w="80%"
                                h={150}
                                fit="contain"
                                mt="md"
                            />
                            <Stack gap="sm" mt="md" w="80%">
                                {profileTextFields}
                                <EditProfileModal userProfile={userProfile} />
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            )}
        </>
    )
}

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
import { createClient } from '@/utils/supabase/server'
import { NoProfile } from '@/components/Profile/NoProfile/NoProfile'
import { EditProfile } from '@/components/Profile/EditProfile/EditProfile'
import { UserProfile } from '@/types/types'
import { User } from '@supabase/supabase-js'

export async function Profile() {
    const supabase = createClient()

    let authUser = (await supabase.auth.getUser()).data.user as User

    let userProfile = (
        await supabase
            .from('user_profile')
            .select('*')
            .eq('user_id', authUser.id)
            .single()
    ).data

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
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Firstname</Text>
                                    <Text>{userProfile.first_name}</Text>
                                </Group>
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Lastname</Text>
                                    <Text>{userProfile.last_name}</Text>
                                </Group>
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Birthday</Text>
                                    <Text>{userProfile.date_of_birth}</Text>
                                </Group>
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Phone</Text>
                                    <Text>{userProfile.phone_number}</Text>
                                </Group>
                                {/* <EditProfile user={userProfile.user_id} /> */}
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            )}
            {!userProfile && <NoProfile />}
        </>
    )
}

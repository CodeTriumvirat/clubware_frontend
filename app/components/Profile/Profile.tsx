import {
    Container,
    Paper,
    Title,
    Text,
    Image,
    Flex,
    Stack,
    Group,
} from '@mantine/core'
import NextImage from 'next/image'
import myImage from '/public/images/bg-9.png'
import { createClient } from '@/utils/supabase/server'
import { NoProfile } from '../NoProfile/NoProfile'

export async function Profile() {
    const supabase = createClient()

    let { data, error } = await supabase.from('user_profile').select('*')

    return (
        <>
            {data && (
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
                                    <Text>{data[0].first_name}</Text>
                                </Group>
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Lastname</Text>
                                    <Text>{data[0].last_name}</Text>
                                </Group>
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Birthday</Text>
                                    <Text>{data[0].date_of_birth}</Text>
                                </Group>
                                <Group
                                    gap="md"
                                    justify="space-between"
                                    align="flex-start"
                                    wrap="wrap"
                                >
                                    <Text>Phone</Text>
                                    <Text>{data[0].phone_number}</Text>
                                </Group>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            )}
            {!data && <NoProfile />}
        </>
    )
}

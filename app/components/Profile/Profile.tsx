import { Container, Paper, Title, Text, Image, Flex } from '@mantine/core'
import NextImage from 'next/image'
import myImage from '/public/images/bg-9.png'
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'
import { UserProfile } from '@/types/types'

export async function Profile() {
    const supabase = createClient()

    let { data, error } = await supabase.from('user_profiles').select('*')

    return data ? (
        <Container size={420} my={40}>
            {/* <div>{JSON.stringify(data)}</div> */}
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <Flex justify="center" direction="column" align="center">
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
                    <Flex direction="column" gap="sm" mt="md" w="80%">
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Firstname</Text>
                            <Text>{data[0].first_name}</Text>
                        </Flex>
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Lastname</Text>
                            <Text>{data[0].last_name}</Text>
                        </Flex>
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Birthday</Text>
                            <Text>{data[0].date_of_birth}</Text>
                        </Flex>
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Phone</Text>
                            <Text>{data[0].phone_number}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Paper>
        </Container>
    ) : (
        ''
    )
}

import { Container, Paper, Title, Text, Image, Flex } from '@mantine/core'
import NextImage from 'next/image'
import myImage from '/public/images/bg-9.png'
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'
import { UserProfile } from '@/types/types'

export const revalidate = 0

export async function Profile() {
    const supabase = createClient()

    let { data, error } = await supabase.from('user_profiles').select('*')

    return (
        <Container size={420} my={40}>
            <div>{JSON.stringify(data)}</div>
            <Paper
                withBorder
                shadow="md"
                p={30}
                radius="md"
                mt="xl"
                className="text-black"
            >
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
                    <Flex direction="column" gap="sm" mt="md">
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Firstname</Text>
                            <Text>d</Text>
                        </Flex>
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Lastname</Text>
                            <Text>Doe</Text>
                        </Flex>
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Email</Text>
                            <Text>john@doe.com</Text>
                        </Flex>
                        <Flex
                            gap="md"
                            justify="space-between"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text>Phone</Text>
                            <Text>123-456-7890</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Paper>
        </Container>
    )
}

import { Center, Container, Flex, Paper, Title } from '@mantine/core'

export function NoProfile() {
    return (
        <Container size={400} my={40}>
            <Flex justify={Center}>
                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <Title order={2}>No Profile available</Title>
                </Paper>
            </Flex>
        </Container>
    )
}

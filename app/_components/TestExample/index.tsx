import { Text, Title } from '@mantine/core'

export function Welcome() {
    return (
        <>
            <Title ta="center" mt={100}>
                <Text
                    inherit
                    variant="gradient"
                    gradient={{ from: 'funkyPurple', to: 'white', deg: 1 }}
                >
                    Welcome to Clubware
                </Text>
            </Title>
        </>
    )
}

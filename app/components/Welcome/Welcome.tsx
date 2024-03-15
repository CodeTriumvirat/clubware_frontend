import { Title, Text, Anchor } from '@mantine/core'

export function Welcome() {
    return (
        <>
            <Title ta="center" mt={100}>
                <Text
                    inherit
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Welcome to Clubware
                </Text>
            </Title>
        </>
    )
}

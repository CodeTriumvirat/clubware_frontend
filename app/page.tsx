import { Title, Text } from '@mantine/core'

export default function Page() {
    return (
        <div>
            <Title ta="center" mt={100}>
                <Text
                    inherit
                    variant="gradient"
                    gradient={{ from: 'funkyPurple', to: 'white', deg: 1 }}
                >
                    Welcome to Clubware
                </Text>
            </Title>
        </div>
    )
}

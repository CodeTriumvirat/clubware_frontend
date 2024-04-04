import { Button, Container, Text, Title } from '@mantine/core'
import Link from 'next/link'

export default function Page() {
    return (
        <Container>
            <Title ta="center" mt={100}>
                <Button component={Link} href={`/login`}>
                    Back to Loginpage
                </Button>
                <Text inherit>Welcome</Text>
            </Title>
        </Container>
    )
}

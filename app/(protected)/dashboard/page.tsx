import { Button, Text } from '@mantine/core'
import Link from 'next/link'

export default async function Page() {
    return (
        <>
            <Button component={Link} href={`/login`}>
                Back to Loginpage
            </Button>
            <Text>Hallo Dashboard</Text>
        </>
    )
}

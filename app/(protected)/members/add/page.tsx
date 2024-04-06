'use client'
import { useAdminCheck } from '@/_hooks/useAdminCheck'
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { signup } from './actions'

export default function Page() {
    useAdminCheck('members')

    const [isClicked, setIsClicked] = useState(false)

    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setIsClicked(true)
        try {
            await signup(formData)
        } catch (error) {
            if (error instanceof Error)
                notifications.show({
                    title: 'Signup Error',
                    message: error.message,
                })
            else console.error(error)
            setIsClicked(false)
        }
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={12}>
                Add new User
            </Title>
            <Paper shadow="md" p={30} radius="md" mt="xl">
                <Stack>
                    <form onSubmit={handleSignup}>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="yourmail@example.com"
                                id="email"
                                name="email"
                                type="email"
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your Password"
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                            <Button
                                type="submit"
                                disabled={isClicked}
                                fullWidth
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Container>
    )
}

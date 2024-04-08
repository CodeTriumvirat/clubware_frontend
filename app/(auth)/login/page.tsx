'use client'

import {
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import Link from 'next/link'
import { login } from '../actions'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export default function LoginPage() {
    const [isClicked, setIsClicked] = useState(false)

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    })

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsClicked(true)

        try {
            await login(form.values)
        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    title: 'Signup Error',
                    message: error.message,
                })
            }
            console.error(error)
            setIsClicked(false)
        }
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={12}>
                Log dich ein, Habibi!
            </Title>
            <Paper shadow="md" p={30} radius="md" mt="xl">
                <Stack>
                    <form onSubmit={handleLogin}>
                        <Stack>
                            <TextInput
                                type="email"
                                label="Email"
                                placeholder="yourmail@example.com"
                                {...form.getInputProps('email')}
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your Password"
                                {...form.getInputProps('password')}
                                required
                            />
                            <Button
                                type="submit"
                                disabled={isClicked}
                                fullWidth
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                    <Group justify="space-between" grow>
                        <Button
                            variant="filled"
                            size="xs"
                            component={Link}
                            href="/auth/recovery"
                        >
                            Passwort vergessen?
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </Container>
    )
}

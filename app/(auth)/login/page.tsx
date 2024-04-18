'use client'

import {
    Button,
    Container,
    Group,
    Modal,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import Link from 'next/link'
import { login, passwordReset } from '../actions'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'

export default function LoginPage() {
    const [isClicked, setIsClicked] = useState(false)
    const [isClickedReset, setIsClickedReset] = useState(false)
    const [opened, { open, close }] = useDisclosure(false)

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
                    message: 'Invalid login credentials',
                })
            }
            console.error(error)
            setIsClicked(false)
        }
    }

    async function handleReset(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsClickedReset(true)

        try {
            await passwordReset(form.values)
            notifications.show({
                title: 'Password Reset Link sent',
                message: 'Check your email for further instructions',
            })
            close()
            setIsClickedReset(false)
        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    title: 'Signup Error',
                    message: 'Invalid login credentials',
                })
            }
            console.error(error)
            setIsClickedReset(false)
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
                    <Modal
                        opened={opened}
                        onClose={close}
                        title="Reset Password"
                    >
                        <form onSubmit={handleReset}>
                            <Stack>
                                <TextInput
                                    type="email"
                                    label="Email"
                                    placeholder="yourmail@example.com"
                                    {...form.getInputProps('email')}
                                    required
                                />
                                <Button
                                    type="submit"
                                    disabled={isClickedReset}
                                    fullWidth
                                >
                                    Reset Password
                                </Button>
                            </Stack>
                        </form>
                    </Modal>
                    <Button
                        variant="filled"
                        size="xs"
                        component={Link}
                        href="/auth/recovery"
                        onClick={open}
                        fullWidth
                    >
                        Passwort vergessen?
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}

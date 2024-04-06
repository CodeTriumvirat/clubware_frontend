'use client'
import { signup } from './actions'
import { UserContext } from '@/_context/UserContext'
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
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

export default function Page() {
    const { userRole } = useContext(UserContext)

    const [notificationShown, setNotificationShown] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const router = useRouter()

    if (userRole !== 'admin' && !notificationShown) {
        notifications.show({
            title: 'Error',
            message: 'You are not authorized to view this page',
        })
        setNotificationShown(true)
        router.push('/members')
    }

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

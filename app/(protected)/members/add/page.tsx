'use client'

import { useAdminCheck } from '@/_hooks/useAdminCheck'
import { validateEmail, validatePassword } from '@/_utils/form-validation'
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useClipboard } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { signup } from './actions'

export default function Page() {
    useAdminCheck('/members')
    const [isClicked, setIsClicked] = useState(false)

    const form = useForm({
        validate: {
            email: validateEmail,
            password: validatePassword,
        },

        validateInputOnBlur: true,
        validateInputOnChange: true,
    })

    const clipboard = useClipboard({ timeout: 500 })

    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!form.validate()) return
        setIsClicked(true)

        try {
            await signup(form.values)
            clipboard.copy(form.values.password)
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

    const isFormValid = form.isValid()

    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={12}>
                Add new User
            </Title>
            <Paper shadow="md" p={30} radius="md" mt="xl">
                <form onSubmit={handleSignup}>
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
                            disabled={!isFormValid || isClicked}
                            fullWidth
                        >
                            Sign up
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

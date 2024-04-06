'use client'

import { useForm } from '@mantine/form'
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
import { signup } from './actions'
import { useAdminCheck } from '@/_hooks/useAdminCheck'
import { validateEmail, validatePassword } from '@/_utils/form-validation'

export default function Page() {
    useAdminCheck('members')

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: validateEmail,
            password: validatePassword,
        },

        validateInputOnBlur: true,
        validateInputOnChange: true,
    })

    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!form.validate()) return

        try {
            await signup(new FormData(event.currentTarget))
        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    title: 'Signup Error',
                    message: error.message,
                })
            } else console.error(error)
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
                        <Button type="submit" disabled={!isFormValid} fullWidth>
                            Sign up
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

'use client'
import { Button, TextInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { setNewPassword } from '@/(auth)/password-recovery/actions'
import { FormEvent } from 'react'
import { notifications } from '@mantine/notifications'

export default function PasswordRecoveryForm() {
    const form = useForm({
        initialValues: {
            password: '',
        },

        validate: {
            password: (value) =>
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/.test(
                    value
                )
                    ? null
                    : 'Invalid password: Needs to have at least 8 digits, ...',
        },
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let errors = form.validate()

        if (!errors.hasErrors) {
            try {
                await setNewPassword(form.values.password)
            } catch (error) {
                if (error instanceof Error)
                    notifications.show({
                        title: 'Error',
                        message: error.message,
                    })
            }
        } else {
            notifications.show({
                title: 'Validation Error',
                message: 'Invalid password',
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        type="password"
                        label="Password"
                        id="password"
                        {...form.getInputProps('password')}
                    />
                    <Button w="50%" type="submit">
                        Submit
                    </Button>
                </Stack>
            </form>
        </>
    )
}

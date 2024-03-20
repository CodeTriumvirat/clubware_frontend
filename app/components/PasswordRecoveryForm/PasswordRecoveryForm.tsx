'use client'
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { setNewPassword } from '@/auth/recovery/actions'
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
                <TextInput
                    label="Password"
                    id="password"
                    {...form.getInputProps('password')}
                />
                <Button type="submit">Submit</Button>
            </form>
        </>
    )
}
'use client'
import { useDisclosure } from '@mantine/hooks'
import {
    Modal,
    Button,
    Text,
    Input,
    Stack,
    Group,
    TextInput,
} from '@mantine/core'
import { UserProfile } from '@/types/types'
import { useForm } from '@mantine/form'
import { FormEvent } from 'react'
import { setNewProfile } from '@/components/Profile/EditProfile/actions'
import { userAgent } from 'next/server'
import { notifications } from '@mantine/notifications'

export function EditProfile({ userProfile }: { userProfile: UserProfile }) {
    const [opened, { open, close }] = useDisclosure(false)

    const form = useForm({
        initialValues: {
            ...userProfile,
        },
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let errors = form.validate()

        if (!errors.hasErrors) {
            try {
                await setNewProfile(form.values)
                close()
            } catch (error) {
                if (error instanceof Error)
                    notifications.show({
                        title: 'Error',
                        message: error.message,
                    })
            }
        }
        if (errors.hasErrors) {
            notifications.show({
                title: 'There has been an error',
                message: 'Profile could not be updated. Please try again.',
            })
        }
    }
    const userFields = [
        {
            label: 'Firstname',
            id: 'first_name',
        },
        {
            label: 'Lastname',
            id: 'last_name',
        },
        {
            label: 'Birthday',
            id: 'date_of_birth',
        },
        {
            label: 'Phone',
            id: 'phone_number',
        },
    ]

    const formFields = userFields.map((field, index) => (
        <TextInput
            key={index}
            label={field.label}
            id={field.id}
            {...form.getInputProps(field.id)}
        />
    ))

    return (
        <>
            <Modal opened={opened} onClose={close} title="Edit Profile">
                {/* Modal content */}
                <form onSubmit={handleSubmit}>
                    <Stack>
                        {formFields}
                        <Button type="submit" mx="xs">
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            </Modal>
            <Button onClick={open}>Edit Profile</Button>
        </>
    )
}

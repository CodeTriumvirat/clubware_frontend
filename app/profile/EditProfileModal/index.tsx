'use client'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Stack, TextInput } from '@mantine/core'
import { UserProfile } from '@/_types'
import { useForm } from '@mantine/form'
import { FormEvent } from 'react'
import { updateUserProfile } from '@/profile/actions'
import { notifications } from '@mantine/notifications'

export function EditProfileModal({
    userProfile,
}: {
    userProfile: UserProfile
}) {
    const [opened, { open, close }] = useDisclosure(false)

    const form = useForm({
        initialValues: {
            ...userProfile,
        },

        validate: {
            date_of_birth: (value) =>
                value === null ||
                /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
                    ? null
                    : 'Invalid Date of Birth',

            employment_date: (value) =>
                value === null ||
                /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
                    ? null
                    : 'Invalid Employent Date',
            phone_number: (value) =>
                value === null ||
                /^(?:(?:\+|00)(?:[0-9] ?){6,14}[0-9])?$/.test(value)
                    ? null
                    : 'Number needs to start with a + or 00',
        },
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let errors = form.validate()

        if (!errors.hasErrors) {
            try {
                await updateUserProfile(form.values)
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
            type: 'text',
        },
        {
            label: 'Lastname',
            id: 'last_name',
            type: 'text',
        },
        {
            label: 'Birthday',
            id: 'date_of_birth',
            type: 'date',
        },
        {
            label: 'Phone',
            id: 'phone_number',
            type: 'text',
        },
        {
            label: 'Profile Bio',
            id: 'profile_bio',
            type: 'text',
        },
        {
            label: 'Address',
            id: 'address',
            type: 'text',
        },
        {
            label: 'Employent Date',
            id: 'employment_date',
            type: 'date',
        },
    ]

    const formFields = userFields.map((field, index) => (
        <TextInput
            key={index}
            label={field.label}
            id={field.id}
            type={field.type}
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

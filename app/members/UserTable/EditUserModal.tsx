'use client'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Stack, TextInput } from '@mantine/core'
import { UserProfile } from '@/_types'
import { useForm } from '@mantine/form'
import { FormEvent, useContext } from 'react'
import { updateSelectedUserProfile } from '@/profile/actions'
import { notifications } from '@mantine/notifications'
import { IconEdit } from '@tabler/icons-react'
import { getUserProfileClient } from '@/_utils/supabase/getUserProfileClient'

export function EditUserModal({ user_id }: { user_id: string }) {
    const [opened, { open, close }] = useDisclosure(false)

    getUserProfileClient(user)

    const form = useForm({
        initialValues: {
            ...user,
        },

        validate: {
            // date_of_birth: (value = null) =>
            //     value === null ||
            //     /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
            //         ? null
            //         : 'Invalid Date of Birth',
            // employment_date: (value = null) =>
            //     value === null ||
            //     /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
            //         ? null
            //         : 'Invalid Employent Date',
            // phone_number: (value = '') =>
            //     value !== '' &&
            //     /^(?:(?:\+|00)(?:[0-9] ?){6,14}[0-9])?$/.test(value)
            //         ? null
            //         : 'Number needs to start with a + or 00',
            // street: (value = '') =>
            //     value.length > 0 ? null : 'Invalid Address',
            // postcode: (value = '') =>
            //     value.length > 0 ? null : 'Invalid Postcode',
            // city: (value = '') => (value.length > 0 ? null : 'Invalid City'),
            // first_name: (value = '') =>
            //     value.length > 0 ? null : 'Invalid Firstname',
            // last_name: (value = '') =>
            //     value.length > 0 ? null : 'Invalid Lastname',
        },
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let errors = form.validate()

        if (!errors.hasErrors) {
            try {
                console.log(' before Profile updated')
                await updateSelectedUserProfile(form.values)
                console.log(' after Profile updated')
                close()
            } catch (error) {
                if (error instanceof Error) {
                    notifications.show({
                        title: 'Error',
                        message: error.message,
                    })
                }
            }
        } else {
            console.log('Form has errors, cannot submit')
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
            label: 'Street',
            id: 'street',
            type: 'text',
        },
        {
            label: 'Postcode',
            id: 'postcode',
            type: 'text',
        },
        {
            label: 'City',
            id: 'city',
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
            size="md"
            {...form.getInputProps(field.id)}
        />
    ))

    return (
        <>
            <Modal opened={opened} onClose={close} title="Edit Profile">
                <form onSubmit={handleSubmit}>
                    <Stack mt="md">
                        {formFields}
                        <Button type="submit" mt="xs" mx="xl">
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            </Modal>
            <Button size="xs" onClick={open}>
                <IconEdit />
            </Button>
        </>
    )
}

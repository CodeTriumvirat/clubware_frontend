'use client'
import { Button, Select, Stack, TextInput, Textarea } from '@mantine/core'
import { UserProfile } from '@/_types'
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import { FormEvent, useContext, useState } from 'react'
import { updateSelectedUserProfile } from '@/profile/actions'
import { notifications } from '@mantine/notifications'
import { UserContext } from '@/_context/UserContext'
import { useRouter } from 'next/navigation'
import { userRoleOptions } from '@/_types'

export default function EditUser({
    userProfile,
}: {
    userProfile: UserProfile
}) {
    const router = useRouter()

    const { userRole } = useContext(UserContext)

    const [notificationShown, setNotificationShown] = useState(false)

    if (userRole !== 'admin' && !notificationShown) {
        notifications.show({
            title: 'Error',
            message: 'You are not authorized to view this page',
        })
        setNotificationShown(true)
        router.push('/members')
    }

    const form = useForm({
        initialValues: {
            ...userProfile,
        },

        validate: {
            date_of_birth: (value = null) =>
                value === null ||
                /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
                    ? null
                    : 'Invalid Date of Birth',
            employment_date: (value = null) =>
                value === null ||
                /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
                    ? null
                    : 'Invalid Employent Date',
            phone_number: (value = '') =>
                value !== '' &&
                /^(?:(?:\+|00)(?:[0-9] ?){6,14}[0-9])?$/.test(value)
                    ? null
                    : 'Number needs to start with a + or 00',
            street: (value = '') =>
                value.length > 0 ? null : 'Invalid Address',
            postcode: (value = '') =>
                value.length > 0 ? null : 'Invalid Postcode',
            city: (value = '') => (value.length > 0 ? null : 'Invalid City'),
            first_name: (value = '') =>
                value.length > 0 ? null : 'Invalid Firstname',
            last_name: (value = '') =>
                value.length > 0 ? null : 'Invalid Lastname',
        },
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let errors = form.validate()

        console.log(form.values)

        if (!errors.hasErrors) {
            try {
                await updateSelectedUserProfile(form.values)
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
            console.error(errors.errors)
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
        { label: 'Notes', id: 'notes', type: 'textarea' },
        { label: 'User Role', id: 'user_role', type: 'user_role' },
    ]

    const formFields = userFields.map((field, index) => {
        if (field.type === 'textarea') {
            return (
                <Textarea
                    key={index}
                    label={field.label}
                    id={field.id}
                    size="md"
                    {...form.getInputProps(field.id)}
                />
            )
        } else if (field.type === 'date') {
            return (
                <DateInput
                    key={index}
                    label={field.label}
                    id={field.id}
                    valueFormat="DD.MM.YYYY"
                    size="md"
                    {...form.getInputProps(field.id)}
                />
            )
        } else if (field.type === 'user_role') {
            return (
                <Select
                    key={index}
                    label={field.label}
                    id={field.id}
                    size="md"
                    data={userRoleOptions}
                    {...form.getInputProps(field.id)}
                />
            )
        } else {
            return (
                <TextInput
                    key={index}
                    label={field.label}
                    id={field.id}
                    type={field.type}
                    size="md"
                    {...form.getInputProps(field.id)}
                />
            )
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack mt="md">
                    {formFields}
                    <Button type="submit" mt="xs" mx="xl">
                        Save Changes
                    </Button>
                </Stack>
            </form>
        </>
    )
}

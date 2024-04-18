'use client'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Stack, TextInput } from '@mantine/core'
import { UserProfile } from '@/_types'
import { useForm } from '@mantine/form'
import { FormEvent, useContext } from 'react'
import { updateUserProfile } from '@/(protected)/profile/actions'
import { notifications } from '@mantine/notifications'
import { DataDropzone } from '@/(protected)/profile/DataDropzone'
import { MIME_TYPES } from '@mantine/dropzone'
import { UserContext } from '@/_context/UserContext'
import { DateInput } from '@mantine/dates'
import { formatDateToString, formatStringToDate } from '@/_utils/utils'

export function EditProfileModal({ user }: { user: UserProfile }) {
    const [opened, { open, close }] = useDisclosure(false)
    const { setUser } = useContext(UserContext)

    const form = useForm({
        initialValues: {
            ...user,
            date_of_birth: formatStringToDate(user.date_of_birth),
            employment_date: formatStringToDate(user.employment_date),
        },

        validate: {
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

        if (!errors.hasErrors) {
            try {
                await updateUserProfile({
                    ...form.values,
                    date_of_birth: formatDateToString(
                        form.values.date_of_birth
                    ),
                    employment_date: formatDateToString(
                        form.values.employment_date
                    ),
                })
                setUser({
                    ...form.values,
                    date_of_birth: formatDateToString(
                        form.values.date_of_birth
                    ),
                    employment_date: formatDateToString(
                        form.values.employment_date
                    ),
                })
                console.log('Profile updated')
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

    const formFields = userFields.map((field, index) => {
        if (field.type === 'date') {
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
            <Modal opened={opened} onClose={close} title="Edit Profile">
                <Stack>
                    <DataDropzone
                        maxSize={2 * 1024 ** 2}
                        accept={[
                            MIME_TYPES.png,
                            MIME_TYPES.jpeg,
                            MIME_TYPES.webp,
                        ]}
                        multiple={false}
                        topText="Drag and drop your profile picture here or click to browse"
                        bottomText="Attach one file, it should not exceed 2mb"
                        user_id={user.user_id}
                    />
                </Stack>
                <form onSubmit={handleSubmit}>
                    <Stack mt="md">
                        {formFields}
                        <Button type="submit" mt="xs" mx="xl">
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            </Modal>
            <Button onClick={open} mt="lg" mx="auto" w="85%">
                Edit Profile
            </Button>
        </>
    )
}

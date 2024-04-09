'use client'
import {
    deleteUser,
    updateSelectedUserProfile,
} from '@/(protected)/profile/actions'
import { useAdminCheck } from '@/_hooks/useAdminCheck'
import { UserProfile, userRoleOptions } from '@/_types'
import {
    validateCity,
    validateFirstName,
    validateLastName,
    validatePhoneNumber,
    validatePostcode,
    validateStreet,
} from '@/_utils/form-validation'
import { formatDateToString, formatStringToDate } from '@/_utils/utils'
import {
    Button,
    Group,
    Select,
    Stack,
    TextInput,
    Textarea,
    Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditUser({
    userProfile,
}: {
    userProfile: UserProfile
}) {
    useAdminCheck('/members')
    const [isClicked, setIsClicked] = useState(false)
    const [opened, { open, close }] = useDisclosure(false)

    const form = useForm({
        initialValues: {
            ...userProfile,
            date_of_birth: formatStringToDate(userProfile.date_of_birth),
            employment_date: formatStringToDate(userProfile.employment_date),
        },

        validate: {
            phone_number: validatePhoneNumber,
            street: validateStreet,
            postcode: validatePostcode,
            city: validateCity,
            first_name: validateFirstName,
            last_name: validateLastName,
        },

        validateInputOnBlur: true,
        validateInputOnChange: true,
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!form.validate()) return
        setIsClicked(true)

        try {
            await updateSelectedUserProfile({
                ...form.values,
                date_of_birth: formatDateToString(form.values.date_of_birth),
                employment_date: formatDateToString(
                    form.values.employment_date
                ),
            })
        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    title: 'Error',
                    message: error.message,
                })
            }
            console.error(error)
            setIsClicked(false)
        }
    }

    const handleDelete = async () => {
        try {
            if (userProfile.user_id) {
                await deleteUser(userProfile.user_id)
            }
        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    title: 'Error',
                    message: error.message,
                })
            }
            console.error(error)
        }
    }

    const isFormValid = form.isValid()

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
                    <Group mt="xs" mx="xl" justify="space-around">
                        <Button
                            type="submit"
                            disabled={!isFormValid || isClicked}
                        >
                            Save Changes
                        </Button>
                        <Button color="yellow" onClick={() => form.reset()}>
                            Discard Changes
                        </Button>
                        <Button color="red" onClick={open}>
                            Delete User
                        </Button>
                    </Group>
                </Stack>
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Are you sure you want to delete the User?"
                    centered
                >
                    <Group justify="space-around">
                        <Button
                            w="47%"
                            color="red"
                            onClick={() => handleDelete()}
                        >
                            Yes, delete User
                        </Button>
                        <Button
                            w="47%"
                            fw="bold"
                            color="yellow"
                            onClick={close}
                        >
                            No
                        </Button>
                    </Group>
                </Modal>
            </form>
        </>
    )
}

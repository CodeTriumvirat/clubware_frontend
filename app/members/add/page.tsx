'use client'
import {
    Container,
    Button,
    Divider,
    TextInput,
    Stack,
    Textarea,
    NumberInput,
    Title,
    Group,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'

export default function Page() {
    const form = useForm({
        initialValues: {
            name: '',
            lastname: '',
            address: '',
            postcode: '',
            city: '',
            tel: '',
            email: '',
            birthday: null as Date | null,
            emergencyContact: '',
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            postcode: (value) =>
                value && /^\d+$/.test(value)
                    ? null
                    : 'Postcode must be numeric',
        },
    })

    return (
        <>
            <Title order={4}>Add Member</Title>
            <Divider my="xl" />

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Stack>
                    <TextInput
                        required
                        label="Name"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        required
                        label="Lastname"
                        {...form.getInputProps('lastname')}
                    />
                    <TextInput
                        required
                        label="Address"
                        {...form.getInputProps('address')}
                    />
                    <NumberInput
                        required
                        label="Postcode"
                        rightSection=" "
                        {...form.getInputProps('postcode')}
                    />
                    <TextInput
                        required
                        label="City"
                        {...form.getInputProps('city')}
                    />
                    <TextInput
                        required
                        label="Tel"
                        {...form.getInputProps('tel')}
                    />
                    <TextInput
                        required
                        label="Email"
                        {...form.getInputProps('email')}
                    />
                    <DatePickerInput
                        required
                        label="Birthday"
                        placeholder="Pick date"
                        {...form.getInputProps('birthday')}
                    />
                    <Textarea
                        required
                        label="Emergency Contact"
                        {...form.getInputProps('emergencyContact')}
                    />
                    <Group>
                        <Button type="submit">Submit</Button>
                        <Button color="red" onClick={() => form.reset()}>
                            Delete
                        </Button>
                    </Group>
                </Stack>
            </form>
        </>
    )
}

'use client'
import { useRef } from 'react'
import {
    Button,
    Divider,
    Group,
    MultiSelect,
    NumberInput,
    Stack,
    TextInput,
    Title,
    FileInput,
    ActionIcon,
} from '@mantine/core'
import { DatePicker, DatePickerInput, TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconClock } from '@tabler/icons-react'

export default function AddEventPage() {
    const form = useForm({
        initialValues: {
            eventName: '',
            eventDate: null as Date | null,
            eventTime: null as Date | null,
            entryFee: undefined,
            organizer: '',
            organizerEmail: '',
            content: '',
            flyer: null,
            categories: [],
        },

        validate: {
            organizerEmail: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
        },
    })

    const timeInputRef = useRef<HTMLElement | null>(null)

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray">
            <IconClock style={{ width: 16, height: 16 }} stroke={1.5} />
        </ActionIcon>
    )

    return (
        <>
            <Title order={4}>Add Event</Title>
            <Divider my="xl" />

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Stack>
                    <MultiSelect
                        data={[
                            'Party',
                            'Concert',
                            'Bar',
                            'Festival',
                            'Theater',
                            'Cinema',
                            'Exhibition',
                            'Other',
                        ]}
                        label="Category"
                        placeholder="Select categories"
                        {...form.getInputProps('categories')}
                    />
                    <TextInput
                        required
                        label="Event Name"
                        {...form.getInputProps('eventName')}
                    />
                    <DatePickerInput
                        required
                        label="Date"
                        placeholder="Select date"
                        {...form.getInputProps('eventDate')}
                    />
                    <TimeInput
                        label="Time"
                        placeholder="Select time"
                        {...form.getInputProps('eventTime')}
                        rightSection={pickerControl}
                    />
                    <NumberInput
                        label="Entry Fee"
                        defaultValue={0}
                        {...form.getInputProps('entryFee')}
                    />
                    <TextInput
                        required
                        label="Organizer"
                        {...form.getInputProps('organizer')}
                    />
                    <TextInput
                        required
                        label="Organizer Email"
                        {...form.getInputProps('organizerEmail')}
                    />
                    <TextInput
                        label="Content"
                        {...form.getInputProps('content')}
                    />
                    <FileInput
                        label="Upload Flyer"
                        accept="image/png,image/jpeg"
                        {...form.getInputProps('flyer')}
                    />
                    <Group>
                        <Button type="submit">Submit</Button>
                        <Button color="red" onClick={() => form.reset()}>
                            Reset
                        </Button>
                    </Group>
                </Stack>
            </form>
        </>
    )
}

import {
    Title,
    Text,
    Divider,
    Card,
    Stack,
    Button,
    Textarea,
    TextInput,
    Group,
} from '@mantine/core'

export default function Page() {
    return (
        <>
            <Title order={4}>Guestlist</Title>
            <Divider my="lg" />
            <Text size="lg">Add friends to your Guestlist</Text>
            <Card mt="lg">
                <Title order={5}>Party: Kinky Minki All night Long</Title>
                <Text>Datum: 23.04.2023</Text>
                <Text>Location: Kinky Minki Club</Text>
                <Text>Uhrzeit: 23 Uhr - 09 Uhr</Text>
            </Card>
            <Divider my="xl" />
            <Stack>
                <Text size="lg">Guestlist Slot Nr. 1</Text>
                <TextInput required label="Name" placeholder="Name" />
                <Divider my="xl" />
                <Text size="lg">Guestlist Slot Nr. 2</Text>
                <TextInput required label="Name" placeholder="Name" />
                <Group mt="xl">
                    <Button type="submit">Submit</Button>
                    <Button color="red">Delete</Button>
                </Group>
            </Stack>
        </>
    )
}

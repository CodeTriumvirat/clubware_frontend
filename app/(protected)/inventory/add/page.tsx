'use client'
import {
    Container,
    Button,
    Divider,
    TextInput,
    Stack,
    NumberInput,
    Title,
    Group,
    Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'

export default function AddProductPage() {
    const form = useForm({
        initialValues: {
            name: '',
            stock: 0,
            purchasePrice: 0.0,
            sellingPrice: 0.0,
            category: '',
            note: '',
        },

        // Optional: Validierung der Eingaben hinzufügen
        validate: {
            name: (value) => (value ? null : 'Name is required'),
            stock: (value) => (value >= 0 ? null : 'Stock must be 0 or more'),
            purchasePrice: (value) =>
                value >= 0 ? null : 'Purchase price must be 0 or more',
            sellingPrice: (value) =>
                value >= 0 ? null : 'Selling price must be 0 or more',
            category: (value) => (value ? null : 'Category is required'),
        },
    })

    return (
        <>
            <Title order={4}>Add Product</Title>
            <Divider my="xl" />

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Stack>
                    <TextInput
                        required
                        label="Name"
                        {...form.getInputProps('name')}
                    />
                    <NumberInput
                        required
                        label="Stock"
                        {...form.getInputProps('stock')}
                    />
                    <NumberInput
                        required
                        label="Purchase Price"
                        {...form.getInputProps('purchasePrice')}
                    />
                    <NumberInput
                        required
                        label="Selling Price"
                        {...form.getInputProps('sellingPrice')}
                    />
                    <TextInput
                        required
                        label="Category"
                        {...form.getInputProps('category')}
                    />
                    <Textarea label="Note" {...form.getInputProps('note')} />
                    <Group mt="md">
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

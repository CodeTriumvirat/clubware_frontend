import { Group, Text, rem, Image, SimpleGrid, CloseButton } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone'
import { useState } from 'react'
import { useForm } from '@mantine/form'

export interface DataDropzoneProps extends Partial<DropzoneProps> {
    topText?: string
    bottomText?: string
}

interface FormValues {
    files: File[]
}

export function DataDropzone({
    topText,
    bottomText,
    ...props
}: DataDropzoneProps) {
    const form = useForm<FormValues>({
        initialValues: { files: [] },
    })

    const [previews, setPreviews] = useState<JSX.Element[]>([])

    const handleDrop = (files: FileWithPath[]) => {
        form.setFieldValue('files', files)
    }

    const selectedFiles = form.values.files.map((file, index) => (
        <Text key={file.name}>
            <b>{file.name}</b> ({(file.size / 1024).toFixed(2)} kb)
            <CloseButton
                size="xs"
                onClick={() =>
                    form.setFieldValue(
                        'files',
                        form.values.files.filter((_, i) => i !== index)
                    )
                }
            />
        </Text>
    ))

    return (
        <>
            <Dropzone
                {...props}
                onDrop={(files) => handleDrop(files)}
                onReject={() =>
                    form.setFieldError('files', 'Select images only')
                }
            >
                <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: 'none' }}
                >
                    <Dropzone.Accept>
                        <IconUpload
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: 'var(--mantine-color-blue-6)',
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: 'var(--mantine-color-red-6)',
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: 'var(--mantine-color-dimmed)',
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            {topText ||
                                ' Drag files here or click to select files'}
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            {bottomText ||
                                'Attach as many files as you like, each file should not exceed 5mb'}
                        </Text>
                    </div>
                </Group>
                <SimpleGrid
                    cols={{ base: 1, sm: 4 }}
                    mt={previews.length > 0 ? 'xl' : 0}
                >
                    {previews}
                </SimpleGrid>
            </Dropzone>
            {form.errors.files && (
                <Text c="red" mt={5}>
                    {form.errors.files}
                </Text>
            )}

            {selectedFiles.length > 0 && (
                <>
                    <Text mb={5} mt="md">
                        Selected files:
                    </Text>
                    {selectedFiles}
                </>
            )}
        </>
    )
}

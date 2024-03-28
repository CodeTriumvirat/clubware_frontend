import {
    Group,
    Text,
    rem,
    Image,
    SimpleGrid,
    CloseButton,
    Button,
} from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { uploadProfilePicture } from '../actions'

export interface DataDropzoneProps extends Partial<DropzoneProps> {
    topText?: string
    bottomText?: string
    user_id: string
}

export function DataDropzone({
    topText,
    bottomText,
    user_id,
    ...props
}: DataDropzoneProps) {
    const [error, setError] = useState('')
    const formData = new FormData()

    // const [previews, setPreviews] = useState<JSX.Element[]>([])

    // const selectedFile = form.values.files.map((file, index) => (
    //     <Text key={file.name}>
    //         <b>{file.name}</b> ({(file.size / 1024).toFixed(2)} kb)
    //         <CloseButton
    //             size="xs"
    //             onClick={() =>
    //                 form.setFieldValue(
    //                     'files',
    //                     form.values.files.filter((_, i) => i !== index)
    //                 )
    //             }
    //         />
    //     </Text>
    // ))
    async function handleSubmit() {
        try {
            await uploadProfilePicture(formData, user_id)
        } catch (error) {
            if (error instanceof Error)
                notifications.show({
                    title: 'Error',
                    message: error.message,
                })
        }
    }

    return (
        <>
            <Dropzone
                {...props}
                onDrop={(files) => formData.append('file', files[0])}
                onReject={() =>
                    setError(
                        'Only select image files from the type jpg, jpeg, png, webp'
                    )
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
                {/* <SimpleGrid
                    cols={{ base: 1, sm: 4 }}
                >
                    {previews}
                </SimpleGrid> */}
            </Dropzone>

            {/* {selectedFiles.length > 0 && (
                <>
                    <Text mb={5} mt="md">
                        Selected files:
                    </Text>
                    {selectedFiles}
                </>
            )} */}
            {error !== '' && (
                <Text c="red" mt={5}>
                    {error}
                </Text>
            )}
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    )
}

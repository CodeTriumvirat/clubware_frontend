import { Group, Text, rem, Image, CloseButton, Button } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, DropzoneProps } from '@mantine/dropzone'
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
    const [selectedFile, setSelectedFile] = useState<File>()
    const [imageUrl, setImageUrl] = useState<string>('')
    const formData = new FormData()

    let selectedFileDisplay

    if (selectedFile) {
        selectedFileDisplay = (
            <Text key={selectedFile.name}>
                <b>{selectedFile.name}</b> (
                {(selectedFile.size / 1024).toFixed(2)} kb)
                <CloseButton
                    size="xs"
                    onClick={() => {
                        formData.delete('file')
                        setSelectedFile(undefined)
                        setImageUrl('')
                    }}
                />
            </Text>
        )
    }

    async function onDrop(file: File) {
        setSelectedFile(file)
        setImageUrl(URL.createObjectURL(file))
        setError('')
    }

    async function handleSubmit() {
        try {
            if (selectedFile) {
                formData.append('file', selectedFile)
                await uploadProfilePicture(formData, user_id)
            } else {
                console.log('No file selected for upload')
            }
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
                onDrop={(files) => onDrop(files[0])}
                onReject={() =>
                    setError(
                        'Only select image files from the type jpg, jpeg, png, webp which do not exceed 2mb'
                    )
                }
            >
                {!selectedFile && (
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
                )}
                {imageUrl && (
                    <Image
                        m="auto"
                        h={150}
                        w="auto"
                        src={imageUrl}
                        onLoad={() => URL.revokeObjectURL(imageUrl)}
                    />
                )}
            </Dropzone>
            {selectedFileDisplay && (
                <>
                    <Text mb={5} mt="md">
                        Selected files:
                    </Text>
                    {selectedFileDisplay}
                </>
            )}
            {error !== '' && (
                <Text c="red" mt={5}>
                    {error}
                </Text>
            )}
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    )
}

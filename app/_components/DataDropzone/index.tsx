import { Group, Text, rem, Image, SimpleGrid } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone'
import { useState } from 'react'

export interface DataDropzoneProps extends Partial<DropzoneProps> {
    topText?: string
    bottomText?: string
    newFile: FileWithPath | undefined
    setNewFile: (files: FileWithPath) => void
}

export function DataDropzone({
    topText,
    bottomText,
    newFile,
    setNewFile,
    ...props
}: DataDropzoneProps) {
    const [previews, setPreviews] = useState<JSX.Element[]>([])

    const handleDrop = (files: FileWithPath[]) => {
        setNewFile(files[0])
        const previewElements = files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file)
            return (
                <Image
                    key={index}
                    src={imageUrl}
                    onLoad={() => URL.revokeObjectURL(imageUrl)}
                />
            )
        })
        setPreviews(previewElements)
    }

    return (
        <Dropzone
            {...props}
            onDrop={handleDrop}
            onReject={(files) => console.log('rejected files', files)}
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
                        {topText || ' Drag files here or click to select files'}
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
    )
}

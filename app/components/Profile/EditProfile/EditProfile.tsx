'use client'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Text, Input, Stack, Group } from '@mantine/core'
import { UserProfile } from '@/types/types'

export function EditProfile(user: UserProfile) {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Modal opened={opened} onClose={close} title="Edit Profile">
                {/* Modal content */}
                <Stack>
                    <Group justify="space-between" mx="xs">
                        <Text>Firstname</Text>
                        <Input placeholder="Firstname" />
                    </Group>
                    <Group justify="space-between" mx="xs">
                        <Text>Lastname</Text>
                        <Input placeholder="Lastname" />
                    </Group>
                    <Group justify="space-between" mx="xs">
                        <Text>Birthday</Text>
                        <Input placeholder="Birthday" />
                    </Group>
                    <Group justify="space-between" mx="xs">
                        <Text>Phone</Text>
                        <Input placeholder="0123456789"></Input>
                    </Group>
                    <Button mx="xs">Save Changes</Button>
                </Stack>
            </Modal>

            <Button onClick={open}>Edit Profile</Button>
        </>
    )
}

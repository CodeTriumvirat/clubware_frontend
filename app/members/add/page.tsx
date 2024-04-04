'use client'
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import { signup } from '@/(auth)/login/actions'
import { FormEvent } from 'react'

export default function Page() {
    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     try {
    //         console.log(signup)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={12}>
                Neuen Nutzer hinzufügen
            </Title>
            <Paper shadow="md" p={30} radius="md" mt="xl">
                <Stack>
                    <form>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="deinemail@example.com"
                                id="email"
                                name="email"
                                type="email"
                                required
                            />
                            <PasswordInput
                                label="Passwort"
                                placeholder="Dein Passwort"
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                            <Button type="submit" fullWidth formAction={signup}>
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Container>
    )
}

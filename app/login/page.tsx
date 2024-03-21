import { login, logout, signup } from './actions'
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core'

export default function Page() {
    return (
        <Container size={420} my={40}>
            <Title mb={12}>Log dich ein, Habibi!</Title>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <form>
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
                        mt="md"
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                    <Button type="submit" fullWidth mt="xl" formAction={login}>
                        Log in
                    </Button>
                    <Button type="submit" fullWidth mt="xl" formAction={signup}>
                        Sign up
                    </Button>
                </form>
                <form>
                    <Button variant="filled" size="xs" mt="md">
                        Passwort vergessen?
                    </Button>
                    <Button
                        type="submit"
                        formAction={logout}
                        variant="filled"
                        size="xs"
                        mt="md"
                    >
                        Logout
                    </Button>
                </form>
                {/* <Text mt="md">Passwort vergessen?</Text> */}
            </Paper>
        </Container>
    )
}

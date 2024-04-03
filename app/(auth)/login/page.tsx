import Link from 'next/link'
import { login, logout, signup } from './actions'
import {
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core'

export default function LoginPage() {
    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={12}>
                Log dich ein, Habibi!
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
                            <Button type="submit" fullWidth formAction={login}>
                                Log in
                            </Button>
                            <Button type="submit" fullWidth formAction={signup}>
                                Sign up
                            </Button>{' '}
                        </Stack>
                    </form>
                    <Group justify="space-between" grow>
                        <Button
                            variant="filled"
                            size="xs"
                            component={Link}
                            href="/auth/recovery"
                        >
                            Passwort vergessen?
                        </Button>
                        <form>
                            <Button
                                fullWidth
                                type="submit"
                                formAction={logout}
                                variant="filled"
                                size="xs"
                            >
                                Logout
                            </Button>
                        </form>
                    </Group>
                </Stack>
            </Paper>
        </Container>
    )
}

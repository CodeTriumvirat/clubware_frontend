import { Group, NavLink, Stack, Text } from '@mantine/core'
import Link from 'next/link'

export function LinkGroup({
    label,
    icon: IconComponent,
    links,
}: {
    label: string
    icon: React.ElementType
    links?: { label: string; link: string }[]
}) {
    return (
        <>
            <Group>
                <IconComponent />
                <Text size="xs">{label}</Text>
            </Group>
            {links && (
                <Stack>
                    {links.map((link, index) => (
                        <NavLink
                            component={Link}
                            key={index}
                            href={link.link}
                            label={link.label}
                        ></NavLink>
                    ))}
                </Stack>
            )}
        </>
    )
}

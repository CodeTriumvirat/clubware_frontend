import { Text } from '@mantine/core'
import Link from 'next/link'
import styles from './styles.module.css'

export const Logo = () => {
    return (
        <Link href="/dashboard" className={styles.logo} data-testid="logo">
            <Text ml="xl" size="xl">
                clubware.
                <span>io</span>
            </Text>
        </Link>
    )
}

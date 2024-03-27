import Link from 'next/link'
import { Text } from '@mantine/core'
import styles from './styles.module.css'

export const Logo = () => {
    return (
        <Link href="/dashboard" className={styles.Logo}>
            <Text ml="xl" size="xl">
                clubware.
                <span>io</span>
            </Text>
        </Link>
    )
}

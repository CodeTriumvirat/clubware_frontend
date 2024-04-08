'use client'
import { Button } from '@mantine/core'
import { logout } from './actions'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'

export function LogoutButton() {
    const [isClicked, setIsClicked] = useState(false)

    async function handleLogout(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsClicked(true)

        try {
            await logout()
        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    title: 'Logout Error',
                    message: error.message,
                })
            }
            console.error(error)
            setIsClicked(false)
        }
    }
    return (
        <form onSubmit={handleLogout}>
            <Button type="submit" variant="filled" disabled={isClicked}>
                Logout
            </Button>
        </form>
    )
}

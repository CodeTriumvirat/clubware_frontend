import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/_context/UserContext'
import { notifications } from '@mantine/notifications'

export function useAdminCheck(newRoute: string) {
    const { userRole } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (userRole !== 'admin') {
            notifications.show({
                title: 'Error',
                message: 'You are not authorized to view this page',
            })
            router.push(newRoute)
        }
    }, [])
}

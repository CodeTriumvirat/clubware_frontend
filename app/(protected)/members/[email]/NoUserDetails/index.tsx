'use client'

import { useRouter } from 'next/navigation'
// import { notifications } from '@mantine/notifications'
// import { useEffect } from 'react'

export function NoUserDetails() {
    // useEffect(() => {
    //     notifications.show({
    //         title: 'No user details found',
    //         message: 'No user details found for this user',
    //     })
    // }, [])

    const router = useRouter()
    router.push('/members')

    return <></>
}

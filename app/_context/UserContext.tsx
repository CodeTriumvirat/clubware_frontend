'use client'

import { createContext, useState, useEffect } from 'react'
import { UserProfile } from '@/_types'
import { getUserProfileClient } from '@/_utils/supabase/getUserProfileClient'

interface UserContext {
    user: UserProfile | null
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
}

export const UserContext = createContext<UserContext>({} as UserContext)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getUser() {
        const _user = await getUserProfileClient()
        setUser(_user)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

'use client'

import { createContext, useState, useEffect } from 'react'
import { UserProfile } from '@/_types'
import { getUserProfileClient } from '@/_utils/supabase/getUserProfileClient'
import { fetchUserProfilePicture } from '@/profile/actions'
import { createClient } from '@/_utils/supabase/client'

interface UserContext {
    user: UserProfile | null
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
    profilePictureUrl: string | null
    setProfilePictureUrl: React.Dispatch<React.SetStateAction<string | null>>
}

export const UserContext = createContext<UserContext>({} as UserContext)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
        null
    )

    async function getUser() {
        const _user = await getUserProfileClient()
        setUser(_user)
        const _profilePictureUrl = await fetchUserProfilePicture(_user.user_id)
        setProfilePictureUrl(_profilePictureUrl)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider
            value={{ user, setUser, profilePictureUrl, setProfilePictureUrl }}
        >
            {children}
        </UserContext.Provider>
    )
}

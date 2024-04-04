'use client'

import { UserProfile } from '@/_types'
import { getMyUserProfileClient } from '@/_utils/supabase/getMyUserProfileClient'
import { fetchUserProfilePicture } from '@/profile/actions'
import { createContext, useEffect, useState } from 'react'

interface UserContext {
    user: UserProfile | null
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
    profilePictureUrl: string | null
    setProfilePictureUrl: React.Dispatch<React.SetStateAction<string | null>>
    userRole: string | null
}

export const UserContext = createContext<UserContext>({} as UserContext)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
        null
    )
    const [userRole, setUserRole] = useState<string | null>(null)

    async function getUser() {
        const _user = await getMyUserProfileClient()
        setUser(_user)
        const _profilePictureUrl = await fetchUserProfilePicture(_user.user_id)
        setProfilePictureUrl(_profilePictureUrl)
        setUserRole(_user.user_role)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                profilePictureUrl,
                setProfilePictureUrl,
                userRole,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

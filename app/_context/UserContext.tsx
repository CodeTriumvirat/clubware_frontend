'use client'

import { UserProfile } from '@/_types'
import { createClient } from '@/_utils/supabase/client'
import { getMyUserProfileClient } from '@/_utils/supabase/getMyUserProfileClient'
import { fetchUserProfilePicture } from '@/(protected)/profile/actions'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

interface UserContext {
    user: UserProfile | null
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
    profilePictureUrl: string | null
    setProfilePictureUrl: React.Dispatch<React.SetStateAction<string | null>>
    userRole: string | null
    isLoadingUser: boolean
}

export const UserContext = createContext<UserContext>({} as UserContext)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
        null
    )
    const [userRole, setUserRole] = useState<string | null>(null)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    async function getUser() {
        const _user = await getMyUserProfileClient()
        setUser(_user)
        const _profilePictureUrl = await fetchUserProfilePicture(_user.user_id)
        setProfilePictureUrl(_profilePictureUrl)
        setUserRole(_user.user_role)
        setIsLoadingUser(false)
    }
    const supabase = createClient()
    const router = useRouter()
    useEffect(() => {
        getUser()

        const { data } = supabase.auth.onAuthStateChange((session) => {
            console.log('session', session)
            if (!session) {
                setUser(null)
                setProfilePictureUrl(null)
                setUserRole(null)
                router.push('/login')
            }
        })

        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                profilePictureUrl,
                setProfilePictureUrl,
                userRole,
                isLoadingUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

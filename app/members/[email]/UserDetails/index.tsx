import { UserProfile } from '@/_types'

export function UserDetails({ userProfile }: { userProfile: UserProfile }) {
    return <>{JSON.stringify(userProfile)}</>
}

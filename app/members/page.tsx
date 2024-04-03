import { getAllUserProfilesServer } from '@/_utils/supabase/getAllUserProfilesServer'
import UserTable from './UserTable'

export default async function Page() {
    const userProfiles = await getAllUserProfilesServer()
    return (
        <>
            <UserTable userProfiles={userProfiles} />
        </>
    )
}

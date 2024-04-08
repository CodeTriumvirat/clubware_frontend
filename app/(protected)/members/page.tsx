import { getAllUserProfilesServer } from '@/_utils/supabase/getAllUserProfilesServer'
import UserTable from './UserTable'
import { Title } from '@mantine/core'

export default async function Page() {
    const userProfiles = await getAllUserProfilesServer()
    return (
        <>
            <UserTable userProfiles={userProfiles} />
        </>
    )
}

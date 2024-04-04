import EditUser from './EditUser'
import { getUserProfileServer } from '@/_utils/supabase/getUserProfileServer'

export default async function Page({
    params,
}: {
    params: { user_id: string }
}) {
    const userProfile = await getUserProfileServer(params.user_id)
    return (
        <>
            <EditUser userProfile={userProfile} />
        </>
    )
}

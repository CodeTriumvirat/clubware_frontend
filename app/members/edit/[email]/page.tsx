import EditUser from './EditUser'
import { getUserProfileByEmailServer } from '@/_utils/supabase/getUserProfileByEmailServer'

export default async function Page({ params }: { params: { email: string } }) {
    const userProfile = await getUserProfileByEmailServer(
        decodeURIComponent(params.email)
    )

    return (
        <>
            <EditUser userProfile={userProfile} />
        </>
    )
}

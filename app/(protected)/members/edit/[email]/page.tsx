import EditUser from './EditUser'
import { getUserProfileByEmailServer } from '@/_utils/supabase/getUserProfileByEmailServer'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function Page({ params }: { params: { email: string } }) {
    const userProfile = await getUserProfileByEmailServer(
        decodeURIComponent(params.email)
    )
    if (!userProfile) {
        console.log('User does not exist')
        revalidatePath('/members', 'layout')
        redirect('/members')
    }

    return (
        <>
            <EditUser userProfile={userProfile} />
        </>
    )
}

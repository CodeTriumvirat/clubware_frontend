import { getUserProfilePictureServer } from '@/_utils/supabase/getUserProfilePictureServer'
import { UserDetails } from './UserDetails'
import { getUserProfileByEmailServer } from '@/_utils/supabase/getUserProfileByEmailServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { email: string } }) {
    const userProfile = await getUserProfileByEmailServer(
        decodeURIComponent(params.email)
    )

    let userProfilePicture = null

    if (userProfile) {
        userProfilePicture = await getUserProfilePictureServer(
            userProfile.user_id
        )
    } else if (!userProfile) {
        console.log('User does not exist')
        revalidatePath('/members', 'layout')
        redirect('/members')
    }

    return (
        <>
            {userProfile && (
                <>
                    <UserDetails
                        userProfile={userProfile}
                        userProfilePicture={userProfilePicture}
                    />
                </>
            )}
        </>
    )
}

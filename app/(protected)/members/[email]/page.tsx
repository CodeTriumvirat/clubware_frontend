import { getUserProfilePictureServer } from '@/_utils/supabase/getUserProfilePictureServer'
import { UserDetails } from './UserDetails'
import { getUserProfileByEmailServer } from '@/_utils/supabase/getUserProfileByEmailServer'

export default async function Page({ params }: { params: { email: string } }) {
    const userProfile = await getUserProfileByEmailServer(
        decodeURIComponent(params.email)
    )
    const userProfilePicture = await getUserProfilePictureServer(
        userProfile.user_id
    )
    return (
        <>
            <UserDetails
                userProfile={userProfile}
                userProfilePicture={userProfilePicture}
            />
        </>
    )
}

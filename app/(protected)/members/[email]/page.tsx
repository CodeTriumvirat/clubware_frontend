import { getUserProfilePictureServer } from '@/_utils/supabase/getUserProfilePictureServer'
import { UserDetails } from './UserDetails'
import { getUserProfileByEmailServer } from '@/_utils/supabase/getUserProfileByEmailServer'
import { NoUserDetails } from './NoUserDetails'

export default async function Page({ params }: { params: { email: string } }) {
    let isLoading = true

    const userProfile = await getUserProfileByEmailServer(
        decodeURIComponent(params.email)
    )

    isLoading = false

    let userProfilePicture = null

    if (userProfile) {
        userProfilePicture = await getUserProfilePictureServer(
            userProfile.user_id
        )
    }

    return (
        <>
            {userProfile && !isLoading && (
                <>
                    <UserDetails
                        userProfile={userProfile}
                        userProfilePicture={userProfilePicture}
                    />
                </>
            )}
            {!userProfile && !isLoading && (
                <>
                    <NoUserDetails />
                </>
            )}
        </>
    )
}

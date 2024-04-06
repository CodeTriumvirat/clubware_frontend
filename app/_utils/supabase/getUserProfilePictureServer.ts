import { fetchUserProfilePicture } from '@/(protected)/profile/actions'

export async function getUserProfilePictureServer(user_id: string) {
    return await fetchUserProfilePicture(user_id)
}

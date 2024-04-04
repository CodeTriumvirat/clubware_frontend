import { getUserProfileServer } from '@/_utils/supabase/getUserProfileServer'

export default async function Page({
    params,
}: {
    params: { user_id: string }
}) {
    const userProfile = await getUserProfileServer(params.user_id)
    return (
        <>
            {userProfile.first_name}
            {userProfile.last_name}
            {userProfile.email}
            {userProfile.phone_number}
            {userProfile.street}
            {userProfile.postcode}
            {userProfile.city}
            {userProfile.user_role}
        </>
    )
}

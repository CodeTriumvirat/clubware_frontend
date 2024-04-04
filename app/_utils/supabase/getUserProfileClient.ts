import { createClient } from './client'
import { UserProfile } from '@/_types'

export async function getUserProfileClient(user_id: string) {
    const supabase = createClient()

    let userProfile = (
        await supabase
            .from('user_profile')
            .select('*')
            .eq('user_id', user_id)
            .single()
    ).data

    return userProfile as UserProfile
}

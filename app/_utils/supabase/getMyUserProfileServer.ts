import { User } from '@supabase/supabase-js'
import { createClient } from './server'
import { UserProfile } from '@/_types'

export async function getMyUserProfileServer() {
    const supabase = createClient()

    let authUser = (await supabase.auth.getUser()).data.user as User

    let userProfile = (
        await supabase
            .from('user_profile')
            .select('*')
            .eq('user_id', authUser.id)
            .single()
    ).data

    return userProfile as UserProfile
}

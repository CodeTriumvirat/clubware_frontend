import { User } from '@supabase/supabase-js'
import { createClient } from './server'
import { UserProfile } from '@/_types'

export async function getUserProfileServer(user_id: string) {
    const supabase = createClient()

    let authUser = (await supabase.auth.getUser()).data.user as User

    let userProfile = (
        await supabase
            .from('user_profile')
            .select('*')
            .eq('user_id', user_id)
            .single()
    ).data

    return userProfile as UserProfile
}

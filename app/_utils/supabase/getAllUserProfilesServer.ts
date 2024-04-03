import { createClient } from './server'
import { UserProfile } from '@/_types'

export async function getAllUserProfilesServer() {
    const supabase = createClient()

    let userProfiles = (await supabase.from('user_profile').select('*')).data

    return userProfiles as UserProfile[]
}

import { createClient } from './server'
import { UserProfile } from '@/_types'

export async function getUserProfileByEmailServer(
    email: string
): Promise<UserProfile | null> {
    const supabase = createClient()

    let userProfile = (
        await supabase
            .from('user_profile')
            .select('*')
            .eq('email', email)
            .single()
    ).data

    return userProfile
}

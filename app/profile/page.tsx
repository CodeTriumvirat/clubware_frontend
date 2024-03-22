import { redirect } from 'next/navigation'
import { createClient } from '@/_utils/supabase/server'
import { Profile } from '@/profile/ProfileCard'

export default async function Page() {
    const supabase = createClient()

    let { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/login')
    }

    return <Profile />
}

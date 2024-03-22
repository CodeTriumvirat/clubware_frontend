import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Profile } from '@/components/Profile/Profile/Profile'

export default async function Page() {
    const supabase = createClient()

    let { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/login')
    }

    return <Profile />
}

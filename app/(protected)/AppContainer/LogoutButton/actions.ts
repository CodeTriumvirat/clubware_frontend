'use server'

import { createClient } from '@/_utils/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
    const supabase = createClient()

    let { error } = await supabase.auth.signOut()

    if (error) throw error

    redirect('/login')
}

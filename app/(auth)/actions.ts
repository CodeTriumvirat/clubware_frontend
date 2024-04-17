'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/_utils/supabase/server'

export async function login(data: { email: string; password: string }) {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) throw new Error('Invalid login credentials')

    revalidatePath('/', 'layout')
    redirect('/')
}

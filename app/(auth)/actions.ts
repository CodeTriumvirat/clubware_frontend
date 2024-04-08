'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '@/_utils/supabase/server'

export async function login(data: { email: string; password: string }) {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) throw error

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = createClient()

    let { error } = await supabase.auth.signOut()

    if (error) throw error

    revalidatePath('/', 'layout')
    redirect('/')
}

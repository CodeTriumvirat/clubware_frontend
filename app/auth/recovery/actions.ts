'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function setNewPassword(password: string) {
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
        password: password,
    })

    if (!error) {
        revalidatePath('/', 'layout')
        redirect('/')
    }

    if (error) throw new Error('Failed to update password')
}

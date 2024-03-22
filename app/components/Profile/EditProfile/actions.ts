'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { UserProfile } from '@/types/types'

export async function setNewProfile(profileData: UserProfile) {
    const supabase = createClient()

    const { error } = await supabase
        .from('user_profile')
        .update({ ...profileData })
        .eq('user_id', profileData.user_id)

    if (!error) {
        revalidatePath('/profile', 'layout')
        redirect('/profile')
    }

    if (error) throw new Error('Failed to update profile')
}

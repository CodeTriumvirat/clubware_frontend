'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/_utils/supabase/server'
import { UserProfile } from '@/_types'

export async function updateUserProfile(profileData: UserProfile) {
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

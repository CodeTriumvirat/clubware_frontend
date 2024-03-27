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
export async function uploadProfilePicture(file: File | undefined, id: string) {
    const supabase = createClient()
    if (file) {
        console.log('File type:', file.type)
        console.log('File:', file)
        try {
            const { error } = await supabase.storage
                .from('profile_picture')
                .upload(`${id}.${file.type}`, file, { upsert: true })
            if (error) {
                console.error('Error uploading file:', error.message)
            } else {
                console.log('Upload successful')
            }
        } catch (error: any) {
            console.error('Error uploading file:', error.message)
        }
    } else {
        console.log('No file provided for upload')
    }
}

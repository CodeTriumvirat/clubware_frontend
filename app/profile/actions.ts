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
export async function uploadProfilePicture(
    formData: FormData,
    user_id: string
) {
    // throw new Error('Failed to upload profile picture')
    const supabase = createClient()
    const file = formData.get('file') as File
    if (file) {
        const fileType = file.type.split('/')[1]
        console.log(fileType)
        const { error } = await supabase.storage
            .from('user_data')
            .upload(`${user_id}/profile_picture.${fileType}`, file, {
                upsert: true,
            })
        if (error) {
            throw new Error('Failed to upload profile picture')
            // console.error('Error uploading file:', error.message)
        } else {
            console.log('Upload successful')
        }
    } else {
        console.log('No file provided for upload')
    }
}

export async function rawFunction2() {
    throw new Error('Raw function 2 throwing error')
}

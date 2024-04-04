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

export async function updateSelectedUserProfile(profileData: UserProfile) {
    const supabase = createClient()
    const { error } = await supabase
        .from('user_profile')
        .update({ ...profileData })
        .eq('user_id', profileData.user_id)

    if (!error) {
        revalidatePath('/members', 'layout')
        redirect('/members')
    }
    if (error) throw new Error(error.message)
}

export async function uploadProfilePicture(
    formData: FormData,
    user_id: string
) {
    const supabase = createClient()
    const file = formData.get('file') as File
    if (file) {
        let fileType = file.type.split('/')[1]
        if (fileType === 'jpeg') {
            fileType = 'jpg'
        }
        const { error } = await supabase.storage
            .from('user_data')
            .upload(`${user_id}/profile_picture.${fileType}`, file, {
                upsert: true,
            })
        if (error) {
            throw new Error('Failed to upload profile picture')
        } else {
            console.log('Upload successful')
        }
    } else {
        console.log('No file provided for upload')
    }
}

export async function updateUserProfilePicture(
    formData: FormData,
    user_id: string
) {
    const supabase = createClient()
    4
    try {
        // List all files in the folder
        const { data: files, error } = await supabase.storage
            .from('user_data')
            .list(user_id)

        if (error) {
            throw error
        }

        // Remove all files in the folder
        const keys = files?.map((file) => `${user_id}/${file.name}`)
        console.log(keys)
        if (keys && keys.length > 0) {
            await supabase.storage.from('user_data').remove(keys)
        }

        // Add the new file
        await uploadProfilePicture(formData, user_id)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export async function existingProfilePicture(user_id: string) {
    const supabase = createClient()

    try {
        const { data, error } = await supabase.storage
            .from('user_data')
            .list(user_id)

        if (error) {
            console.error('Error fetching files:', error)
            return false
        }

        const profilePicture = data.find((file) =>
            file.name.startsWith('profile_picture')
        )

        if (!profilePicture) {
            return false
        }
        return true
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export async function fetchUserProfilePicture(user_id: string) {
    const supabase = createClient()
    const { data, error } = await supabase.storage
        .from('user_data')
        .list(user_id)

    if (error) {
        console.error('Error fetching files:', error)
        return null
    }

    // Find the profile picture based on the known part of the name
    const profilePicture = data.find((file) =>
        file.name.startsWith('profile_picture')
    )

    if (!profilePicture) {
        return null
    }

    // Construct the URL to access the file
    const supabaseData = supabase.storage
        .from('user_data')
        .getPublicUrl(`${user_id}/${profilePicture.name}`)

    return supabaseData.data.publicUrl
}

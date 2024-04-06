'use server'

import { createClient } from '@/_utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const authSessionCookie = cookies().get('sb-api-auth-token')?.value
    const authLocalSessionCookie = cookies().get('sb-127-auth-token')?.value

    const { error } = await supabase.auth.signUp(data)

    if (authLocalSessionCookie)
        cookies().set('sb-127-auth-token', authLocalSessionCookie)
    if (authSessionCookie) cookies().set('sb-api-auth-token', authSessionCookie)

    if (error) {
        throw new Error(error.message)
    }

    if (!error) {
        revalidatePath('/members', 'layout')
        redirect(`/members/edit/${data.email}`)
    }
}

'use server'

import { createClient } from '@/_utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateEmail, validatePassword } from '@/_utils/form-validation'

export async function signup(data: { email: string; password: string }) {
    const supabase = createClient()

    const emailError = validateEmail(data.email)
    if (emailError) {
        throw new Error(emailError)
    }

    const passwordError = validatePassword(data.password)
    if (passwordError) {
        throw new Error(passwordError)
    }

    const authSessionCookie = cookies().get('sb-api-auth-token')?.value
    const authLocalSessionCookie = cookies().get('sb-127-auth-token')?.value

    const { error } = await supabase.auth.signUp(data)

    if (authLocalSessionCookie)
        cookies().set('sb-127-auth-token', authLocalSessionCookie)
    if (authSessionCookie) cookies().set('sb-api-auth-token', authSessionCookie)

    if (error) {
        throw error
    }

    if (!error) {
        revalidatePath('/members', 'layout')
        redirect(`/members/edit/${data.email}`)
    }
}

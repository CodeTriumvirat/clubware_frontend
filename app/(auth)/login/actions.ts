'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '@/_utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
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
        redirect('/error')
    }

    revalidatePath('/members', 'layout')
    redirect(`/members/edit/${data.email}`)
}

export async function logout() {
    const supabase = createClient()

    let { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

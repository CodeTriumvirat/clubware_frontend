'use server'

import { cookies } from 'next/headers'

export async function setPrimaryColorCookie(color: string) {
    cookies().set('primaryColor', color)
}

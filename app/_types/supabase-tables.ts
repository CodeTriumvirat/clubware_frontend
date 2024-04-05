import { Enums, Tables } from '@/_types/supabase'
export type UserProfile = Tables<'user_profile'>
export type UserRole = Enums<'user_role'>
export const userRoleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Worker', value: 'worker' },
]

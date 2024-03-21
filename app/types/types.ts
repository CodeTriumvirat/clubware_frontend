import { Tables } from './supabase'
// Extract the type for the "user_profile" table from the public schema.
export type UserProfile = Tables<'user_profile'>

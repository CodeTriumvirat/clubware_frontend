import PasswordRecoveryForm from '@/(protected)/password-recovery/PasswordRecoveryForm'
import { createClient } from '@/_utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
    const supabase = createClient()

    const { error } = await supabase.auth.getUser()

    if (error) redirect('/')

    return (
        <>
            <PasswordRecoveryForm />
        </>
    )
}

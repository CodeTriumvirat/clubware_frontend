import { getAllUserProfilesServer } from '@/_utils/supabase/getAllUserProfilesServer'
import { Title } from '@mantine/core'
import React from 'react'

export async function PhoneList() {
    const userProfiles = await getAllUserProfilesServer()

    return (
        <>
            <Title>Phone Numbers</Title>
            <ul>
                {userProfiles.map((profile) => (
                    <li key={profile.user_id}>
                        {profile.first_name}, {profile.last_name} :{' '}
                        {profile.phone_number}
                    </li>
                ))}
            </ul>
        </>
    )
}

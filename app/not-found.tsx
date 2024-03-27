'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
    const pathname = usePathname()

    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <p>Current pathname: {pathname}</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}

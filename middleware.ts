import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/_utils/supabase/middleware'
import { createClient } from '@/_utils/supabase/server'

export async function middleware(request: NextRequest) {
    const supabase = createClient()
    const url = request.nextUrl.clone()
    const response = await updateSession(request)
    const { error } = await supabase.auth.getUser()
    if (error) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (login route)
         * - /confirm (confirm route)
         * - /templates (email templates route)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|login|templates|confirm|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

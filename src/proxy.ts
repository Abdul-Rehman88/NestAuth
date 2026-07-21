import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isPublicUri = path ==='/login' || path ==='/signup' || path ==='/VerifyMail'
    const toke = request.cookies.get('token')?.value||""

    if(isPublicUri && toke){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if(!isPublicUri && !toke){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/Verifyemail',
  ],
}
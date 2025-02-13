import { NextResponse } from "next/server"

export function middleware(request){
    console.log('running')

    const user = ''                         // falsey value redirects you to admin login page

    if (!user){
        return NextResponse.redirect(
            new URL('/admin/login', request.url)
        )
    }


    
    return NextResponse.next()
}

export const config = {
    matcher: ['/admin']
} 
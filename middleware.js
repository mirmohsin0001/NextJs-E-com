import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export function middleware(request) {
    console.log('running');

    const token = request.cookies.get('auth-token'); // Check for an auth token in cookies

    if (!token) {
        return NextResponse.redirect(
            new URL('/admin/login', request.url)
        );
    }

    try {
        // Verify the token (replace 'your-secret-key' with your actual secret key)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return NextResponse.redirect(
                new URL('/admin/login', request.url)
            );
        }
    } catch (err) {
        return NextResponse.redirect(
            new URL('/admin/login', request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/addProduct', '/admin/products']
};
import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('accessToken')?.value; // Assuming you store the token in cookies

    // If no token, redirect to login page
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If token exists, allow the request to proceed
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    // matcher: ['/add-to-cart', '/user-account', '/checkout', '/order-confirmation', '/wishlist'], // Add the routes you want to protect
    matcher: [], // Add the routes you want to protect
};
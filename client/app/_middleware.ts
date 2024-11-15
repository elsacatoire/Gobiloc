import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("authToken");

	const publicRoutes = ["/login", "/register"];

	if (!token && !publicRoutes.includes(req.nextUrl.pathname)) {
		console.log("middleware  : User is not authenticated, redirecting to login page");
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// If user is authenticated naviguation continues
	return NextResponse.next();
}

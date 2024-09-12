import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/gig", "/sign-in", "/sign-up"];

// Define private routes that require authentication
const commonPrivateRoutes = [
  "/dashboard",
  "/profile",
  "/profile/edit",
  "/profile/add",
  "/earnings",
  "/inbox",
  "/list",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userCookie = cookies().get("user");

  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {
      console.error("Error parsing user cookie:", e);
    }
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (user) {
    if (commonPrivateRoutes.includes(pathname)) {
      return NextResponse.next();
    }
  }

  // Redirect to the sign-in page if not authenticated
  if (commonPrivateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/list",
    "/inbox",
    "/dashboard",
    "/profile",
    "/profile/edit",
    "/profile/add",
    "/earnings",
    "/sign-in",
    "/sign-up",
    "/gig",
    "/",
  ],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

// const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing'])

// export default clerkMiddleware(async (auth, request) => {
//   const url = new URL(request.url)
//   const searchParams = url.searchParams.toString()
//   const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ''}`
//   const hostname = request.headers.get('host')

//   // Check for subdomain logic
//   const customSubDomain = hostname
//     ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
//     .filter(Boolean)[0]

//   if (isPublicRoute(request)) {
//     return NextResponse.next()
//   }

//   await auth.protect()

//   if (customSubDomain) {
//     return NextResponse.rewrite(
//       new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url)
//     )
//   }

//   if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
//     return NextResponse.redirect(new URL(`/agency/sign-in`, request.url))
//   }

//   if (
//     url.pathname === '/' ||
//     (url.pathname === '/site' && hostname === process.env.NEXT_PUBLIC_DOMAIN)
//   ) {
//     return NextResponse.rewrite(new URL('/site', request.url))
//   }

//   if (
//     url.pathname.startsWith('/agency') ||
//     url.pathname.startsWith('/subaccount')
//   ) {
//     return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, request.url))
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
//
//
//
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/site",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// export default clerkMiddleware(async (auth, request) => {
//   const url = new URL(request.url);
//   const searchParams = url.searchParams.toString();
//   const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;
//   const hostname = request.headers.get("host");

//   // Check for subdomain existence
//   const customSubDomain = hostname
//     ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
//     .filter(Boolean)[0];

//   if (customSubDomain) {
//     // If subdomain exists, send user to the corresponding path along with search params
//     return NextResponse.rewrite(
//       new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url),
//     );
//   }

//   if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
//     // Rewrite to agency sign-in for sign-in or sign-up routes
//     return NextResponse.redirect(new URL(`/agency/sign-in`, request.url));
//   }

//   if (url.pathname === "/" || url.pathname === "/site") {
//     // Rewrite to /site if the user is accessing the root or /site
//     return NextResponse.rewrite(new URL("/site", request.url));
//   }

//   // Handle dashboard access or other routes
//   return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, request.url));
// });

export default clerkMiddleware(async (auth, request) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;
    const hostname = request.headers.get("host");

    if (!hostname) {
      console.error("No hostname found in request headers");
      return NextResponse.error();
    }
    // @ts-ignore
    const customSubDomain = hostname.includes(process.env.NEXT_PUBLIC_DOMAIN)
      ? //@ts-ignore
        hostname.split(process.env.NEXT_PUBLIC_DOMAIN)[0].replace(/\.$/, "")
      : null;

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url),
      );
    }

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/agency/sign-in", request.url));
    }

    if (url.pathname === "/" || url.pathname === "/site") {
      return NextResponse.rewrite(new URL("/site", request.url));
    }

    return NextResponse.rewrite(new URL(pathWithSearchParams, request.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

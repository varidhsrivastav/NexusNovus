import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/site",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/api/uploadthing",
]);

export default clerkMiddleware(async (auth, request) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const pathWithSearchParams = `${url.pathname}${
      searchParams ? `?${searchParams}` : ""
    }`;
    const hostname = request.headers.get("host");

    if (!hostname) {
      console.error("No hostname found in request headers");
      return NextResponse.json(
        { error: "Hostname not found" },
        { status: 500 },
      );
    }

    const rootDomain = process.env.NEXT_PUBLIC_DOMAIN;
    if (!rootDomain) {
      console.error(
        "NEXT_PUBLIC_DOMAIN is not defined in environment variables",
      );
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    }

    // Handle subdomain-based rewriting
    const customSubDomain = hostname.includes(rootDomain)
      ? hostname.split(`.${rootDomain}`)[0]
      : null;

    if (customSubDomain && customSubDomain !== hostname) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url),
      );
    }

    // Handle sign-in and sign-up redirection
    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/agency/sign-in", request.url));
    }

    // Ensure / and /site are rewritten correctly
    if (url.pathname === "/" || url.pathname === "/site") {
      return NextResponse.rewrite(new URL("/site", request.url));
    }

    // Allow public routes to continue without authentication
    if (isPublicRoute(request)) {
      return NextResponse.next();
    }

    // Protect all other routes
    // @ts-ignore
    auth().protect();

    return NextResponse.rewrite(new URL(pathWithSearchParams, request.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

import { NextResponse } from "next/server";
import { fetchProgramData } from "./app/LocalCache";

// Middleware function
export async function middleware(request) {
  const { pathname } = request.nextUrl; // Get the current pathname
  const url = request.nextUrl.clone(); // Clone the URL for modification
  const programs = await fetchProgramData(); // Fetch program data from the API

  // Handle /search_course/undefined case
  if (pathname.startsWith("/search_course/undefined")) {
    // Replace "undefined" with "diploma" as the default program
    url.pathname = pathname.replace("/undefined", "/diploma");
    return NextResponse.redirect(url); // Redirect to the new URL
  }

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length >= 3) {
    // Check if the first segment matches one of the predefined programs
    const program = programs.find((p) => p.slug === pathSegments[0]);
    if (program) {
      // Extract the last segment as the course name
      const courseName = pathSegments[pathSegments.length - 1];
      url.pathname = `/course_detail/${courseName}`; // Rewrite to /course_detail/[course_name]
      return NextResponse.rewrite(url);
    }
  }

  // Extract the dynamic segment from the pathname (the part after /search_course/)
  const dynamicSegment = pathSegments[0]; // The dynamic part of the path (e.g., "diploma")

  // Check if the dynamic segment matches any program slug
  const program = programs.find((p) => p.slug === dynamicSegment);

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (!program) {
    // If no matching program is found, redirect to a default program (e.g., "masters")
    if (dynamicSegment === "undefined" || !dynamicSegment) {
      url.pathname = "/search_course/masters"; // Default to "masters" if no valid program
      return NextResponse.redirect(url); // Redirect to the default URL
    }
  }

  // If a matching program is found, rewrite the URL to /search_course/[program_slug]
  if (program) {
    url.pathname = `/search_course/${program.slug}`;
    return NextResponse.rewrite(url); // Rewrite the request to the new path
  }

  // If no rewrite or redirect is needed, return NextResponse.next()
  return NextResponse.next();
}

// Define the paths to match
export const config = {
  matcher: ["/search_course/:path*", "/:path*"], // Apply middleware to /search_course paths and other dynamic paths
};

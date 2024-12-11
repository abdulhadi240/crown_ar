import { NextResponse } from "next/server";
import { fetchProgramData } from "./app/LocalCache";


const programs = [
  { slug: "diploma", name: "Diploma" },
  { slug: "masters", name: "Masters" },
  { slug: "training-course", name: "Training Course" },
];

// Middleware function
export async function middleware(request) {
  const { pathname } = request.nextUrl; // Get the current pathname
  const url = request.nextUrl.clone(); // Clone the URL for modification

  // Handle /search_course/undefined case
  if (pathname.startsWith("/search_course/undefined")) {
    // Replace "undefined" with "diploma" as the default program
    url.pathname = pathname.replace("/undefined", "/diploma");
    return NextResponse.redirect(url); // Redirect to the new URL
  }

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean);

  // Check if the path matches any program
  if (pathSegments.length >= 3) {
    const program = programs.find((p) => p.slug === pathSegments[0]);
    if (program) {
      const courseName = pathSegments[pathSegments.length - 1];
      url.pathname = `/course_detail/${courseName}`; // Rewrite to /course_detail/[course_name]
      return NextResponse.rewrite(url);
    }
  }

  // Handle dynamic segment for /search_course/
  const dynamicSegment = pathSegments[0];
  const program = programs.find((p) => p.slug === dynamicSegment);

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (!program) {
    if (dynamicSegment === "undefined" || !dynamicSegment) {
      url.pathname = "/search_course/masters"; // Default to "masters"
      return NextResponse.redirect(url); // Redirect to the default URL
    }
  }

  if (program) {
    url.pathname = `/search_course/${program.slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Define the paths to match
export const config = {
  matcher: [
    "/search_course/:path*", // Match /search_course and any subpaths
    "/:path*", // Match all other dynamic paths
  ],
};

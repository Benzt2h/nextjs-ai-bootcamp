import type { Course, CourseApiResponse } from "@/types/course";

const COURSE_API_URL = "https://api.codingthailand.com/api/course";

/**
 * Fetches all courses from the API.
 * Returns an empty array if the request fails.
 */
export async function getCourses(): Promise<Course[]> {
  const response = await fetch(COURSE_API_URL, {
    next: {
      revalidate: 60, // ISR: revalidate every 60 seconds
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  const result: CourseApiResponse = await response.json();
  return result.data;
}

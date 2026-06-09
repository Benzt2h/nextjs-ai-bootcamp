import FeaturesCourse from "@/components/features-course";
import { getCourses } from "@/services/course.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หลักสูตรทั้งหมด",
  description: "รายการคอร์สเรียนทั้งหมด",
};

// http://localhost:3000/course
export default async function CoursePage() {
  const courses = await getCourses();

  return (
    <main>
      {courses.length > 0 && <FeaturesCourse courses={courses} />}
    </main>
  );
}
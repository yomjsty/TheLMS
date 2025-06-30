import { EmptyState } from "@/components/general/EmptyState"
import { getAllCourses } from "../dal/course/get-all-courses"
import { getEnrolledCourses } from "../dal/user/get-enrolled-courses"
import { CourseCard } from "../(public)/_components/CourseCard"
import Link from "next/link"

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([getAllCourses(), getEnrolledCourses()])



  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">Here are the courses you are enrolled in.</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState title="No enrolled courses" description="You are not enrolled in any courses." buttonText="Explore Courses" href="/courses" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {enrolledCourses.map((course) => (
            <Link
              key={course.Course.id}
              href={`/dashboard/${course.Course.slug}`}
            >
              {course.Course.title}
            </Link>
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-2xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">Here are the courses available for you to enroll in.</p>
        </div>
        {courses.filter(
          (course) => !enrolledCourses.some(({ Course: enrolled }) => enrolled.id === course.id)
        ).length === 0 ? (
          <EmptyState title="No available courses" description="You have already enrolled in all available courses." buttonText="Explore Courses" href="/courses" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.filter(
              (course) => !enrolledCourses.some(({ Course: enrolled }) => enrolled.id === course.id)
            ).map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}


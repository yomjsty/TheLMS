import { EmptyState } from "@/components/general/EmptyState"
import { getAllCourses } from "../dal/course/get-all-courses"
import { getEnrolledCourses } from "../dal/user/get-enrolled-courses"
import { CourseCard } from "../(public)/_components/CourseCard"
import { CourseCardSkeleton, CourseProgressCard } from "./_components/CourseProgressCard"
import { Suspense } from "react"

export default async function DashboardPage() {

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">Here are the courses you are enrolled in.</p>
      </div>
      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </>
  )
}

async function RenderCourses() {
  const [courses, enrolledCourses] = await Promise.all([getAllCourses(), getEnrolledCourses()])

  return (
    <>
      {enrolledCourses.length === 0 ? (
        <EmptyState title="No enrolled courses" description="You are not enrolled in any courses." buttonText="Explore Courses" href="/courses" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard
              key={course.Course.id}
              data={course}
            />
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

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  )
}

export const metadata = {
  title: "Dashboard | LMS",
  description: "View your enrolled and available courses, track your progress, and manage your learning journey.",
  openGraph: {
    title: "Dashboard | LMS",
    description: "View your enrolled and available courses, track your progress, and manage your learning journey.",
    url: "https://the-lms-one.vercel.app/dashboard",
    siteName: "LMS",
    images: [
      {
        url: "/logo-rectangle.png",
        width: 1200,
        height: 630,
        alt: "LMS Dashboard"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | LMS",
    description: "View your enrolled and available courses, track your progress, and manage your learning journey.",
    images: ["/logo-rectangle.png"]
  },
  alternates: {
    canonical: "https://the-lms-one.vercel.app/dashboard"
  }
};
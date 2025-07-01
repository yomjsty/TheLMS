import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetEnrollmentStat } from "../dal/admin/admin-get-enrollment-stat";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { adminGetRecentCourses } from "../dal/admin/admin-get-recent-courses";
import { EmptyState } from "@/components/general/EmptyState";
import { AdminCourseCard, AdminCourseCardSkeleton } from "./courses/_components/AdminCourseCard";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function Page() {

  return (
    <>
      <Suspense fallback={(
        <div className="w-full min-h-96 flex items-center justify-center gap-4">
          <Loader2 className="size-10 animate-spin" />
          Loading Statistics...
        </div>
      )}>
        <SectionCards />
        <GetEnrollmentStat />
      </Suspense>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link href="/admin/courses" className={buttonVariants({ variant: "outline" })}>
            View All Courses
          </Link>
        </div>
        <Suspense fallback={<GetRecentCoursesSkeleton />}>
          <GetRecentCourses />
        </Suspense>
      </div>
    </>
  )
}

async function GetEnrollmentStat() {
  const data = await adminGetEnrollmentStat();
  return (
    <ChartAreaInteractive data={data} />
  )
}

async function GetRecentCourses() {
  const data = await adminGetRecentCourses();

  if (
    data.length === 0
  ) {
    return (
      <EmptyState buttonText="Create Course" href="/admin/courses" title="No courses found" description="Create a course to get started" />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  )
}

function GetRecentCoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  )
}
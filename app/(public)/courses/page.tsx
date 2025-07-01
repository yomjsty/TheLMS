import { getAllCourses } from "@/app/dal/course/get-all-courses"
import { CourseCard, CourseCardSkeleton } from "../_components/CourseCard";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function CoursesPage() {
    return (
        <div className="mt-5">
            <div className="flex flex-col space-y-2 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Courses</h1>
                <p className="text-muted-foreground">Discover our courses and start your learning journey today.</p>
            </div>

            <Suspense fallback={<LoadingSkeletonLayout />}>
                <RenderCourses />
            </Suspense>
        </div>
    )
}

async function RenderCourses() {
    const courses = await getAllCourses();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
                <CourseCard key={course.id} data={course} />
            ))}
        </div>
    )
}

function LoadingSkeletonLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
            ))}
        </div>
    )
}
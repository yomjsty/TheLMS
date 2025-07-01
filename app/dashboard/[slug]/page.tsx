import { getCourseSidebarData } from "@/app/dal/course/get-course-sidebar-data";

interface iAppProps {
    params: Promise<{ slug: string }>;
}

export default async function CoursePage(
    { params }: iAppProps
) {
    const { slug } = await params;
    const course = await getCourseSidebarData(slug);

    if (course.course.chapters.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-2xl font-bold mb-2">No lessons available yet</h2>
                <p>This course is currently under construction. Please check back later.</p>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-2">Select a lesson to start learning</h2>
        </div>
    )
}

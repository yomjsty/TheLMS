import { getCourseSidebarData } from "@/app/dal/course/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface iAppProps {
    params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: iAppProps) {
    const { slug } = await params;
    const course = await getCourseSidebarData(slug);
    const firstChapter = course.course.chapters[0]
    const firstLesson = firstChapter.lessons[0]

    if (firstLesson) {
        redirect(`/dashboard/${slug}/${firstLesson.id}`)
    }

    return (
        <div className="flex items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-2">No lessons available yet</h2>
            <p>This course is currently under construction. Please check back later.</p>
        </div>
    )
}

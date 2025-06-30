import { getCourseSidebarData } from "@/app/dal/course/get-course-sidebar-data";
import { CourseSidebar } from "../_components/CourseSidebar"

interface iAppProps {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
}

export default async function CourseLayout({ params, children }: iAppProps) {
    const { slug } = await params;
    const course = await getCourseSidebarData(slug);

    return (
        <div className="flex flex-1">
            <div className="w-80 border-r border-border shrink-0">
                <CourseSidebar course={course.course} />
            </div>
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    )
}

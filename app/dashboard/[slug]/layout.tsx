import { getCourseSidebarData } from "@/app/dal/course/get-course-sidebar-data";
import { CourseSidebar } from "../_components/CourseSidebar"
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface iAppProps {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
}

export default async function CourseLayout({ params, children }: iAppProps) {
    const { slug } = await params;

    return (
        <div className="flex flex-1">
            <div className="w-80 border-r border-border shrink-0">
                <Suspense fallback={<LoadingSkeletonLayout />}>
                    <RenderCourseSidebar slug={slug} />
                </Suspense>
            </div>
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    )
}

async function RenderCourseSidebar({ slug }: { slug: string }) {
    const course = await getCourseSidebarData(slug);
    return (
        <CourseSidebar course={course.course} />
    )
}

function LoadingSkeletonLayout() {
    return (
        <div className="flex flex-1">
            <div className="w-80 border-r border-border shrink-0 flex items-center justify-center min-h-screen">
                <Loader2 className="size-10 animate-spin" />
            </div>
        </div>
    )
}


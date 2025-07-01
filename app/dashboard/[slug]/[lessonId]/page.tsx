import { getLessonContent } from "@/app/dal/course/get-lesson-content"
import { CourseContent } from "./_components/CourseContent";
import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";

type Params = Promise<{ lessonId: string }>

export default async function LessonPage({ params }: { params: Params }) {
    const { lessonId } = await params;

    return (
        <Suspense fallback={<LessonSkeleton />}>
            <LessonLoader lessonId={lessonId} />
        </Suspense>
    )
}

async function LessonLoader({ lessonId }: { lessonId: string }) {
    const data = await getLessonContent(lessonId);
    return (
        <CourseContent data={data} />
    )
}
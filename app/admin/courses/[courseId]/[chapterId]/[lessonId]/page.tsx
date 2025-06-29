import { adminGetLesson } from "@/app/dal/admin/admin-get-lesson"
import { LessonForm } from "./_components/LessonForm";

type Params = Promise<{
    courseId: string,
    chapterId: string,
    lessonId: string
}>

export default async function LessonPage({ params }: { params: Params }) {
    const { courseId, chapterId, lessonId } = await params;
    const lesson = await adminGetLesson(lessonId);


    return (
        <div>
            <LessonForm chapterId={chapterId} courseId={courseId} data={lesson} />
        </div>
    )
}
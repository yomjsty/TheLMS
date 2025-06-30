import { getLessonContent } from "@/app/dal/course/get-lesson-content"
import { CourseContent } from "./_components/CourseContent";

type Params = Promise<{ lessonId: string }>

export default async function LessonPage({ params }: { params: Params }) {
    const { lessonId } = await params;
    const data = await getLessonContent(lessonId);

    return (
        <CourseContent data={data} />
    )
}

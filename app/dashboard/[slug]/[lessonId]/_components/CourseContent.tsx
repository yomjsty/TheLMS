"use client"

import { LessonContentType } from "@/app/dal/course/get-lesson-content"
import { RenderDescription } from "@/components/text-editor/RenderDescription"
import { Button } from "@/components/ui/button"
import { tryCatch } from "@/hooks/try-catch"
import { useConstructUrl } from "@/hooks/use-construct-url"
import { BookIcon, CheckCircle, Loader2 } from "lucide-react"
import { useTransition } from "react"
import { markLessonComplete } from "../actions"
import { toast } from "sonner"

interface iAppProps {
    data: LessonContentType
}


export function CourseContent({ data }: iAppProps) {
    const [pending, startTransition] = useTransition();

    function VideoPlayer({
        thumbnailKey,
        videoKey,
    }: {
        thumbnailKey: string,
        videoKey: string,
    }) {
        const videoUrl = useConstructUrl(videoKey)
        const thumbnailUrl = useConstructUrl(thumbnailKey)

        if (!videoKey) {
            return (
                <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
                    <BookIcon className="size-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">This lesson has no video yet.</p>
                </div>
            )
        }

        return (
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                <video
                    className="w-full h-full object-cover"
                    controls
                    poster={thumbnailUrl}
                >
                    <source
                        src={videoUrl}
                        type="video/mp4"
                    />
                    <source
                        src={videoUrl}
                        type="video/webm"
                    />
                    <source
                        src={videoUrl}
                        type="video/ogg"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }

    function onSubmit() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(markLessonComplete(data.id, data.Chapter.Course.slug))

            if (error) {
                if (error.message === "NEXT_REDIRECT") {
                    toast.error("You are not an admin")
                } else {
                    toast.error(error.message)
                }
                return
            }

            if (result.status === "success") {
                toast.success(result.message)
            } else if (result.status === "error") {
                toast.error(result.message)
            }
        })
    }

    return (
        <div className="flex flex-col h-full bg-background pl-4">
            <VideoPlayer thumbnailKey={data.thumbnailKey ?? ""} videoKey={data.videoKey ?? ""} />

            <div className="py-4 border-b">
                {data.lessonProgress.length > 0 ? (
                    <Button className="bg-green-600/10 text-green-500 hover:text-green-600" variant="outline">
                        <CheckCircle className="size-4 mr-2 text-green-500 hover:text-green-600" />
                        Completed
                    </Button>
                ) : (
                    <Button variant="outline" onClick={onSubmit} disabled={pending}>
                        <CheckCircle className="size-4 mr-2 text-green-500" />
                        {pending && <Loader2 className="size-4 ml-2 animate-spin" />} Mark as complete
                    </Button>
                )}
            </div>

            <div className="space-y-3 pt-3">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{data.title}</h1>
                {data.description && (
                    <RenderDescription json={JSON.parse(data.description)} />
                )}
            </div>
        </div>
    )
}
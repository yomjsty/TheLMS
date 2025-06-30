import { LessonContentType } from "@/app/dal/course/get-lesson-content"
import { RenderDescription } from "@/components/text-editor/RenderDescription"
import { Button } from "@/components/ui/button"
import { useConstructUrl } from "@/hooks/use-construct-url"
import { BookIcon, CheckCircle } from "lucide-react"

interface iAppProps {
    data: LessonContentType
}


export function CourseContent({ data }: iAppProps) {
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

    return (
        <div className="flex flex-col h-full bg-background pl-4">
            <VideoPlayer thumbnailKey={data.thumbnailKey ?? ""} videoKey={data.videoKey ?? ""} />

            <div className="py-4 border-b">
                <Button variant="outline">
                    <CheckCircle className="size-4 mr-2 text-green-500" />
                    Mark as complete
                </Button>
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
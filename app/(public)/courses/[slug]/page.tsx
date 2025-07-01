import { getCourse } from "@/app/dal/course/get-course";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { env } from "@/lib/env";
import { IconBook, IconCategory, IconChartBar, IconChevronDown, IconClock, IconPlayerPlay } from "@tabler/icons-react";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { checkIfCourseBought } from "@/app/dal/user/user-is-enrolled";
import Link from "next/link";
import { EnrollmentButton } from "./_components/EnrollmentButton";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { CourseSkeleton } from "./_components/CourseSkeleton";

type Params = Promise<{
    slug: string
}>

export default async function CoursePage({ params }: { params: Params }) {
    const { slug } = await params;

    return (
        <Suspense fallback={<CourseSkeleton />}>
            <CourseLoader slug={slug} />
        </Suspense>
    )
}

async function CourseLoader({ slug }: { slug: string }) {
    const course = await getCourse(slug);
    const isEnrolled = await checkIfCourseBought(course.id)

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
            <div className="order-1 lg:col-span-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                    <Image
                        src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
                        alt="Course Thumbnail"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent">
                    </div>
                </div>
                <div className="mt-8 space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{course.smallDescription}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Badge className="flex items-center gap-1 px-2.5 py-1">
                            <IconChartBar className="size-4" />
                            <span>{course.level}</span>
                        </Badge>
                        <Badge className="flex items-center gap-1 px-2.5 py-1">
                            <IconCategory className="size-4" />
                            <span>{course.category}</span>
                        </Badge>
                        <Badge className="flex items-center gap-1 px-2.5 py-1">
                            <IconClock className="size-4" />
                            <span>{course.duration} hours</span>
                        </Badge>
                    </div>
                    <Separator className="my-4" />

                    <div className="space-y-5">
                        <h2 className="text-2xl font-semibold tracking-tight">Course Description</h2>
                        <RenderDescription json={JSON.parse(course.description)} />
                    </div>
                </div>
                <div className="mt-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold tracking-tight">Course Content</h2>
                        <div className="">
                            {course.chapters.length} Chapters | {course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0) || 0} Lessons
                        </div>
                    </div>
                    <div className="space-y-4">
                        {course.chapters.map((chapter, index) => (
                            <Collapsible key={chapter.id} defaultOpen={index === 0}>
                                <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                                    <CollapsibleTrigger>
                                        <div className="">
                                            <CardContent className="p-6 hover:bg-muted-foreground/10 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">{index + 1}</p>
                                                        <div className="">
                                                            <h3 className="text-xl font-semibold text-left">{chapter.title}</h3>
                                                            {/* <p className="text-sm text-muted-foreground mt-1 text-left">
                                                                {chapter.lessons.length} Lesson
                                                                {chapter.lessons.length !== 1 ? "s" : ""}
                                                            </p> */}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline" className="text-xs">
                                                            {chapter.lessons.length} Lesson
                                                            {chapter.lessons.length !== 1 ? "s" : ""}
                                                        </Badge>
                                                        <IconChevronDown className="size-5 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="border-top bg-muted-foreground/5">
                                            <div className="p-6 pt-4 space-y-3">
                                                {chapter.lessons.map((lesson, lessonIndex) => (
                                                    <div className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors group" key={lesson.id}>
                                                        <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                                                            <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">{lesson.title}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">Lesson {lessonIndex + 1}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        ))}
                    </div>
                </div>
            </div>

            <div className="order-2 lg:col-span-1">
                <div className="sticky top-24">
                    <Card className="py-0">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium">Price</span>
                                <span className="text-lg font-semibold text-primary">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(course.price)}</span>
                            </div>
                            <div className="mb-6 space-y-3 rounded-lg bg-muted-foreground/10 p-4">
                                <h4 className="font-medium">What you will get:</h4>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconClock className="size-4" />
                                        </div>
                                        <div className="">
                                            <p className="text-sm font-medium">Course Duration</p>
                                            <p className="text-sm text-muted-foreground">{course.duration} hours</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconChartBar className="size-4" />
                                        </div>
                                        <div className="">
                                            <p className="text-sm font-medium">Category</p>
                                            <p className="text-sm text-muted-foreground">{course.category}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconChartBar className="size-4" />
                                        </div>
                                        <div className="">
                                            <p className="text-sm font-medium">Level</p>
                                            <p className="text-sm text-muted-foreground">{course.level}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconBook className="size-4" />
                                        </div>
                                        <div className="">
                                            <p className="text-sm font-medium">Total Lessons</p>
                                            <p className="text-sm text-muted-foreground">
                                                {course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0) || 0} Lessons
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 space-y-3">
                                <h4>This course includes:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm">
                                        <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                                            <CheckIcon className="size-3" />
                                        </div>
                                        <span>Full lifetime access</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                                            <CheckIcon className="size-3" />
                                        </div>
                                        <span>Access on mobile and desktop</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                                            <CheckIcon className="size-3" />
                                        </div>
                                        <span>Certificate of completion</span>
                                    </li>
                                </ul>
                            </div>

                            {isEnrolled ? (
                                <Link href={`/dashboard`} className={buttonVariants({ variant: "default", className: "w-full" })}>
                                    Learn Now!
                                </Link>
                            ) : (
                                <EnrollmentButton courseId={course.id} />
                            )}
                            <p className="text-center text-xs text-muted-foreground">30-day money-back guarantee</p>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    )

}
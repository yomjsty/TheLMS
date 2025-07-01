/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { EnrolledCourseType } from "@/app/dal/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
    data: EnrolledCourseType
}

export function CourseProgressCard({ data }: iAppProps) {
    const thumbnailUrl = useConstructUrl(data.Course.fileKey);
    const { completedLessons, totalLessons, progressPercentage } = useCourseProgress({ courseData: data.Course as any })

    return (
        <Card className="group relative py-0 gap-0">
            <Badge className="absolute top-2 right-2 z-10">
                {data.Course.level}
            </Badge>
            <Image
                src={thumbnailUrl}
                alt="Thumbnail Image"
                width={600}
                height={400}
                className="w-full h-full rounded-t-xl aspect-video object-cover"
            />
            <CardContent className="p-4">
                <Link
                    href={`/dashboard/${data.Course.slug}`}
                    className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors"
                >
                    {data.Course.title}
                </Link>
                <p className="text-sm text-muted-foreground leading-tight mt-2 line-clamp-2 whitespace-pre-line">{data.Course.smallDescription}</p>

                <div className="space-y-1 mt-5">
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <p>Progress:</p>
                        <p className="font-medium">
                            {progressPercentage}%
                        </p>
                    </div>
                    <Progress value={progressPercentage} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">{completedLessons} of {totalLessons} lessons completed</p>
                </div>

                <Link
                    href={`/dashboard/${data.Course.slug}`}
                    className={buttonVariants({ className: "w-full mt-4" })}
                >
                    Learn More
                </Link>
            </CardContent>
        </Card>
    )
}

export function CourseCardSkeleton() {
    return (
        <Card className="group relative py-0 gap-0">
            <div className="absolute top-2 right-2 z-10 flex items-center">
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="w-full relative h-fit">
                <Skeleton className="w-full rounded-t-xl aspect-video" />
            </div>
            <CardContent className="p-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                </div>
                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                </div>
                <Skeleton className="w-full h-10 mt-4 rounded-md" />
            </CardContent>
        </Card>
    )
}

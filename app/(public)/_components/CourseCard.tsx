import { CourseType } from "@/app/dal/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { School2Icon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
    data: CourseType
}

export function CourseCard({ data }: iAppProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey);

    return (
        <Card className="group relative py-0 gap-0">
            <Badge className="absolute top-2 right-2 z-10">
                {data.level}
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
                    href={`/courses/${data.slug}`}
                    className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors"
                >
                    {data.title}
                </Link>
                <p className="text-sm text-muted-foreground leading-tight mt-2 line-clamp-2 whitespace-pre-line">{data.smallDescription}</p>

                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
                        <p className="text-sm text-muted-foreground">{data.duration}h</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <School2Icon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
                        <p className="text-sm text-muted-foreground">{data.category}</p>
                    </div>
                </div>

                <Link
                    href={`/courses/${data.slug}`}
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

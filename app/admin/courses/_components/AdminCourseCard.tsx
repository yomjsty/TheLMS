import { AdminCourseType } from "@/app/dal/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { EyeIcon, MoreVerticalIcon, PencilIcon, School2Icon, TimerIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
    data: AdminCourseType
}

export function AdminCourseCard({ data }: iAppProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey)

    return (
        <Card className="group relative pt-0 gap-0">
            <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVerticalIcon className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.id}/edit`}>
                                <PencilIcon className="size-4 mr-2" />
                                Edit Course
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/courses/${data.slug}`} target="_blank">
                                <EyeIcon className="size-4 mr-2" />
                                Preview Course
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.id}/delete`} className="text-destructive">
                                <TrashIcon className="size-4 mr-2 text-destructive" />
                                Delete Course
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Image
                src={thumbnailUrl}
                alt={`${data.title} Thumbnail`}
                width={600}
                height={400}
                className="w-full rounded-t-lg aspect-video h-full object-cover"
            />
            <CardContent className="pt-4">
                <Link
                    href={`/admin/courses/${data.id}/edit`}
                    className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
                >
                    {data.title}
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-2 leading-tight mt-2 whitespace-pre-line">{data.smallDescription}</p>

                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
                        <p className="text-sm text-muted-foreground">{data.duration}h</p>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <School2Icon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
                        <p className="text-sm text-muted-foreground">{data.level}</p>
                    </div>
                </div>

                <Link
                    href={`/admin/courses/${data.id}/edit`}
                    className={buttonVariants({ variant: "outline", className: "w-full mt-4" })}
                >
                    Edit Course
                </Link>
            </CardContent>
        </Card>
    )
}
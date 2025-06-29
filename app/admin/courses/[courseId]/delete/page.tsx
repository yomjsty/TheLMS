"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { Loader2, Trash2Icon } from "lucide-react";

export default function DeleteCoursePage() {
    const [pending, startTransition] = useTransition();
    const { courseId } = useParams<{ courseId: string }>();
    const router = useRouter();

    function onSubmit() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(deleteCourse(courseId))

            if (error) {
                toast.error("An unexpected error occurred. Please try again later.")
                return
            }

            if (result.status === "success") {
                toast.success(result.message)
                router.push(`/admin/courses`)
            } else if (result.status === "error") {
                toast.error(result.message)
            }
        })
    }
    return (
        <div className="max-w-xl mx-auto w-full">
            <Card className="mt-32">
                <CardHeader>
                    <CardTitle>
                        Are your absolutely sure?
                    </CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will delete the course and all associated data.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-2">
                    <Link href={`/admin/courses/`} className={buttonVariants({ variant: "outline" })}>
                        Go back
                    </Link>
                    <Button variant="destructive" onClick={onSubmit} disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Deleting...</span>
                            </>
                        ) : (
                            <>
                                <Trash2Icon className="size-4" />
                                <span>Delete Course</span>
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

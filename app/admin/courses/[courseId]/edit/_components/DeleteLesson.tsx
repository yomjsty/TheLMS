"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../actions";
import { toast } from "sonner";

export function DeleteLesson({
    chapterId,
    courseId,
    lessonId
}: {
    chapterId: string,
    courseId: string,
    lessonId: string
}) {
    const [isOpen, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    async function onSubmit() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(deleteLesson({ chapterId, courseId, lessonId }))

            if (error) {
                toast.error("An error occurred while deleting the lesson. Please try again.")
            }

            if (result?.status === "success") {
                toast.success(result.message)
                setOpen(false);
            } else if (result?.status === "error") {
                toast.error(result.message)
            }
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2Icon className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete the lesson and all of its content.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <Button onClick={onSubmit} disabled={pending} variant="destructive">
                        {pending ? (
                            <>
                                <Loader2Icon className="size-4 animate-spin" />
                                Deleting...
                            </>
                        ) : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
} 
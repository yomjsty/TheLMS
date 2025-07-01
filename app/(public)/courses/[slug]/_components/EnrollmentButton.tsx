"use client";

import { Button } from "@/components/ui/button";
import { enrollInCourse } from "../actions";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function EnrollmentButton({ courseId }: { courseId: string }) {
    const [pending, startTransition] = useTransition();

    function onSubmit() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(enrollInCourse(courseId))

            if (error) {
                toast.error("You need to be logged in to enroll in a course.")
                return
            }

            if (result.status === "success") {
                toast.success(result.message)
            } else if (result.status === "error") {
                toast.error(result.message)
            }
        })
    }

    return <Button className="w-full" onClick={onSubmit} disabled={pending}>
        {pending ? (
            <>
                <Loader2 className="size-4 animate-spin" />
                <span>Enrolling...</span>
            </>

        ) : (
            "Enroll Now!"
        )}
    </Button>
}
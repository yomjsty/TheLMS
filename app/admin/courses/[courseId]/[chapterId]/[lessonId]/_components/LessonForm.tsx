"use client"

import { AdminLessonType } from "@/app/dal/admin/admin-get-lesson"
import { Uploader } from "@/components/file-uploader/Uploader";
import { TextEditor } from "@/components/text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateLesson } from "../actions";
import { toast } from "sonner";

interface iAppProps {
    data: AdminLessonType;
    chapterId: string;
    courseId: string;
}

export function LessonForm({ chapterId, courseId, data }: iAppProps) {
    const [pending, startTransition] = useTransition();

    const form = useForm<LessonSchemaType>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            name: data.title,
            chapterId,
            courseId,
            description: data.description ?? undefined,
            videoKey: data.videoKey ?? undefined,
            thumbnailKey: data.thumbnailKey ?? undefined,
        },
    })

    function onSubmit(values: LessonSchemaType) {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(updateLesson(values, data.id))

            if (error) {
                toast.error("An unexpected error occurred. Please try again later.")
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
        <div>
            <Link href={`/admin/courses/${courseId}/edit`} className={buttonVariants({ variant: "ghost", className: "mb-6" })}>
                <ArrowLeft className="size-4" />
                <span>Go back</span>
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Lesson Details
                    </CardTitle>
                    <CardDescription>
                        Edit the lesson details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lesson Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Lesson 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lesson Description</FormLabel>
                                        <FormControl>
                                            <TextEditor field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="thumbnailKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail Image</FormLabel>
                                        <FormControl>
                                            <Uploader onChange={field.onChange} value={field.value} fileTypeAccepted="image" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="videoKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Video File</FormLabel>
                                        <FormControl>
                                            <Uploader onChange={field.onChange} value={field.value} fileTypeAccepted="video" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={pending}>
                                {pending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : "Save Changes"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
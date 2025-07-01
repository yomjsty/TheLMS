"use server"

import { requireUser } from "@/app/dal/user/require-user"
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: string, slug: string): Promise<ApiResponse> {
    const session = await requireUser();

    try {
        await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: session.id,
                    lessonId
                },
            },
            update: {
                completed: true
            },
            create: {
                lessonId,
                userId: session.id,
                completed: true
            }
        })

        revalidatePath(`/dashboard/${slug}`)

        return {
            status: "success",
            message: "Lesson marked as complete"
        }
    } catch {
        return {
            status: "error",
            message: "Failed to mark lesson as complete"
        }
    }
}
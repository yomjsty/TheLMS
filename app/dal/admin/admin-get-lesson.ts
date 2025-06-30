import "server-only"

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetLesson(id: string) {
    await requireAdmin();

    const data = await prisma.lesson.findUnique({
        where: {
            id
        },
        select: {
            title: true,
            description: true,
            videoKey: true,
            thumbnailKey: true,
            id: true,
            position: true,
        }
    })

    if (!data) {
        return notFound();
    }

    return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>
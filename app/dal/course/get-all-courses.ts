import "server-only"

import { prisma } from "@/lib/db";

export async function getAllCourses() {
    const data = await prisma.course.findMany({
        where: {
            status: "Published"
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            title: true,
            price: true,
            smallDescription: true,
            slug: true,
            fileKey: true,
            id: true,
            level: true,
            duration: true,
            category: true,
        }
    })

    return data;
}

export type CourseType = Awaited<ReturnType<typeof getAllCourses>>[0]
import "server-only"

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getCourse(slug: string) {
    const course = await prisma.course.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            title: true,
            description: true,
            fileKey: true,
            price: true,
            duration: true,
            level: true,
            category: true,
            smallDescription: true,
            chapters: {
                select: {
                    id: true,
                    title: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                        },
                        orderBy: {
                            position: "asc"
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    })

    if (!course) {
        return notFound();
    }

    return course;
}

"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getEnrolledCourses() {
    const user = await requireUser();

    const data = await prisma.enrollment.findMany({
        where: {
            userId: user.id,
            status: "Active"
        },
        select: {
            Course: {
                select: {
                    id: true,
                    smallDescription: true,
                    title: true,
                    fileKey: true,
                    level: true,
                    slug: true,
                    duration: true,
                    chapters: {
                        select: {
                            id: true,
                            lessons: {
                                select: {
                                    id: true,
                                    lessonProgress: {
                                        where: {
                                            userId: user.id
                                        },
                                        select: {
                                            id: true,
                                            lessonId: true,
                                            completed: true,
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        }
    })

    return data;
}

export type EnrolledCourseType = Awaited<ReturnType<typeof getEnrolledCourses>>[0];
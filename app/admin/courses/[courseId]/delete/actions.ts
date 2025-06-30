"use server"

import { requireAdmin } from "@/app/dal/admin/require-admin"
import { fixedWindow } from "@/lib/arcjet";
import arcjet from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet.withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5,
    })
)

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
    const session = await requireAdmin();

    try {
        const req = await request()
        const decision = await aj.protect(req, {
            fingerprint: session?.user.id,
        })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: "error",
                    message: "Too many requests"
                };
            }
            else {
                return { status: "error", message: "We detected malicious user. If you think this is an error, please contact support." }
            }
        }

        await prisma.course.delete({
            where: {
                id: courseId
            }
        })

        revalidatePath("/admin/courses");

        return {
            status: "success",
            message: "Course deleted successfully"
        }
    } catch {
        return {
            status: "error",
            message: "Failed to delete course"
        }
    }
}
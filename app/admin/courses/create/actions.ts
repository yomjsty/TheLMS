"use server"

import { requireAdmin } from "@/app/dal/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { courseSchema, CourseSchemaType } from "@/lib/schema";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5,
    })
)

export async function CreateCourse(values: CourseSchemaType): Promise<ApiResponse> {
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

        const validation = courseSchema.safeParse(values)

        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid data"
            }
        }

        const data = await stripe.products.create({
            name: validation.data.title,
            description: validation.data.smallDescription,
            default_price_data: {
                currency: "idr",
                unit_amount: validation.data.price * 100,
            }
        })

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id as string,
                stripePriceId: data.default_price as string,
            }
        })

        return {
            status: "success",
            message: "Course created successfully",
        }
    } catch {
        return {
            status: "error",
            message: "Failed to create course"
        }
    }
}
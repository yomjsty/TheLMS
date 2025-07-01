import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3client";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/app/dal/admin/require-admin";

const fileUploadSchema = z.object({
    fileName: z.string().min(1, { message: "File name is required" }),
    contentType: z.string().min(1, { message: "Content type is required" }),
    size: z.number().min(1, { message: "Size is required" }),
    isImage: z.boolean(),
})

const aj = arcjet.withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5,
    })
)

export async function POST(request: Request) {
    const session = await requireAdmin();

    try {
        const decision = await aj.protect(request, {
            fingerprint: session?.user.id as string,
        })

        if (decision.isDenied()) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 })
        }

        const body = await request.json();

        const validation = fileUploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
        }

        const { fileName, contentType, size } = validation.data;

        const uniqueKey = `${uuidv4()}-${fileName}`

        const command = new PutObjectCommand({
            Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
            ContentType: contentType,
            ContentLength: size,
            Key: uniqueKey
        });

        const presignedUrl = await getSignedUrl(S3, command, {
            expiresIn: 360,
        });

        const response = {
            presignedUrl,
            key: uniqueKey,
        };

        return NextResponse.json(response, { status: 200 })

    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
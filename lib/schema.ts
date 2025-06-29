import { z } from "zod"

export const loginWithEmailSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export type LoginWithEmailType = z.infer<typeof loginWithEmailSchema>

export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const
export const courseCategories = ['Programming', 'Data Science', 'Web Development', 'Mobile Development', 'Game Development', 'Database', 'DevOps', 'Cloud', 'Cybersecurity', 'AI', 'Other'] as const
export const courseStatuses = ['Draft', 'Published', 'Archived'] as const

export const courseSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100, { message: "Title must be less than 100 characters" }),
    description: z.string().min(3, { message: "Description must be at least 3 characters" }),
    fileKey: z.string().min(1, { message: "File is required" }),
    price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
    duration: z.coerce.number().min(1, { message: "Duration cannot be 0" }).max(500, { message: "Duration must be less than 500 hours" }),
    level: z.enum(courseLevels, {
        message: "Level is required"
    }),
    category: z.enum(courseCategories, {
        message: "Category is required"
    }),
    smallDescription: z.string().min(3, { message: "Small description must be at least 3 characters" }).max(200, { message: "Small description must be less than 200 characters" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
    status: z.enum(courseStatuses, {
        message: "Status is required"
    }),
})

export const chapterSchema = z.object({
    name: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100, { message: "Title must be less than 100 characters" }),
    courseId: z.string().uuid({ message: "Invalid course Id." }),
})

export const lessonSchema = z.object({
    name: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100, { message: "Title must be less than 100 characters" }),
    courseId: z.string().uuid({ message: "Invalid course Id." }),
    chapterId: z.string().uuid({ message: "Invalid chapter Id." }),
    description: z.string().min(3, { message: "Description must be at least 3 characters" }).optional(),
    thumbnailKey: z.string().optional(),
    videoKey: z.string().optional(),
})

export type CourseSchemaType = z.infer<typeof courseSchema>
export type ChapterSchemaType = z.infer<typeof chapterSchema>
export type LessonSchemaType = z.infer<typeof lessonSchema>
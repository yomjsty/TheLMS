import { adminGetCourse } from "@/app/dal/admin/admin-get-course"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseForm } from "./_components/EditCourseForm";
import { CourseContent } from "./_components/CourseContent";

export default async function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const data = await adminGetCourse(courseId)

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Edit Course: <span className="text-primary underline">{data.title}</span></h1>

            <Tabs defaultValue="basic-info">
                <TabsList className="grid grid-cols-2 w-full gap-2">
                    <TabsTrigger value="basic-info">
                        Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="course-content">
                        Course Content
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="basic-info">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Basic Info
                            </CardTitle>
                            <CardDescription>
                                Edit the basic info of the course
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EditCourseForm data={data} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="course-content">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Course Content
                            </CardTitle>
                            <CardDescription>
                                Here you can add, edit or delete the course content
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CourseContent data={data} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

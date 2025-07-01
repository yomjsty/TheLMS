import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
            <div className="order-1 lg:col-span-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="mt-8 space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-28 rounded-full" />
                    </div>
                    <Separator className="my-4" />

                    <div className="space-y-5">
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-32" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-2 lg:col-span-1">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-full h-96" />
                    </div>
                </div>
            </div>
        </div>
    )
}

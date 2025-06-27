
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DndContext, DragEndEvent, DraggableSyntheticListeners, KeyboardSensor, PointerSensor, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ReactNode, useEffect, useState } from "react";
import { CSS } from '@dnd-kit/utilities';
import { AdminCourseSingularType } from "@/app/dal/admin/admin-get-course";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon, ChevronDownIcon, GripVerticalIcon, Trash2Icon, FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { reorderChapters, reorderLessons } from "../actions";

interface iAppProps {
    data: AdminCourseSingularType
}

interface SortableItemProps {
    id: string;
    children: (listener: DraggableSyntheticListeners) => ReactNode;
    className?: string;
    data?: {
        type: "chapter" | "lesson";
        chapterId?: string;
    }
}

export function CourseContent({ data }: iAppProps) {
    const initialItems = data.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        order: chapter.position,
        isOpen: true,
        lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
        }))
    })) || []

    const [items, setItems] = useState(initialItems)

    useEffect(() => {
        setItems((prevItems) => {
            const updatedItems = data.chapters.map((chapter) => ({
                id: chapter.id,
                title: chapter.title,
                order: chapter.position,
                isOpen: prevItems.find((item) => item.id === chapter.id)?.isOpen ?? true,
                lessons: chapter.lessons.map((lesson) => ({
                    id: lesson.id,
                    title: lesson.title,
                    order: lesson.position,
                })),
            })) || []

            return updatedItems;
        })
    }, [data])

    function SortableItem({ id, children, className, data }: SortableItemProps) {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging
        } = useSortable({ id, data });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} className={cn(
                "touch-none", className, isDragging ? "z-10" : ""
            )}>
                {children(listeners)}
            </div>
        );
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const activeId = active.id;
        const overId = over.id;
        const activeType = active.data.current?.type as "chapter" | "lesson";
        const overType = over.data.current?.type as "chapter" | "lesson";
        const courseId = data.id;

        if (activeType === "chapter") {
            let targetChapterId = null;

            if (overType === "chapter") {
                targetChapterId = overId;
            } else if (overType === "lesson") {
                targetChapterId = over.data.current?.chapterId ?? null
            }

            if (!targetChapterId) {
                toast.error("Something went wrong. Please try again.");
                return
            }

            const oldIndex = items.findIndex((item) => item.id === activeId)
            const newIndex = items.findIndex((item) => item.id === targetChapterId)

            if (oldIndex === -1 || newIndex === -1) {
                toast.error("Something went wrong. Please try again.");
                return;
            }

            const reorderedLocalChapters = arrayMove(items, oldIndex, newIndex);
            const updatedChapterForState = reorderedLocalChapters.map(
                (chapter, index) => ({
                    ...chapter,
                    order: index + 1,
                })
            )

            const previousItems = [...items];

            setItems(updatedChapterForState);

            if (courseId) {
                const chaptersToUpdate = updatedChapterForState.map((chapter) => ({
                    id: chapter.id,
                    position: chapter.order,
                }))

                const reorderedChaptersPromise = () => reorderChapters(courseId, chaptersToUpdate)

                toast.promise(reorderedChaptersPromise(), {
                    loading: "Reordering chapters...",
                    success: (result) => {
                        if (result.status === "success") return result.message;
                        throw new Error(result.message);
                    },
                    error: () => {
                        setItems(previousItems);
                        return "Failed to reorder chapters. Please try again."
                    }
                })
            }
        }

        if (activeType === "lesson" && overType === "lesson") {
            const chapterId = active.data.current?.chapterId;
            const overChapterId = over.data.current?.chapterId;

            if (!chapterId || chapterId !== overChapterId) {
                toast.error("Lesson move between chapters is not allowed.");
                return;
            }

            const chapterIndex = items.findIndex((chapter) => chapter.id === chapterId);

            if (chapterIndex === -1) {
                toast.error("Could not find chapter for this lesson.");
                return
            }

            const chapterToUpdate = items[chapterIndex];
            const oldLessonIndex = chapterToUpdate.lessons.findIndex((lesson) => lesson.id === activeId);
            const newLessonIndex = chapterToUpdate.lessons.findIndex((lesson) => lesson.id === overId);

            if (oldLessonIndex === -1 || newLessonIndex === -1) {
                toast.error("Could not find lesson for reordering.");
            }

            const reorderedLessons = arrayMove(chapterToUpdate.lessons, oldLessonIndex, newLessonIndex);
            const updatedLessonForState = reorderedLessons.map((lesson, index) => ({
                ...lesson,
                order: index + 1,
            }))
            const newItems = [...items];

            newItems[chapterIndex] = {
                ...chapterToUpdate,
                lessons: updatedLessonForState
            }

            const previousItems = [...items];

            setItems(newItems);

            if (courseId) {
                const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
                    id: lesson.id,
                    position: lesson.order,
                }))

                const reorderedLessonsPromise = () => reorderLessons(chapterId, lessonsToUpdate, courseId)

                toast.promise(reorderedLessonsPromise(), {
                    loading: "Reordering lessons...",
                    success: (result) => {
                        if (result.status === "success") return result.message;
                        throw new Error(result.message);
                    },
                    error: () => {
                        setItems(previousItems);
                        return "Failed to reorder lessons. Please try again."
                    }
                })
            }

            return;
        }
    }

    function toggleChapter(chapterId: string) {
        setItems(
            items.map((chapter) => chapter.id === chapterId ? { ...chapter, isOpen: !chapter.isOpen } : chapter)
        )
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-border">
                    <CardTitle>
                        Chapters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SortableContext strategy={verticalListSortingStrategy} items={items}>
                        {items.map((item) => (
                            <SortableItem id={item.id} data={{ type: "chapter" }} key={item.id}>
                                {(listeners) => (
                                    <Card className="py-0">
                                        <Collapsible open={item.isOpen} onOpenChange={() => toggleChapter(item.id)}>
                                            <div className="flex items-center justify-between p-3 border-b border-border">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        {...listeners}
                                                        className="cursor-grab focus:cursor-grabbing"
                                                    >
                                                        <GripVerticalIcon className="size-4" />
                                                    </Button>
                                                    <CollapsibleTrigger asChild>
                                                        <Button size="icon" variant="ghost" className="flex items-center">
                                                            {item.isOpen ? (
                                                                <ChevronDownIcon className="size-4" />
                                                            ) : (
                                                                <ChevronRightIcon className="size-4" />
                                                            )}
                                                        </Button>
                                                    </CollapsibleTrigger>
                                                    <p className="cursor-pointer hover:text-primary pl-2">
                                                        {item.title}
                                                    </p>
                                                </div>

                                                <Button size="icon" variant="ghost">
                                                    <Trash2Icon className="size-4" />
                                                </Button>
                                            </div>

                                            <CollapsibleContent>
                                                <div className="p-2 space-y-2">
                                                    <SortableContext
                                                        items={item.lessons.map((lesson) => lesson.id)}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        {item.lessons.map((lesson) => (
                                                            <SortableItem key={lesson.id} id={lesson.id} data={{ type: "lesson", chapterId: item.id }}>
                                                                {(lessonListeners) => (
                                                                    <div className="flex items-center justify-between p-2 hover:bg-accent rounded-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            <Button variant="ghost" size="icon" {...lessonListeners} className="cursor-grab focus:cursor-grabbing">
                                                                                <GripVerticalIcon className="size-4" />
                                                                            </Button>
                                                                            <FileTextIcon className="size-4" />
                                                                            <Link href={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}>
                                                                                {lesson.title}
                                                                            </Link>
                                                                        </div>
                                                                        <Button size="icon" variant="ghost">
                                                                            <Trash2Icon className="size-4" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </SortableItem>
                                                        ))}
                                                    </SortableContext>
                                                    <div className="">
                                                        <Button variant="outline" className="w-full">
                                                            Create New Lesson
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </Card>
                                )}
                            </SortableItem>
                        ))}
                    </SortableContext>
                </CardContent>
            </Card>
        </DndContext>
    )
}

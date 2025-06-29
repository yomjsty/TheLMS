import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, CloudUploadIcon, ImageIcon, Loader2, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";


export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
                <CloudUploadIcon
                    className={cn(
                        "size-6 text-muted-foreground",
                        isDragActive && "text-primary"
                    )}
                />
            </div>
            <p className="text-base font-semibold text-foreground">Drop your files here or <span className="text-primary font-bold cursor-pointer">click to upload</span></p>
            <Button
                className="mt-4"
                type="button"
            >
                Select File
            </Button>
        </div>
    )
}

export function RenderErrorState() {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
                <ImageIcon
                    className={cn(
                        "size-6 text-destructive",
                    )}
                />
            </div>

            <p className="text-base font-semibold">Upload Failed</p>
            <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
            {/* <p className="text-xs mt-3 text-muted-foreground">Click or drag file to retry</p> */}
            <Button
                type="button"
                className="mt-4"
                variant="outline"
            >
                Retry <ArrowUpRightIcon className="size-4" />
            </Button>
        </div>
    )
}

export function RenderUploadedState({ previewUrl, isDeleting, onDelete, fileType }: { previewUrl: string, isDeleting: boolean, onDelete: () => void, fileType: "image" | "video" }) {
    return (
        <div className="relative group w-full h-full flex items-center justify-center">
            {fileType === "video" ? (
                <video src={previewUrl} className="rounded-md w-full h-full" controls />
            ) : <Image
                src={previewUrl}
                alt="Uploaded File"
                fill
                className="object-contain p-2"
                sizes="80%"
            />}
            <Button
                variant="default"
                size="icon"
                className={cn(
                    "absolute top-2 right-2"
                )}
                onClick={onDelete}
                disabled={isDeleting}
            >
                {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2Icon className="size-4" />}
            </Button>
        </div>
    )
}

export function RenderUploadingState({ progress, file }: { progress: number, file: File }) {
    return (
        <div className="text-center flex justify-center items-center flex-col">
            <p>{progress}%</p>
            <p className="mt-2 text-sm font-medium text-foreground">Uploading...</p>
            <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>
        </div>
    )
}
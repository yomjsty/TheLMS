import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldXIcon } from "lucide-react";
import Link from "next/link";

export default function NotAdmin() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
                        <ShieldXIcon className="size-16 text-destructive" />
                    </div>

                    <CardTitle className="text-2xl">
                        Access Restricted
                    </CardTitle>

                    <CardDescription className="max-w-xs mx-auto">
                        You are not authorized to access this page.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Link href="/" className={buttonVariants({ className: "w-full" })}>
                        <ArrowLeft className="size-4 mr-1" />
                        Go to Home
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export const metadata = {
    title: "Access Restricted | LMS",
    description: "You are not authorized to access this page.",
    openGraph: {
        title: "Access Restricted | LMS",
        description: "You are not authorized to access this page.",
        url: "https://the-lms-one.vercel.app/not-admin",
        siteName: "LMS",
        images: [
            {
                url: "/logo-rectangle.png",
                width: 1200,
                height: 630,
                alt: "LMS Access Restricted"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Access Restricted | LMS",
        description: "You are not authorized to access this page.",
        images: ["/logo-rectangle.png"]
    },
    alternates: {
        canonical: "https://the-lms-one.vercel.app/not-admin"
    }
};

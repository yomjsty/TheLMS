import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
    return (
        <div className="w-full min-h-screen flex flex-1 justify-center items-center">
            <Card className="w-[350px]">
                <CardContent>
                    <div className="w-full flex justify-center">
                        <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="text-xl font-semibold">Payment Cancelled</h2>
                        <p className="text-sm text-muted-foreground mt-2 tracking-tight text-balance">
                            Your payment was not successful. You will not be charged. Please try again.
                        </p>

                        <Link href="/" className={buttonVariants({ className: "w-full mt-5" })}>
                            <ArrowLeftIcon className="size-4" />
                            Go back to homepage
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export const metadata = {
    title: "Payment Cancelled | LMS",
    description: "Your payment was not successful. You will not be charged. Please try again.",
    openGraph: {
        title: "Payment Cancelled | LMS",
        description: "Your payment was not successful. You will not be charged. Please try again.",
        url: "https://the-lms-one.vercel.app/payment/cancel",
        siteName: "LMS",
        images: [
            {
                url: "/logo-rectangle.png",
                width: 1200,
                height: 630,
                alt: "LMS Payment Cancelled"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Payment Cancelled | LMS",
        description: "Your payment was not successful. You will not be charged. Please try again.",
        images: ["/logo-rectangle.png"]
    },
    alternates: {
        canonical: "https://the-lms-one.vercel.app/payment/cancel"
    }
};

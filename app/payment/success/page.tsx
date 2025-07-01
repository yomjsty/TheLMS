import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
    return (
        <div className="w-full min-h-screen flex flex-1 justify-center items-center">
            <Card className="w-[350px]">
                <CardContent>
                    <div className="w-full flex justify-center">
                        <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="text-xl font-semibold">Payment Successful</h2>
                        <p className="text-sm text-muted-foreground mt-2 tracking-tight text-balance">
                            Congratulations! Your payment was successful. You can now access the course.
                        </p>

                        <Link href="/dashboard" className={buttonVariants({ className: "w-full mt-5" })}>
                            Go to dashboard
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export const metadata = {
    title: "Payment Successful | LMS",
    description: "Congratulations! Your payment was successful. You can now access the course.",
    openGraph: {
        title: "Payment Successful | LMS",
        description: "Congratulations! Your payment was successful. You can now access the course.",
        url: "https://the-lms-one.vercel.app/payment/success",
        siteName: "LMS",
        images: [
            {
                url: "/logo-rectangle.png",
                width: 1200,
                height: 630,
                alt: "LMS Payment Success"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Payment Successful | LMS",
        description: "Congratulations! Your payment was successful. You can now access the course.",
        images: ["/logo-rectangle.png"]
    },
    alternates: {
        canonical: "https://the-lms-one.vercel.app/payment/success"
    }
};

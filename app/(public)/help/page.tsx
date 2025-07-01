import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer:
            "Browse our Courses page, select a course you're interested in, and click the 'Enroll' button. You may need to sign in or create an account first.",
    },
    {
        question: "Can I access courses on mobile devices?",
        answer:
            "Yes! The LMS is fully responsive and works on all modern smartphones and tablets.",
    },
    {
        question: "How do I track my progress?",
        answer:
            "Your progress is automatically tracked. Visit your dashboard to see completed lessons, achievements, and recommendations.",
    },
    {
        question: "Who can I contact for support?",
        answer:
            "If you need further assistance, please visit our Contact page and reach out to our support team.",
    },
];

export default function HelpPage() {
    return (
        <div className="max-w-3xl mx-auto py-16">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <Badge variant="outline">Help & Support</Badge>
                <h1 className="text-4xl md:text-5xl font-bold">How can we help you?</h1>
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                    Find answers to common questions about The LMS platform. If you need more help, our support team is here for you.
                </p>
            </div>
            <div className="mb-16 space-y-6">
                {faqs.map((faq, idx) => (
                    <Card key={idx}>
                        <CardHeader>
                            <CardTitle>{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex flex-col items-center mt-12 space-y-4">
                <h2 className="text-xl font-semibold">Still need help?</h2>
                <Link href="/contact" className={buttonVariants({ size: "lg", variant: "secondary" })}>
                    Contact Support
                </Link>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Help & Support | LMS",
    description: "Find answers to common questions about The LMS platform or contact our support team for more help.",
    openGraph: {
        title: "Help & Support | LMS",
        description: "Find answers to common questions about The LMS platform or contact our support team for more help.",
        url: "https://the-lms-one.vercel.app/help",
        siteName: "LMS",
        images: [
            {
                url: "/logo-rectangle.png",
                width: 1200,
                height: 630,
                alt: "LMS Help & Support"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Help & Support | LMS",
        description: "Find answers to common questions about The LMS platform or contact our support team for more help.",
        images: ["/logo-rectangle.png"]
    },
    alternates: {
        canonical: "https://the-lms-one.vercel.app/help"
    }
};

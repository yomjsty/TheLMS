import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const features = [
    {
        title: "Interactive Learning",
        description:
            "Engage with dynamic content, quizzes, and interactive exercises that make learning more effective and enjoyable.",
        icon: "🎯",
    },
    {
        title: "Progress Tracking",
        description:
            "Monitor your learning journey with detailed progress reports, achievements, and personalized recommendations.",
        icon: "📊",
    },
    {
        title: "Mobile Learning",
        description:
            "Access your courses anytime, anywhere with our responsive mobile platform that works on all devices.",
        icon: "📱",
    },
    {
        title: "Expert Instructors",
        description:
            "Learn from industry experts and experienced educators who are passionate about sharing their knowledge.",
        icon: "👨‍🏫",
    },
];

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-16">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <Badge variant="outline">About The LMS</Badge>
                <h1 className="text-4xl md:text-5xl font-bold">Empowering Modern Learning</h1>
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                    The LMS is a next-generation Learning Management System designed to make education accessible, engaging, and effective for everyone. Our mission is to provide a seamless, interactive, and personalized learning experience for students, educators, and lifelong learners.
                </p>
            </div>
            <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-center">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-3xl mb-2">{feature.icon}</div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center mt-12 space-y-4">
                <h2 className="text-xl font-semibold">Ready to start your learning journey?</h2>
                <Link href="/courses" className={buttonVariants({ size: "lg" })}>
                    Explore Courses
                </Link>
            </div>
        </div>
    );
}

export const metadata = {
    title: "About | LMS",
    description: "Learn more about the LMS platform, our mission, and our key features for modern learning.",
    openGraph: {
        title: "About | LMS",
        description: "Learn more about the LMS platform, our mission, and our key features for modern learning.",
        url: "https://the-lms-one.vercel.app/about",
        siteName: "LMS",
        images: [
            {
                url: "/logo-rectangle.png",
                width: 1200,
                height: 630,
                alt: "About LMS"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "About | LMS",
        description: "Learn more about the LMS platform, our mission, and our key features for modern learning.",
        images: ["/logo-rectangle.png"]
    },
    alternates: {
        canonical: "https://the-lms-one.vercel.app/about"
    }
};

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Interactive Learning",
    description: "Engage with dynamic content, quizzes, and interactive exercises that make learning more effective and enjoyable.",
    icon: "🎯"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed progress reports, achievements, and personalized recommendations.",
    icon: "📊"
  },
  {
    title: "Mobile Learning",
    description: "Access your courses anytime, anywhere with our responsive mobile platform that works on all devices.",
    icon: "📱"
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry experts and experienced educators who are passionate about sharing their knowledge.",
    icon: "👨‍🏫"
  }
]

export default function Home() {

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">
            The Future of Learning Management Systems
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Elevate Your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive platform, and access high-quality content from anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/courses"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
              })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>
                <h3>{feature.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}

export const metadata = {
  title: "Home | LMS",
  description: "Discover a new way to learn with our modern, interactive platform, and access high-quality content from anywhere, anytime.",
  openGraph: {
    title: "Home | LMS",
    description: "Discover a new way to learn with our modern, interactive platform, and access high-quality content from anywhere, anytime.",
    url: "https://the-lms-one.vercel.app/",
    siteName: "LMS",
    images: [
      {
        url: "/logo-rectangle.png",
        width: 1200,
        height: 630,
        alt: "LMS Home Page"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | LMS",
    description: "Discover a new way to learn with our modern, interactive platform, and access high-quality content from anywhere, anytime.",
    images: ["/logo-rectangle.png"]
  },
  alternates: {
    canonical: "https://the-lms-one.vercel.app/"
  }
};

import LoginForm from "./_components/LoginForm"

export default function LoginPage() {
    return <LoginForm />
}

export const metadata = {
    title: "Login | LMS",
    description: "Sign in to access your courses and learning dashboard.",
    openGraph: {
        title: "Login | LMS",
        description: "Sign in to access your courses and learning dashboard.",
        url: "https://the-lms-one.vercel.app/login",
        siteName: "LMS",
        images: [
            {
                url: "/logo-rectangle.png",
                width: 1200,
                height: 630,
                alt: "LMS Login"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Login | LMS",
        description: "Sign in to access your courses and learning dashboard.",
        images: ["/logo-rectangle.png"]
    },
    alternates: {
        canonical: "https://the-lms-one.vercel.app/login"
    }
};

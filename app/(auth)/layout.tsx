import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/logo-square.png"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link href="/" className={buttonVariants({ variant: "link", className: "absolute left-4 top-4" })}>
                <ArrowLeft className="size-4" />
                Back
            </Link>
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center self-center font-medium text-primary"
                >
                    <Image src={Logo} alt="Logo" className="size-14" />
                    TheLMS
                </Link>
                {children}
                <div className="text-balance text-center text-xs text-muted-foreground mx-auto max-w-sm">
                    By clicking continue, you agree to our <span className="hover:text-primary hover:underline">Terms of Service</span> and <span className="hover:text-primary hover:underline">Privacy Policy</span>.
                </div>
            </div>
        </div>
    )
}
"use client"

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo-rectangle.png";
import { ModeToggle } from "@/components/ui/modeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

export function Navbar() {
    const { data: session, isPending } = authClient.useSession()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-[3px]">
            <div className="container flex min-h-16 items-center mx-auto px-4 sm:px-6 lg:px-8 space-x-6">
                <Link href="/">
                    <Image src={Logo} alt="logo" width={95} height={95} quality={100} />
                </Link>

                <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                    <div className="space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <ModeToggle />

                        {isPending ? null : session ? (
                            <UserDropdown email={session.user.email} name={session?.user.name && session?.user.name.length > 0 ? session?.user.name : session?.user.email.split("@")[0]} image={session?.user.image ?? `https://avatar.vercel.sh/${session?.user.email}`} />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={buttonVariants()}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
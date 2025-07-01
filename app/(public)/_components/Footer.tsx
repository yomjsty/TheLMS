import Logo from "@/public/logo-rectangle.png";
import Link from 'next/link'
import Image from 'next/image'

const links = [
    {
        title: 'Help',
        href: '/help',
    },
    {
        title: 'About',
        href: '/about',
    },
]

export default function Footer() {
    return (
        <footer className="bg-background border-b py-12">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between gap-12">
                    <div className="order-last flex items-center gap-3 md:order-first">
                        <Link
                            href="#"
                            aria-label="go home">
                            <Image src={Logo} alt="logo" width={95} height={95} quality={100} className="" />
                        </Link>
                        <span className="text-muted-foreground block text-center text-sm">© {new Date().getFullYear()} The LMS, All rights reserved</span>
                    </div>

                    <div className="order-first flex flex-wrap gap-x-6 gap-y-4 md:order-last">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span>{link.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
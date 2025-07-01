import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ContactPage() {
    return (
        <section className="py-6 sm:py-12 lg:py-24">
            <div className="mx-auto max-w-4xl px-4 lg:px-0">
                <h1 className="text-4xl font-semibold lg:text-5xl">Help us route your inquiry</h1>
                <p className="text-muted-foreground mt-4 text-lg">We&apos;ll help you find the right plan and pricing for your business.</p>
                <div className="mt-12 grid gap-12 lg:grid-cols-5">
                    <div className="grid grid-cols-2 lg:col-span-2 lg:block lg:space-y-12">
                        <div className="flex flex-col justify-between space-y-6">
                            <div>
                                <h2 className="mb-3 text-lg font-semibold">Collaborate</h2>
                                <Link
                                    href="mailto:hello@tailus.com"
                                    className="text-primary text-lg line-through">
                                    support@the-lms-one.vercel.app
                                </Link>
                            </div>
                        </div>
                    </div>

                    <form
                        action=""
                        className="@container lg:col-span-3">
                        <Card className="p-8 sm:p-12">
                            <h3 className="text-xl font-semibold">Let&apos;s get you to the right place</h3>

                            <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                                <div className="@md:grid-cols-2 grid gap-3 *:space-y-3">
                                    <div>
                                        <Label
                                            htmlFor="name"
                                            className="space-y-2">
                                            Full name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Work Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="msg">Message</Label>
                                    <Textarea
                                        id="msg"
                                        rows={3}
                                    />
                                </div>
                                <Button>Submit</Button>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </section>
    )
}
/* eslint-disable react/no-children-prop */
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { Loader2, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useTransition } from 'react'
import { toast } from "sonner"
import { useForm } from "@tanstack/react-form"
import { loginWithEmailSchema } from "@/lib/schema"

export default function LoginForm() {
    const [githubPending, startGithubTransition] = useTransition();
    const [emailPending, startEmailTransition] = useTransition();
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "",
        },
        validators: {
            onChange: loginWithEmailSchema
        },
        onSubmit: (values) => {
            startEmailTransition(async () => {
                await authClient.emailOtp.sendVerificationOtp({
                    email: values.value.email,
                    type: "sign-in",
                    fetchOptions: {
                        onSuccess: () => {
                            toast.success("Verification OTP sent to email")
                            router.push(`/verify-request?email=${values.value.email}`)
                        },
                        onError: (error) => {
                            toast.error(error.error.message || "Something went wrong")
                        }
                    }
                })
            })
        }
    })

    async function loginWithGithub() {
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged in with GitHub, you will be redirected")
                    },
                    onError: (error) => {
                        toast.error(error.error.message || "Something went wrong")
                    }
                }
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Login to your account
                </CardTitle>
                <CardDescription>
                    Welcome back! Login to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={loginWithGithub}
                        disabled={githubPending}
                    >
                        <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span>GitHub</span>
                        {githubPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="0.98em"
                            height="1em"
                            viewBox="0 0 256 262">
                            <path
                                fill="#4285f4"
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                            <path
                                fill="#34a853"
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                            <path
                                fill="#fbbc05"
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                            <path
                                fill="#eb4335"
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        <span>Google</span>
                    </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
                <form
                    className="grid gap-3"
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <form.Field
                        name="email"
                        children={(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    aria-invalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="email"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        )}
                    />

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={emailPending || !canSubmit || isSubmitting}
                            >
                                <Mail className="h-4 w-4" />
                                Continue with email
                                {emailPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            </Button>

                        )} />
                </form>
            </CardContent>
        </Card >
    )
}

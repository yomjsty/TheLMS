"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequestRoute() {
    return (
        <Suspense>
            <VerifyRequestPage />
        </Suspense>
    )
}

function VerifyRequestPage() {
    const [otp, setOtp] = useState("")
    const [emailPending, startTransition] = useTransition()
    const params = useSearchParams();
    const email = params.get("email") as string;
    const router = useRouter();
    const isOtpCompleted = otp.length === 6;

    function verifyOTP() {
        startTransition(async () => {
            await authClient.signIn.emailOtp({
                email,
                otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Email verified successfully")
                        router.push("/dashboard")
                    },
                    onError: (error) => {
                        toast.error(error.error.message || "Something went wrong")
                    }
                }
            })
        })
    }

    return (
        <Card className="w-full mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Please check your email</CardTitle>
                <CardDescription>
                    We have sent a verification code to your email.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        maxLength={6}
                        className="gap-2" >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code sent to your email
                    </p>
                </div>
                <Button className="w-full" onClick={verifyOTP} disabled={emailPending || !isOtpCompleted}>
                    Verify Account
                    {emailPending && <Loader2 className="h-4 w-4 animate-spin" />}
                </Button>
            </CardContent>
        </Card>
    )
}

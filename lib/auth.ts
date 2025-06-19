import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { admin, emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                await resend.emails.send({
                    from: 'TheLMS <do-not-reply@email.captomatic.pro>',
                    to: [email],
                    subject: 'TheLMS - Verify your email with OTP',
                    html: `<p className="text-center text-2xl font-bold">Your OTP : <strong>${otp}</strong></p>`
                });
            },
        }),
        admin()
    ]
});
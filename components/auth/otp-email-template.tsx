import * as React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Button,
    Hr,
    Tailwind,
} from '@react-email/components';

export function OTPLoginEmail({ otpCode, userName }: { otpCode: string; userName: string }) {

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                                The LMS
                            </Heading>
                            <Text className="text-[16px] text-gray-600 m-0">
                                Learning Management System
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Heading className="text-[24px] font-bold text-gray-900 mb-[16px]">
                                Your Login Code
                            </Heading>

                            <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                                Hello {userName},
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                                You requested to sign in to your The LMS account. Use the verification code below to complete your login:
                            </Text>

                            {/* OTP Code Display */}
                            <Section className="text-center mb-[32px]">
                                <div className="bg-gray-50 border-[2px] border-solid border-gray-200 rounded-[12px] p-[24px] inline-block">
                                    <Text className="text-[36px] font-bold text-gray-900 m-0 letter-spacing-[8px] font-mono">
                                        {otpCode}
                                    </Text>
                                </div>
                            </Section>

                            <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                                This code will expire in <strong>10 minutes</strong> for your security.
                            </Text>

                            <Text className="text-[14px] text-gray-600 mb-[32px] leading-[20px]">
                                If you didn&apos;t request this code, please ignore this email or contact our support team if you have concerns about your account security.
                            </Text>
                        </Section>

                        {/* Security Notice */}
                        <Section className="bg-blue-50 border-l-[4px] border-solid border-blue-400 p-[16px] mb-[32px]">
                            <Text className="text-[14px] text-blue-800 m-0 leading-[20px]">
                                <strong>Security tip:</strong> Never share this code with anyone. The LMS team will never ask for your verification code.
                            </Text>
                        </Section>

                        <Hr className="border-gray-200 my-[32px]" />

                        {/* Footer */}
                        <Section className="text-center">
                            <Text className="text-[14px] text-gray-600 mb-[16px]">
                                Need help? Contact our support team
                            </Text>

                            <Button
                                href="mailto:support@thelms.com"
                                className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-medium no-underline box-border"
                            >
                                Contact Support
                            </Button>

                            <Text className="text-[12px] text-gray-500 mt-[24px] m-0">
                                The LMS Platform<br />
                            </Text>

                            <Text className="text-[12px] text-gray-500 mt-[16px] m-0">
                                © 2024 The LMS. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
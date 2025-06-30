import "server-only"

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireAdmin = cache(async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return redirect("/")
    }

    if (session.user.role !== "admin") {
        return redirect("/not-admin")
    }

    return session;
})
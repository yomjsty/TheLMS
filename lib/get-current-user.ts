import "server-only"

import { auth } from "./auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        throw new Error("No session found")
    }

    const user = session.user;

    if (!user) {
        throw new Error("No user found")
    }

    return user;
});

"use server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setRole(formData) {
    const { sessionClaims } = await auth();

    // Check that the user trying to set the role is an admin
    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Not Authorized");
    }

    const client = await clerkClient();
    const id = formData.get("id");
    const role = formData.get("role");

    try {
        await client.users.updateUser(id, {
            publicMetadata: { role },
        });
        revalidatePath("/admin");
    } catch {
        throw new Error("Failed to set role");
    }
}

export async function removeRole(formData) {
    const { sessionClaims } = await auth();

    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Not Authorized");
    }

    const client = await clerkClient();
    const id = formData.get("id");

    try {
        await client.users.updateUser(id, {
            publicMetadata: { role: null },
        });
        revalidatePath("/admin");
    } catch {
        throw new Error("Failed to remove role");
    }
}
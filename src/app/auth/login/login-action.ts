"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export async function login(username: string, password: string) {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirst();

  if (!user) {
    throw new Error("Invalid username or password");
  }

  if (password !== user.password) {
    throw new Error("Invalid username or password");
  }

  (await cookies()).set("session-user-id", `${user.id}`);
  redirect("/");
}
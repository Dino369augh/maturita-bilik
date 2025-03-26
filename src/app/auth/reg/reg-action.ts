"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export async function register(username: string, password: string) {
  console.log(`Registering user: ${username}`);

  try {
    const existingUser = await db
      .selectFrom("users")
      .select("id")
      .where("username", "=", username)
      .executeTakeFirst();

    if (existingUser) {
      throw new Error("Username already exists.");
    }


    
    const insertResult = await db
      .insertInto("users")
      .values({
        username,
        password: password,
        score: 0,
      })
      .execute();

    console.log("Database insert result:", insertResult);


    const user = await db
      .selectFrom("users")
      .select("id")
      .where("username", "=", username)
      .executeTakeFirstOrThrow();

  


    const cookieStore = await cookies();
    cookieStore.set("session-user-id", `${user.id}`, {
    });

    console.log("Registration successful. Redirecting to home page...");
    redirect("/"); 
  } catch (error) {

    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      console.log("Redirecting to home page...");
      throw error;
    }

   
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again.");
  }
}
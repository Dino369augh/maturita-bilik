"use server";

import db from "@/lib/db"; 

export async function updateScore(username: string, pointsToAdd: number) {
  try {
    const user = await db
      .selectFrom("users")
      .select(["id", "score"]) 
      .where("username", "=", username)
      .executeTakeFirst();

    if (!user) {
      return { success: false, error: "User not found." };
    }

    const newScore = (user.score || 0) + pointsToAdd;

    await db
      .updateTable("users")
      .set({ score: newScore })
      .where("username", "=", username)
      .execute();

    return { success: true, newScore };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}
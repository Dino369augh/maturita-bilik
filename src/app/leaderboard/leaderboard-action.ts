// app/actions/getLeaderboard.ts
"use server";

import db from "@/lib/db";

export async function getLeaderboard() {
  try {
    const topUsers = await db
      .selectFrom("users")
      .select(["username", "score"])
      .orderBy("score", "desc")
      .limit(3)
      .execute();

    return { success: true, topUsers };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { success: false, error: "Failed to fetch leaderboard" };
  }
}
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {

    const userIdNumber = parseInt(userId, 10);


    if (isNaN(userIdNumber)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

   
    const user = await db
      .selectFrom("users")
      .select("username")
      .where("id", "=", userIdNumber) 
      .executeTakeFirst();

    if (user) {
      return NextResponse.json({ username: user.username });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
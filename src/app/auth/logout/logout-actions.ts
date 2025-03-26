"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const cookiesStore = await cookies(); 


  cookiesStore.delete("session-user-id"); 
  redirect("/");
}
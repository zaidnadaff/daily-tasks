// lib/migration.ts
"use server";

import { sql } from "./db";

export async function setupDatabase() {
  try {
    // Create the Task table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS "Task" (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        "isDefault" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `;
    return { success: true };
  } catch (error) {
    console.error("Database setup error:", error);
    throw new Error("Failed to setup database");
  }
}

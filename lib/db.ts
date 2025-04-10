import { neon } from "@neondatabase/serverless"

// Create a SQL client with the Neon connection string
export const sql = neon(process.env.DATABASE_URL!)

// Helper function to format dates from the database
export function formatDate(date: Date | string): Date {
  return date instanceof Date ? date : new Date(date)
}

// lib/actions.ts
"use server";

import { sql, formatDate } from "./db";
import { revalidatePath } from "next/cache";
import type { Task } from "./types";
import { v4 as uuidv4 } from "uuid";

export async function getTasks(): Promise<Task[]> {
  try {
    const tasks = await sql`
      SELECT id, title, completed, "isDefault", "createdAt"
      FROM "Task"
      ORDER BY "createdAt" DESC
    `;
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      isDefault: task.isDefault,
      createdAt: formatDate(task.createdAt),
    }));
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function createTask(
  title: string,
  isDefault: boolean
): Promise<Task> {
  try {
    const id = uuidv4();
    const now = new Date();
    const [task] = await sql`
      INSERT INTO "Task" (id, title, "isDefault", completed, "createdAt", "updatedAt")
      VALUES (${id}, ${title}, ${isDefault}, false, ${now}, ${now})
      RETURNING id, title, completed, "isDefault", "createdAt"
    `;
    revalidatePath("/");
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      isDefault: task.isDefault,
      createdAt: formatDate(task.createdAt),
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create task");
  }
}

export async function updateTask(
  id: string,
  data: { completed?: boolean; title?: string }
): Promise<Task> {
  try {
    const now = new Date();

    // Create the appropriate update query based on provided data
    if (data.completed !== undefined && data.title !== undefined) {
      const [task] = await sql`
        UPDATE "Task"
        SET completed = ${data.completed}, title = ${data.title}, "updatedAt" = ${now}
        WHERE id = ${id}
        RETURNING id, title, completed, "isDefault", "createdAt"
      `;
      revalidatePath("/");
      return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        isDefault: task.isDefault,
        createdAt: formatDate(task.createdAt),
      };
    } else if (data.completed !== undefined) {
      const [task] = await sql`
        UPDATE "Task"
        SET completed = ${data.completed}, "updatedAt" = ${now}
        WHERE id = ${id}
        RETURNING id, title, completed, "isDefault", "createdAt"
      `;
      revalidatePath("/");
      return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        isDefault: task.isDefault,
        createdAt: formatDate(task.createdAt),
      };
    } else if (data.title !== undefined) {
      const [task] = await sql`
        UPDATE "Task"
        SET title = ${data.title}, "updatedAt" = ${now}
        WHERE id = ${id}
        RETURNING id, title, completed, "isDefault", "createdAt"
      `;
      revalidatePath("/");
      return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        isDefault: task.isDefault,
        createdAt: formatDate(task.createdAt),
      };
    } else {
      // Only update the updatedAt field if no other fields are provided
      const [task] = await sql`
        UPDATE "Task"
        SET "updatedAt" = ${now}
        WHERE id = ${id}
        RETURNING id, title, completed, "isDefault", "createdAt"
      `;
      revalidatePath("/");
      return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        isDefault: task.isDefault,
        createdAt: formatDate(task.createdAt),
      };
    }
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update task");
  }
}

export async function deleteTask(id: string): Promise<{ success: boolean }> {
  try {
    await sql`
      DELETE FROM "Task"
      WHERE id = ${id}
    `;
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to delete task");
  }
}

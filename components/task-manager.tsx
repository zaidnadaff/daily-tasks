"use client";

import { setupDatabase } from "@/lib/migration";
import { useEffect, useState } from "react";
import type { Task } from "@/lib/types";
import TaskList from "./task-list";
import AddTaskForm from "./add-task-form";
import { ThemeToggle } from "./theme-toggle";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/actions";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runMigration = async () => {
      try {
        await setupDatabase();
        console.log("Database setup complete or already exists");

        // Wait a brief moment before fetching tasks
        setTimeout(async () => {
          try {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
          } catch (error) {
            console.error("Failed to fetch tasks:", error);
          } finally {
            setIsLoading(false);
          }
        }, 500);
      } catch (error) {
        console.error("Migration error:", error);
        setIsLoading(false);
      }
    };

    runMigration();
  }, []);

  // Remove the second useEffect since we're handling fetching in the first one

  const handleAddTask = async (title: string, isDefault: boolean) => {
    try {
      const newTask = await createTask(title, isDefault);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <ThemeToggle />
      </div>
      <AddTaskForm onAddTask={handleAddTask} />
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}

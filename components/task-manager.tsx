// "use client";

// import { setupDatabase } from "@/lib/migration";
// import { useEffect, useState } from "react";
// import type { Task } from "@/lib/types";
// import TaskList from "./task-list";
// import AddTaskForm from "./add-task-form";
// import { ThemeToggle } from "./theme-toggle";
// import { getTasks, createTask, updateTask, deleteTask } from "@/lib/actions";

// export default function TaskManager() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const runMigration = async () => {
//       try {
//         await setupDatabase();
//         console.log("Database setup complete or already exists");

//         // Wait a brief moment before fetching tasks
//         setTimeout(async () => {
//           try {
//             const fetchedTasks = await getTasks();
//             setTasks(fetchedTasks);
//           } catch (error) {
//             console.error("Failed to fetch tasks:", error);
//           } finally {
//             setIsLoading(false);
//           }
//         }, 500);
//       } catch (error) {
//         console.error("Migration error:", error);
//         setIsLoading(false);
//       }
//     };

//     runMigration();
//   }, []);

//   // Remove the second useEffect since we're handling fetching in the first one

//   const handleAddTask = async (title: string, isDefault: boolean) => {
//     try {
//       const newTask = await createTask(title, isDefault);
//       setTasks((prev) => [...prev, newTask]);
//     } catch (error) {
//       console.error("Failed to add task:", error);
//     }
//   };

//   const handleToggleComplete = async (id: string, completed: boolean) => {
//     try {
//       const updatedTask = await updateTask(id, { completed });
//       setTasks((prev) =>
//         prev.map((task) => (task.id === id ? { ...task, completed } : task))
//       );
//     } catch (error) {
//       console.error("Failed to update task:", error);
//     }
//   };

//   const handleDeleteTask = async (id: string) => {
//     try {
//       await deleteTask(id);
//       setTasks((prev) => prev.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Task Manager</h1>
//         <ThemeToggle />
//       </div>
//       <AddTaskForm onAddTask={handleAddTask} />
//       {isLoading ? (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : (
//         <TaskList
//           tasks={tasks}
//           onToggleComplete={handleToggleComplete}
//           onDeleteTask={handleDeleteTask}
//         />
//       )}
//     </div>
//   );
// }
// components/task-manager.tsx (modified)
"use client";

import { setupDatabase } from "@/lib/migration";
import { useEffect, useState } from "react";
import type { Task } from "@/lib/types";
import TaskList from "./task-list";
import AddTaskForm from "./add-task-form";
import { ThemeToggle } from "./theme-toggle";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/actions";
import { CheckCircle2 } from "lucide-react";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Same useEffect and handlers as before...
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

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Task Manager</h1>
            <p className="text-white/80 mt-1">Organize your day efficiently</p>
          </div>
          <ThemeToggle />
        </div>

        {totalCount > 0 && (
          <div className="mt-4 bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="font-bold text-xl">
                  {completionPercentage}%
                </span>{" "}
                complete
              </div>
              <div className="text-white text-sm">
                {completedCount}/{totalCount} tasks done
              </div>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full mt-2">
              <div
                className="h-2 bg-white rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md border border-border/40">
        <AddTaskForm onAddTask={handleAddTask} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-card p-6 rounded-lg shadow-md border border-border/40">
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      )}

      {tasks.length > 0 && tasks.every((task) => task.completed) && (
        <div className="flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <CheckCircle2 className="text-green-500 mr-2" />
          <p className="text-green-700 dark:text-green-300 font-medium">
            All tasks completed! Great job!
          </p>
        </div>
      )}
    </div>
  );
}

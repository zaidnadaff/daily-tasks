// "use client"

// import { Trash2 } from "lucide-react"
// import type { Task } from "@/lib/types"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"

// interface TaskItemProps {
//   task: Task
//   onToggleComplete: (id: string, completed: boolean) => void
//   onDeleteTask: (id: string) => void
// }

// export default function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
//   return (
//     <li className="flex items-center justify-between p-3 border rounded-md bg-card">
//       <div className="flex items-center gap-3">
//         <Checkbox
//           id={`task-${task.id}`}
//           checked={task.completed}
//           onCheckedChange={(checked) => {
//             onToggleComplete(task.id, checked === true)
//           }}
//         />
//         <label htmlFor={`task-${task.id}`} className={`${task.completed ? "line-through text-muted-foreground" : ""}`}>
//           {task.title}
//         </label>
//         {task.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Daily</span>}
//       </div>
//       <Button variant="ghost" size="icon" onClick={() => onDeleteTask(task.id)} aria-label="Delete task">
//         <Trash2 className="h-4 w-4" />
//       </Button>
//     </li>
//   )
// }
// components/task-item.tsx (modified)
"use client";

import { Trash2, Star } from "lucide-react";
import type { Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // You'll need to install framer-motion

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
}: TaskItemProps) {
  return (
    <motion.li
      className={`flex items-center justify-between p-4 rounded-md transition-all duration-200 ${
        task.completed
          ? "bg-muted/50 border border-border/50"
          : "bg-card border border-border hover:border-primary/30 hover:shadow-md"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={(checked) => {
              onToggleComplete(task.id, checked === true);
            }}
            className={`${
              task.completed ? "bg-green-500 border-green-500" : ""
            } transition-all duration-300`}
          />
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 text-green-500"
            >
              ✓
            </motion.div>
          )}
        </div>
        <label
          htmlFor={`task-${task.id}`}
          className={`${
            task.completed ? "line-through text-muted-foreground" : ""
          } transition-all duration-300 cursor-pointer`}
        >
          {task.title}
        </label>
        {task.isDefault && (
          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Daily
          </span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(task.id)}
        aria-label="Delete task"
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.li>
  );
}

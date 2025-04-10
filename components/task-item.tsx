"use client"

import { Trash2 } from "lucide-react"
import type { Task } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: string, completed: boolean) => void
  onDeleteTask: (id: string) => void
}

export default function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between p-3 border rounded-md bg-card">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={(checked) => {
            onToggleComplete(task.id, checked === true)
          }}
        />
        <label htmlFor={`task-${task.id}`} className={`${task.completed ? "line-through text-muted-foreground" : ""}`}>
          {task.title}
        </label>
        {task.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Daily</span>}
      </div>
      <Button variant="ghost" size="icon" onClick={() => onDeleteTask(task.id)} aria-label="Delete task">
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  )
}

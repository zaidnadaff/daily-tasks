import type { Task } from "@/lib/types"
import TaskItem from "./task-item"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string, completed: boolean) => void
  onDeleteTask: (id: string) => void
}

export default function TaskList({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {
  // Group tasks by default and non-default
  const defaultTasks = tasks.filter((task) => task.isDefault)
  const regularTasks = tasks.filter((task) => !task.isDefault)

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg border-dashed">
        <p className="text-muted-foreground">No tasks yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {defaultTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-2">Daily Tasks</h2>
          <ul className="space-y-2">
            {defaultTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />
            ))}
          </ul>
        </div>
      )}

      {regularTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-2">One-time Tasks</h2>
          <ul className="space-y-2">
            {regularTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

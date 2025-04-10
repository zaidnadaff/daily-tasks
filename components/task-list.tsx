// import type { Task } from "@/lib/types"
// import TaskItem from "./task-item"

// interface TaskListProps {
//   tasks: Task[]
//   onToggleComplete: (id: string, completed: boolean) => void
//   onDeleteTask: (id: string) => void
// }

// export default function TaskList({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {
//   // Group tasks by default and non-default
//   const defaultTasks = tasks.filter((task) => task.isDefault)
//   const regularTasks = tasks.filter((task) => !task.isDefault)

//   if (tasks.length === 0) {
//     return (
//       <div className="text-center py-8 border rounded-lg border-dashed">
//         <p className="text-muted-foreground">No tasks yet. Add one above!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {defaultTasks.length > 0 && (
//         <div>
//           <h2 className="text-lg font-medium mb-2">Daily Tasks</h2>
//           <ul className="space-y-2">
//             {defaultTasks.map((task) => (
//               <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />
//             ))}
//           </ul>
//         </div>
//       )}

//       {regularTasks.length > 0 && (
//         <div>
//           <h2 className="text-lg font-medium mb-2">One-time Tasks</h2>
//           <ul className="space-y-2">
//             {regularTasks.map((task) => (
//               <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }
// components/task-list.tsx (modified)
import type { Task } from "@/lib/types";
import TaskItem from "./task-item";
import { AnimatePresence } from "framer-motion"; // You'll need to install framer-motion
import { CalendarDays, CheckSquare } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  // Group tasks by default and non-default
  const defaultTasks = tasks.filter((task) => task.isDefault);
  const regularTasks = tasks.filter((task) => !task.isDefault);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg border-dashed flex flex-col items-center">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <CheckSquare className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground mb-2">
          No tasks yet. Add one above!
        </p>
        <p className="text-xs text-muted-foreground">
          Your tasks will appear here once created
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {defaultTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            Daily Tasks
          </h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {defaultTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}

      {regularTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <CheckSquare className="h-5 w-5 mr-2 text-primary" />
            One-time Tasks
          </h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {regularTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </div>
  );
}

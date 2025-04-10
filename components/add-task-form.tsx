// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { PlusCircle } from "lucide-react"

// interface AddTaskFormProps {
//   onAddTask: (title: string, isDefault: boolean) => void
// }

// export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
//   const [title, setTitle] = useState("")
//   const [isDefault, setIsDefault] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (title.trim()) {
//       onAddTask(title.trim(), isDefault)
//       setTitle("")
//       // Keep isDefault as is for convenience when adding multiple default tasks
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="flex flex-col gap-4 sm:flex-row">
//         <Input
//           type="text"
//           placeholder="Add a new task..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="flex-1"
//         />
//         <Button type="submit" disabled={!title.trim()} className="gap-2">
//           <PlusCircle className="h-4 w-4" />
//           Add Task
//         </Button>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Checkbox id="is-default" checked={isDefault} onCheckedChange={(checked) => setIsDefault(checked === true)} />
//         <Label htmlFor="is-default">Make this a daily task (appears every day)</Label>
//       </div>
//     </form>
//   )
// }
// components/add-task-form.tsx (modified)
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlusCircle, Star } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (title: string, isDefault: boolean) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), isDefault);
      setTitle("");
      // Keep isDefault as is for convenience when adding multiple default tasks
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm pr-12 focus-visible:ring-2 focus-visible:ring-primary/50"
          />
          {isDefault && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
              <Star className="h-4 w-4" />
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={!title.trim()}
          className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      <div className="flex items-center space-x-2 pl-1">
        <Checkbox
          id="is-default"
          checked={isDefault}
          onCheckedChange={(checked) => setIsDefault(checked === true)}
          className="text-primary"
        />
        <Label
          htmlFor="is-default"
          className="flex items-center cursor-pointer"
        >
          <span>Make this a daily task</span>
          <span className="ml-1 text-xs text-primary">(appears every day)</span>
        </Label>
      </div>
    </form>
  );
}

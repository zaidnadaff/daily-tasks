"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"

interface AddTaskFormProps {
  onAddTask: (title: string, isDefault: boolean) => void
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [isDefault, setIsDefault] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim(), isDefault)
      setTitle("")
      // Keep isDefault as is for convenience when adding multiple default tasks
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={!title.trim()} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="is-default" checked={isDefault} onCheckedChange={(checked) => setIsDefault(checked === true)} />
        <Label htmlFor="is-default">Make this a daily task (appears every day)</Label>
      </div>
    </form>
  )
}

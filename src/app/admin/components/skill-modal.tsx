"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Skill } from "./skill-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface SkillModalProps {
  skill: Skill | null
  mode: "add" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (skill: Skill) => void
  categories: string[]
}

export function SkillModal({ skill, mode, open, onOpenChange, onSave, categories }: SkillModalProps) {
  const [formData, setFormData] = useState<Skill>({
    id: "",
    name: "",
    category: "",
    usageCount: 0,
    tags: [],
  })
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    if (skill) {
      setFormData(skill)
    } else {
      setFormData({
        id: "",
        name: "",
        category: "",
        usageCount: 0,
        tags: [],
      })
    }
  }, [skill])

  const handleSave = () => {
    onSave(formData)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Skill" : "Edit Skill"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Add a new skill to the database." : "Make changes to the skill information."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3"
              placeholder="Enter skill name"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="usageCount" className="text-right">
              Usage Count
            </Label>
            <Input
              id="usageCount"
              type="number"
              value={formData.usageCount}
              onChange={(e) => setFormData({ ...formData, usageCount: Number.parseInt(e.target.value) || 0 })}
              className="col-span-3"
              min="0"
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="tags" className="text-right pt-2">
              Tags
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag"
                  className="flex-1"
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.tags.map((tag) => (
                  <Badge key={tag}  className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                  
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button  onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{mode === "add" ? "Add Skill" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

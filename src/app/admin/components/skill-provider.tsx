"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SkillModal } from "./skill-modal"
import { MoreHorizontal, ArrowUpDown, Plus, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Skill {
  id: string
  name: string
  category: string
  usageCount: number
  tags: string[]
}

const dummySkills: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "Frontend",
    usageCount: 150,
    tags: ["javascript", "ui", "framework"],
  },
  {
    id: "2",
    name: "Node.js",
    category: "Backend",
    usageCount: 120,
    tags: ["javascript", "server", "runtime"],
  },
  {
    id: "3",
    name: "Python",
    category: "Programming Language",
    usageCount: 200,
    tags: ["programming", "data-science", "backend"],
  },
  {
    id: "4",
    name: "AWS",
    category: "Cloud",
    usageCount: 80,
    tags: ["cloud", "infrastructure", "devops"],
  },
  {
    id: "5",
    name: "TypeScript",
    category: "Programming Language",
    usageCount: 95,
    tags: ["javascript", "types", "programming"],
  },
]

const categories = ["Frontend", "Backend", "Programming Language", "Cloud", "Database", "DevOps"]

export function SkillProvider() {
  const [skills, setSkills] = useState<Skill[]>(dummySkills)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [categoryFilter, setCategoryFilter] = useState<string>("all") // Updated default value
  const [tagFilter, setTagFilter] = useState<string>("")

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = categoryFilter === "all" || skill.category === categoryFilter
    const matchesTag = !tagFilter || skill.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
    return matchesCategory && matchesTag
  })

  const handleAddSkill = () => {
    setSelectedSkill(null)
    setModalMode("add")
    setModalOpen(true)
  }

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill)
    setModalMode("edit")
    setModalOpen(true)
  }

  const handleDeleteSkill = (skillId: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillId))
  }

  const handleSaveSkill = (skill: Skill) => {
    if (modalMode === "add") {
      setSkills([...skills, { ...skill, id: Date.now().toString() }])
    } else {
      setSkills(skills.map((s) => (s.id === skill.id ? skill : s)))
    }
    setModalOpen(false)
  }

  const columns: ColumnDef<Skill>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
      
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Skill Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
      
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "usageCount",
      header: ({ column }) => (
        <Button
      
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/80"
        >
          Usage Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag}  className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge  className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const skill = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  className="h-8 w-12 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEditSkill(skill)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Skill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteSkill(skill.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Skill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skill Provider</CardTitle>
              <CardDescription>Manage the skill database with CRUD operations and filtering.</CardDescription>
            </div>
            <Button onClick={handleAddSkill}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="category-filter">Filter by Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem> {/* Updated value prop */}
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="tag-filter">Filter by Tag</Label>
              <Input
                id="tag-filter"
                placeholder="Search tags..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              />
            </div>
          </div>

          <DataTable columns={columns} data={filteredSkills} searchKey="name" searchPlaceholder="Search skills..." />
        </CardContent>
      </Card>

      <SkillModal
        skill={selectedSkill}
        mode={modalMode}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSaveSkill}
        categories={categories}
      />
    </div>
  )
}

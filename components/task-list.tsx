"use client";

import { useTodo } from "./todo-context";
import { TaskItem } from "./task-item";
import { useState, useEffect } from "react";
import { Priority, Task } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterType = "all" | "active" | "completed";
type SortType = "newest" | "oldest" | "priority" | "alphabetical";

export function TaskList() {
  const { tasks } = useTodo();
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const priorityValue = {
    high: 3,
    medium: 2,
    low: 1,
  };

  useEffect(() => {
    let result = [...tasks];

    // Apply filter
    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          (task.description || "").toLowerCase().includes(searchLower) ||
          task.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sort
    if (sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === "oldest") {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sort === "priority") {
      result.sort((a, b) => priorityValue[b.priority as Priority] - priorityValue[a.priority as Priority]);
    } else if (sort === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredTasks(result);
  }, [tasks, filter, sort, search]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sort} onValueChange={(value) => setSort(value as SortType)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as FilterType)}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            {search ? "No tasks match your search" : "No tasks found"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { createContext, useContext, ReactNode, useCallback } from "react";
import { Task, Priority } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";

type TodoContextType = {
  tasks: Task[];
  addTask: (title: string, description?: string, priority?: Priority, tags?: string[]) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  togglePin: (id: string) => void;
  toggleArchive: (id: string) => void;
  clearCompleted: () => void;
  reorderTasks: (tasks: Task[]) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    archived: number;
  };
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todos", []);

  const addTask = useCallback((
    title: string,
    description: string = "",
    priority: Priority = "medium",
    tags: string[] = []
  ) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      priority,
      createdAt: now,
      updatedAt: now,
      tags,
      pinned: false,
      archived: false,
      order: tasks.length,
    };

    setTasks((prev) => [newTask, ...prev]);
  }, [tasks.length, setTasks]);

  const updateTask = useCallback((
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, [setTasks]);

  const togglePin = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, pinned: !task.pinned, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, [setTasks]);

  const toggleArchive = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, archived: !task.archived, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, [setTasks]);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, [setTasks]);

  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
  }, [setTasks]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    active: tasks.filter((task) => !task.completed && !task.archived).length,
    archived: tasks.filter((task) => task.archived).length,
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        togglePin,
        toggleArchive,
        clearCompleted,
        reorderTasks,
        stats,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
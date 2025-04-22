"use client";

import { AddTask } from "@/components/add-task";
import { MainHeader } from "@/components/main-header";
import { TaskList } from "@/components/task-list";
import { TaskStats } from "@/components/task-stats";
import { TodoProvider } from "@/components/todo-context";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Task } from "@/lib/types";
import { placeholderTasks } from "@/components/placeholder-tasks";
import { motion } from "framer-motion";

export default function Home() {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("todos", []);

  // Initialize with placeholder tasks if no tasks exist
  useEffect(() => {
    if (storedTasks.length === 0) {
      setStoredTasks(placeholderTasks as Task[]);
    }
  }, [storedTasks.length, setStoredTasks]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <TodoProvider>
      <div className="min-h-screen">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 py-8"
        >
          <MainHeader />
          
          <motion.div variants={item}>
            <TaskStats />
          </motion.div>

          <motion.div 
            variants={item}
            className="flex justify-between items-center mb-6"
          >
            <h2 className="text-xl font-semibold">My Tasks</h2>
            <AddTask />
          </motion.div>
          
          <motion.div variants={item}>
            <TaskList />
          </motion.div>
        </motion.div>
      </div>
    </TodoProvider>
  );
}
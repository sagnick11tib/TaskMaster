"use client";

import { CheckCircle } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "./ui/button";
import { useTodo } from "./todo-context";
import { motion } from "framer-motion";

export function MainHeader() {
  const { clearCompleted } = useTodo();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 border-b mb-8">
      <motion.div 
        className="flex items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">TaskMaster</h1>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-4"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearCompleted}
        >
          Clear Completed
        </Button>
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative h-9 w-9 rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ 
          opacity: theme === "dark" ? 0 : 1, 
          rotate: theme === "dark" ? -45 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ 
          opacity: theme === "dark" ? 1 : 0, 
          rotate: theme === "dark" ? 0 : 45 
        }}
        transition={{ duration: 0.2 }}
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </Button>
  );
}
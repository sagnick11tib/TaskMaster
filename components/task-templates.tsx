"use client";

import { Task } from "@/lib/types";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { BookTemplate as FileTemplate, Plus } from "lucide-react";
import { useTodo } from "./todo-context";

interface TaskTemplatesProps {
  templates: Task[];
  onUseTemplate: (template: Task) => void;
}

export function TaskTemplates({ templates, onUseTemplate }: TaskTemplatesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border rounded-lg p-4"
          >
            <h4 className="font-medium mb-2">{template.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {template.description}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onUseTemplate(template)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
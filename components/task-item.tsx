"use client";

import { Task } from "@/lib/types";
import { useTodo } from "./todo-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Edit, Clock, Pin, Archive, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RichTextEditor } from "./rich-text-editor";

const priorityColors = {
  low: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  medium: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function TaskItem({ task }: { task: Task }) {
  const { toggleComplete, deleteTask, updateTask, togglePin, toggleArchive } = useTodo();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.2 }}
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...attributes}
      {...listeners}
    >
      <Card 
        className={cn(
          "p-4 mb-3 transition-all duration-200 border-l-4",
          task.completed ? "border-l-green-500 opacity-80" : `border-l-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'blue'}-500`,
          task.pinned && "bg-muted/50"
        )}
      >
        <div className="flex items-start gap-3">
          <motion.div
            whileTap={{ scale: 0.9 }}
          >
            <Checkbox 
              checked={task.completed} 
              onCheckedChange={() => toggleComplete(task.id)}
              className="mt-1"
            />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <h3 
                  className={cn(
                    "text-base font-medium transition-all duration-200",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </h3>
                {task.pinned && (
                  <Pin className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <Badge className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            
            <AnimatePresence>
              {(isExpanded || isEditing) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  {isEditing ? (
                    <RichTextEditor
                      content={task.richDescription || task.description || ""}
                      onChange={(content) => updateTask(task.id, { richDescription: content })}
                    />
                  ) : (
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: task.richDescription || task.description || "" }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center mt-3 text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{format(new Date(task.updatedAt), "MMM d, h:mm a")}</span>
            </div>
          </div>
          
          <motion.div 
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="icon"
              className="h-7 w-7"
              onClick={() => togglePin(task.id)}
            >
              <Pin className={cn("h-3.5 w-3.5", task.pinned && "fill-current")} />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                setIsEditing(!isEditing);
                setIsExpanded(true);
              }}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-7 w-7"
              onClick={() => toggleArchive(task.id)}
            >
              <Archive className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="destructive" 
              size="icon"
              className="h-7 w-7"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isExpanded && "transform rotate-180"
            )}
          />
        </Button>
      </Card>
    </motion.div>
  );
}
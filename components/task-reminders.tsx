"use client";

import { useState, useEffect } from "react";
import { Task } from "@/lib/types";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskRemindersProps {
  task: Task;
  onSetReminder: (taskId: string, reminder: string) => void;
}

export function TaskReminders({ task, onSetReminder }: TaskRemindersProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");

  useEffect(() => {
    if (task.reminder) {
      const reminderDate = new Date(task.reminder);
      setDate(reminderDate);
      setTime(format(reminderDate, "HH:mm"));
    }
  }, [task.reminder]);

  const handleSetReminder = () => {
    if (!date) return;

    const [hours, minutes] = time.split(":");
    const reminder = new Date(date);
    reminder.setHours(parseInt(hours, 10));
    reminder.setMinutes(parseInt(minutes, 10));

    onSetReminder(task.id, reminder.toISOString());
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "gap-2",
              task.reminder && "text-blue-600 dark:text-blue-400"
            )}
          >
            <Bell className="h-4 w-4" />
            {task.reminder ? format(new Date(task.reminder), "MMM d, h:mm a") : "Set Reminder"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="flex gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Button onClick={handleSetReminder} disabled={!date}>
                Set
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
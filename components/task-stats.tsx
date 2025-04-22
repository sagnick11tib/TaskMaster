"use client";

import { useTodo } from "./todo-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { BarChart, Link as Line, Circle, CheckCircle2 } from "lucide-react";

export function TaskStats() {
  const { stats, tasks } = useTodo();
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const priorityCounts = tasks.reduce(
    (acc, task) => {
      if (!task.completed) {
        acc[task.priority]++;
      }
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
            Total Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={stats.total}
          >
            {stats.total}
          </motion.div>
          <p className="text-xs text-muted-foreground">
            Across all categories
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
            Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={stats.active}
          >
            {stats.active}
          </motion.div>
          <p className="text-xs text-muted-foreground">
            Pending completion
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
            Completed Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={stats.completed}
          >
            {stats.completed}
          </motion.div>
          <p className="text-xs text-muted-foreground">
            Successfully finished
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Line className="mr-2 h-4 w-4 text-muted-foreground" />
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={completionPercentage}
          >
            {completionPercentage}%
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          >
            <Progress value={completionPercentage} className="h-2" />
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
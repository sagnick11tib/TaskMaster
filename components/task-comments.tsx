"use client";

import { useState } from "react";
import { Comment } from "@/lib/types";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface TaskCommentsProps {
  comments: Comment[];
  taskId: string;
  onAddComment: (comment: Comment) => void;
}

export function TaskComments({ comments, taskId, onAddComment }: TaskCommentsProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: uuidv4(),
      taskId,
      content: newComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAddComment(comment);
    setNewComment("");
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <h4 className="text-sm font-medium">Comments</h4>
      </div>

      <div className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[80px]"
        />
        <Button 
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          size="sm"
        >
          Add Comment
        </Button>
      </div>

      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-muted p-3 rounded-md"
          >
            <p className="text-sm">{comment.content}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {format(new Date(comment.createdAt), "MMM d, h:mm a")}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
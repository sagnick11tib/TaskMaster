"use client";

import { useState } from "react";
import { Folder } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { motion } from "framer-motion";
import { Folder as FolderIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFoldersProps {
  folders: Folder[];
  selectedFolder?: string;
  onSelectFolder: (folderId?: string) => void;
  onAddFolder: (folder: Folder) => void;
}

const folderColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

export function TaskFolders({ folders, selectedFolder, onSelectFolder, onAddFolder }: TaskFoldersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState(folderColors[0]);

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: newFolderName,
      color: selectedColor,
    };

    onAddFolder(newFolder);
    setNewFolderName("");
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Folders</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-2">
                  {folderColors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full",
                        color,
                        selectedColor === color && "ring-2 ring-offset-2 ring-primary"
                      )}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={handleAddFolder} disabled={!newFolderName.trim()}>
                Create Folder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectFolder(undefined)}
          className={cn(
            "w-full flex items-center gap-2 p-2 rounded-md transition-colors",
            !selectedFolder && "bg-muted"
          )}
        >
          <FolderIcon className="h-4 w-4" />
          <span>All Tasks</span>
        </motion.button>

        {folders.map((folder) => (
          <motion.button
            key={folder.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectFolder(folder.id)}
            className={cn(
              "w-full flex items-center gap-2 p-2 rounded-md transition-colors",
              selectedFolder === folder.id && "bg-muted"
            )}
          >
            <div className={cn("w-4 h-4 rounded-full", folder.color)} />
            <span>{folder.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
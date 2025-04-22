export type Priority = "low" | "medium" | "high";

export type Comment = {
  id: string;
  taskId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Folder = {
  id: string;
  name: string;
  color: string;
  icon?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  pinned: boolean;
  archived: boolean;
  richDescription?: string;
  order: number;
  folderId?: string;
  reminder?: string;
  template?: boolean;
  comments?: Comment[];
};
export const placeholderTasks = [
  {
    id: "1",
    title: "Finish project proposal",
    description: "Complete and review the final draft before submission",
    completed: false,
    priority: "high",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    tags: ["work", "proposal"]
  },
  {
    id: "2",
    title: "Schedule team meeting",
    description: "Coordinate with all team members for the weekly sync",
    completed: true,
    priority: "medium",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    tags: ["team", "meeting"]
  },
  {
    id: "3",
    title: "Read new book chapter",
    description: "Chapter 5 of 'Atomic Habits'",
    completed: false,
    priority: "low",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    tags: ["personal", "reading"]
  },
  {
    id: "4",
    title: "Prepare presentation slides",
    description: "Create slides for the client meeting on Monday",
    completed: false,
    priority: "high",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    tags: ["work", "presentation"]
  },
  {
    id: "5",
    title: "Grocery shopping",
    description: "Buy ingredients for the week's meals",
    completed: false,
    priority: "medium",
    createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    tags: ["personal", "shopping"]
  }
];
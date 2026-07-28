import { useState, useEffect } from "react";

const STORAGE_KEY = "taskflow_tasks";

const defaultTasks = [
  {
    id: "default-1",
    title: "Lire la documentation React Hooks",
    category: "Études",
    priority: "Haute",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-2",
    title: "Préparer la réunion de groupe",
    category: "Travail",
    priority: "Haute",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-3",
    title: "Faire les courses de la semaine",
    category: "Personnel",
    priority: "Moyenne",
    done: true,
    createdAt: new Date().toISOString(),
  },
];

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultTasks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultTasks;
  } catch {
    return defaultTasks;
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadFromStorage);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      category: data.category,
      priority: data.priority,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, data) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: data.title.trim(),
              category: data.category,
              priority: data.priority,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return { tasks, addTask, updateTask, deleteTask, toggleTask };
};
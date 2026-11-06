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

// Les exemples ne s'affichent qu'au tout premier lancement (rien en
// mémoire). Une liste vide enregistrée est un choix de l'utilisateur :
// elle doit rester vide après rechargement.
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return defaultTasks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultTasks;
  } catch {
    return defaultTasks;
  }
};

// crypto.randomUUID n'existe que dans un contexte sécurisé (https ou
// localhost) : ouverte via l'adresse IP du réseau local en http,
// l'application plantait à chaque ajout.
const newId = () =>
  typeof globalThis.crypto?.randomUUID === "function"
    ? globalThis.crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadFromStorage);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Navigation privée ou quota dépassé : l'application reste
      // utilisable, seule la sauvegarde est perdue.
    }
  }, [tasks]);

  const addTask = (data) => {
    const newTask = {
      id: newId(),
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
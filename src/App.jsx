import { useState, useMemo } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import Stats from "./components/Stats";

const App = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();

  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    search: "",
  });

  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Filtre par statut
      if (filters.status === "active" && task.done) return false;
      if (filters.status === "done" && !task.done) return false;

      // Filtre par catégorie
      if (filters.category !== "all" && task.category !== filters.category)
        return false;

      // Filtre par recherche
      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [tasks, filters]);

  const handleSubmit = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
    } else {
      addTask(data);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    // Scroll vers le formulaire sur mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Supprimer la tâche en cours de modification doit fermer le
  // formulaire : sinon « Enregistrer » visait une tâche disparue et la
  // saisie était perdue sans message.
  const handleDelete = (id) => {
    deleteTask(id);
    if (editingTask?.id === id) setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">⬡ TaskFlow</h1>
            <p className="text-indigo-200 text-sm mt-0.5">
              Gérez vos tâches avec clarté
            </p>
          </div>
          <span className="text-indigo-300 text-sm hidden md:block">
            L3 Génie Informatique
          </span>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
            <Stats tasks={tasks} />
            <TaskForm
              onSubmit={handleSubmit}
              editingTask={editingTask}
              onCancelEdit={handleCancelEdit}
            />
          </aside>

          {/* Zone principale */}
          <section className="flex-1 min-w-0 flex flex-col gap-4">
            <FilterBar filters={filters} onChange={setFilters} />
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
import { useState, useCallback } from "react";

// Badges de catégorie
const CATEGORY_STYLES = {
  Travail: "bg-blue-100 text-blue-700",
  Personnel: "bg-teal-100 text-teal-700",
  Études: "bg-amber-100 text-amber-700",
};

// Badges de priorité
const PRIORITY_STYLES = {
  Haute: "bg-red-100 text-red-600",
  Moyenne: "bg-orange-100 text-orange-600",
  Basse: "bg-green-100 text-green-600",
};

// Composant pour un seul item
const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = useCallback(() => {
    if (confirmDelete) {
      onDelete(task.id);
    } else {
      setConfirmDelete(true);
      // Reset automatique après 3 secondes
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  }, [confirmDelete, onDelete, task.id]);

  return (
    <div
      className={`task-enter bg-white rounded-xl border shadow-sm p-4
        flex items-start gap-3 transition-all duration-200
        ${task.done ? "opacity-60 border-gray-200" : "border-gray-200 hover:border-indigo-200 hover:shadow-md"}`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? "Marquer non terminée" : "Marquer terminée"}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center
          justify-content-center transition-all duration-200 flex items-center justify-center
          ${
            task.done
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400"
          }`}
      >
        {task.done && (
          <svg
            className="w-3 h-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </button>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-snug
            ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {task.title}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${CATEGORY_STYLES[task.category] || "bg-gray-100 text-gray-600"}`}
          >
            {task.category}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${PRIORITY_STYLES[task.priority] || "bg-gray-100 text-gray-600"}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          aria-label="Modifier"
          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50
            rounded-lg transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <button
          onClick={handleDeleteClick}
          aria-label={confirmDelete ? "Confirmer la suppression" : "Supprimer"}
          className={`p-1.5 rounded-lg transition text-xs font-medium
            ${
              confirmDelete
                ? "bg-red-100 text-red-600 hover:bg-red-200 px-2"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            }`}
        >
          {confirmDelete ? (
            "Confirmer ?"
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

// Composant liste
const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
        <p className="text-3xl mb-3">📭</p>
        <p className="text-gray-600 font-medium">Aucune tâche trouvée</p>
        <p className="text-gray-400 text-sm mt-1">
          Ajoutez une tâche ou modifiez vos filtres
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide px-1">
        {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
      </p>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
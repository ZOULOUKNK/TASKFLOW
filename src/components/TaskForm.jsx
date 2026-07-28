import { useState, useEffect } from "react";

const CATEGORIES = ["Travail", "Personnel", "Études"];
const PRIORITIES = ["Haute", "Moyenne", "Basse"];

const emptyForm = {
  title: "",
  category: "Travail",
  priority: "Moyenne",
};

const TaskForm = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // Pré-remplissage en mode édition
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        category: editingTask.category,
        priority: editingTask.priority,
      });
      setError("");
    } else {
      setForm(emptyForm);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    onSubmit(form);
    setForm(emptyForm);
    setError("");
  };

  const isEditing = Boolean(editingTask);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        {isEditing ? "✏️ Modifier la tâche" : "➕ Nouvelle tâche"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Titre */}
        <div>
          <label
            htmlFor="title"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Titre *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Que devez-vous faire ?"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition
              ${
                error
                  ? "border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              }`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>

        {/* Catégorie + Priorité */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="category"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300
                focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Priorité
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300
                focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-2 mt-1">
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600
                bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-sm font-medium text-white
              bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg transition"
          >
            {isEditing ? "Enregistrer" : "Ajouter la tâche"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
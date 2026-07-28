import { useCallback } from "react";

const STATUSES = [
  { value: "all", label: "Toutes" },
  { value: "active", label: "En cours" },
  { value: "done", label: "Terminées" },
];

const CATEGORIES = [
  { value: "all", label: "Tout" },
  { value: "Travail", label: "Travail" },
  { value: "Personnel", label: "Personnel" },
  { value: "Études", label: "Études" },
];

const FilterBar = ({ filters, onChange }) => {
  const setStatus = useCallback(
    (status) => onChange({ ...filters, status }),
    [filters, onChange]
  );

  const setCategory = useCallback(
    (category) => onChange({ ...filters, category }),
    [filters, onChange]
  );

  const setSearch = useCallback(
    (e) => onChange({ ...filters, search: e.target.value }),
    [filters, onChange]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
      {/* Recherche */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          value={filters.search}
          onChange={setSearch}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300
            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
        />
      </div>

      {/* Filtre statut */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setStatus(value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition
              ${
                filters.status === value
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filtre catégorie */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition
              ${
                filters.category === value
                  ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
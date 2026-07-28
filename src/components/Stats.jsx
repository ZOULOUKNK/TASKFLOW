const Stats = ({ tasks }) => {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const byCategory = ["Travail", "Personnel", "Études"].map((cat) => ({
    label: cat,
    count: tasks.filter((t) => t.category === cat).length,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        📊 Statistiques
      </h2>

      {/* Compteurs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{total}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-indigo-600">{active}</p>
          <p className="text-xs text-indigo-400 mt-0.5">En cours</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{done}</p>
          <p className="text-xs text-green-400 mt-0.5">Terminées</p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progression</span>
          <span className="font-medium text-gray-700">{percent}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Par catégorie */}
      <div>
        <p className="text-xs font-medium text-gray-500 mb-2">Par catégorie</p>
        <div className="flex flex-col gap-1.5">
          {byCategory.map(({ label, count }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{label}</span>
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
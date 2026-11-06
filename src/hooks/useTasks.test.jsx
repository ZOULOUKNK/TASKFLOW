import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTasks } from "./useTasks";

const STORAGE_KEY = "taskflow_tasks";

describe("useTasks", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("affiche les tâches d'exemple au premier lancement", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toHaveLength(3);
  });

  it("garde une liste vide après rechargement si tout a été supprimé", () => {
    const first = renderHook(() => useTasks());
    act(() => {
      first.result.current.tasks.forEach((t) => first.result.current.deleteTask(t.id));
    });
    expect(first.result.current.tasks).toHaveLength(0);
    first.unmount();

    const second = renderHook(() => useTasks());
    expect(second.result.current.tasks).toHaveLength(0);
  });

  it("revient aux exemples si le stockage est illisible", () => {
    localStorage.setItem(STORAGE_KEY, "{pas du json");
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toHaveLength(3);
  });

  it("ajoute, modifie, coche et supprime une tâche", () => {
    localStorage.setItem(STORAGE_KEY, "[]");
    const { result } = renderHook(() => useTasks());

    act(() => result.current.addTask({ title: "  Réviser  ", category: "Études", priority: "Haute" }));
    const id = result.current.tasks[0].id;
    expect(result.current.tasks[0].title).toBe("Réviser");

    act(() => result.current.updateTask(id, { title: "Réviser React", category: "Études", priority: "Basse" }));
    act(() => result.current.toggleTask(id));
    expect(result.current.tasks[0]).toMatchObject({ title: "Réviser React", priority: "Basse", done: true });

    act(() => result.current.deleteTask(id));
    expect(result.current.tasks).toHaveLength(0);
  });

  it("ajoute une tâche même sans crypto.randomUUID (adresse IP locale en http)", () => {
    localStorage.setItem(STORAGE_KEY, "[]");
    vi.spyOn(globalThis, "crypto", "get").mockReturnValue({});
    const { result } = renderHook(() => useTasks());

    act(() => result.current.addTask({ title: "A", category: "Travail", priority: "Moyenne" }));
    act(() => result.current.addTask({ title: "B", category: "Travail", priority: "Moyenne" }));

    const [b, a] = result.current.tasks;
    expect(a.id).toBeTruthy();
    expect(a.id).not.toBe(b.id);
  });

  it("ne plante pas si le navigateur refuse l'enregistrement", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Quota dépassé", "QuotaExceededError");
    });
    const { result } = renderHook(() => useTasks());

    act(() => result.current.addTask({ title: "Hors ligne", category: "Travail", priority: "Moyenne" }));
    expect(result.current.tasks[0].title).toBe("Hors ligne");
  });
});

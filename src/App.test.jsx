import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it("ajoute une tâche depuis le formulaire", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Titre *"), { target: { value: "Rendre le TP" } });
    fireEvent.click(screen.getByRole("button", { name: "Ajouter la tâche" }));
    expect(screen.getByText("Rendre le TP")).toBeTruthy();
  });

  it("refuse un titre vide", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Ajouter la tâche" }));
    expect(screen.getByText("Le titre est obligatoire.")).toBeTruthy();
  });

  it("quitte le mode édition si la tâche modifiée est supprimée", () => {
    render(<App />);
    const title = "Lire la documentation React Hooks";
    const item = screen.getByText(title).closest(".task-enter");

    fireEvent.click(item.querySelector('[aria-label="Modifier"]'));
    expect(screen.getByText("✏️ Modifier la tâche")).toBeTruthy();

    fireEvent.click(item.querySelector('[aria-label="Supprimer"]'));
    fireEvent.click(item.querySelector('[aria-label="Confirmer la suppression"]'));

    expect(screen.queryByText(title)).toBeNull();
    expect(screen.getByText("➕ Nouvelle tâche")).toBeTruthy();
  });

  it("filtre par recherche", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/rechercher/i), { target: { value: "courses" } });
    expect(screen.getByText("Faire les courses de la semaine")).toBeTruthy();
    expect(screen.queryByText("Préparer la réunion de groupe")).toBeNull();
  });
});

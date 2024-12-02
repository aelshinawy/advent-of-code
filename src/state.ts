import { atom } from "jotai";
import data from "./data";
import { ProblemSolver } from "./Solver";
import { loadable } from "jotai/utils";

export const contentAtom = atom(data);
export const solverPathAtom = atom<string | null>(null);
export const solverAtom = loadable(atom(async (get) => {
    const path = get(solverPathAtom);
    if (path === null) return null;
    const module = await import(`./data/${path}`);
    return module.default as ProblemSolver;
}));
import { atom } from "jotai";
import data from "./solutions";
import { loadable } from "jotai/utils";
import { ProblemSolver } from "./components/Solver";

export const contentAtom = atom(data);
export const solverPathAtom = atom<string | null>(null);
export const solverAtom = loadable(atom(async (get) => {
    const path = get(solverPathAtom);
    if (path === null) return null;
    const module = await import(/* @vite-ignore */`./solutions/${path}`);
    return module.default as ProblemSolver;
}));

export const resultAtom = atom('');
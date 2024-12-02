import { map, pipe, reduce } from "rxjs";
import { ProblemSolver } from "../../Solver";

function checkReportSaftey(arr: number[]): boolean {
    let increasing = true, decreasing = true;
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        if (diff < 1 || diff > 3) increasing = false;
        if (diff > -1 || diff < -3) decreasing = false;
        if (!increasing && !decreasing) return false;
    }
    return true;
}

function checkReportSafteyWithDampner(arr: number[]): boolean {
    return checkReportSaftey(arr) || arr.some((_, i) => checkReportSaftey([...arr.slice(0, i), ...arr.slice(i + 1)]));
}


export const day2part2: ProblemSolver = pipe(
    map((line:string) => line.trim().split(/\s+/).map(Number)),
    reduce((acc, nums:number[]) => checkReportSafteyWithDampner(nums) ? acc + 1 : acc ,0),
);
  
import { filter, map, pipe, reduce } from "rxjs";
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

export const day2part1: ProblemSolver = pipe(
    map((line:string) => line.trim().split(/\s+/).map(Number)),
    filter((nums:number[]) => nums.length >= 5),
    reduce((acc, nums:number[]) => checkReportSaftey(nums) ? acc + 1 : acc ,0),
);
  
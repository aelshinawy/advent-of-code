import { filter, map, pipe, reduce } from "rxjs";
import { ProblemSolver } from "../../../Solver";

function checkReportSaftey(arr: number[]): boolean {
    const diffs = arr.slice(1).map((v, i) => v - arr[i]);
    return diffs.every(d => d >= 1 && d <= 3) || diffs.every(d => d <= -1 && d >= -3);
}

export const day2part1: ProblemSolver = pipe(
    map((line:string) => line.trim().split(/\s+/).map(Number)),
    filter((nums:number[]) => nums.length >= 5),
    reduce((acc, nums:number[]) => checkReportSaftey(nums) ? acc + 1 : acc ,0),
);
  

export default day2part1;
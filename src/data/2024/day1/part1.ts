import { filter, map, pipe, reduce } from "rxjs";
import { ProblemSolver } from "../../../Solver";
import { binaryInsert } from "../../../utils";

export const day1part1: ProblemSolver = pipe(
    map((line:string) => line.trim().split(/\s+/).map(Number)),
    filter((nums:number[]) => nums.length >= 2),
    reduce((acc, nums:number[]) => {
        binaryInsert(acc.left, nums[0]);
        binaryInsert(acc.right, nums[1]);
        return acc;
    },{ left: [] as number[], right: [] as number[] }),
    map(({ left, right }) => {
    return left.reduce((sum: number, leftVal: number, index: number) => sum + Math.abs(leftVal - right[index]), 0);
    }),
);
  
export default day1part1;
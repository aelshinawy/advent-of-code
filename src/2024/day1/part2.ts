import { filter, map, pipe, reduce } from "rxjs";
import { ProblemSolver } from "../../Solver";
import { binaryInsert } from "../../utils";

  
export const day1part2: ProblemSolver = pipe(
    map((line:string) => line.trim().split(/\s+/).map(Number)),
    filter((nums:number[]) => nums.length >= 2),
    reduce((acc, nums:number[]) => {
        binaryInsert(acc.left, nums[0]);
        acc.right.set(nums[1], (acc.right.get(nums[1]) || 0) + 1);
        return acc;
    },{ left: [] as number[], right: new Map() as Map<number, number> }),
    map(({ left, right }) => {
    return left.reduce((sum: number, leftVal: number) => sum + leftVal * (right.get(leftVal) ?? 0), 0);
    }),
);
  
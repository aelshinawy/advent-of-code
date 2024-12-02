import { from, map, Observable, reduce, switchMap } from 'rxjs';
import { linesToArray } from '../../../utils';
import { ProblemSolver } from '../../../components/Solver';

function checkReportSaftey(arr: number[]): boolean {
  const diffs = arr.slice(1).map((v, i) => v - arr[i]);
  return (
    diffs.every((d) => d >= 1 && d <= 3) ||
    diffs.every((d) => d <= -1 && d >= -3)
  );
}

function checkReportSafteyWithDampner(arr: number[]): boolean {
  return (
    checkReportSaftey(arr) ||
    arr.some((_, i) =>
      checkReportSaftey([...arr.slice(0, i), ...arr.slice(i + 1)]),
    )
  );
}

export const day2part2: ProblemSolver = (input$: Observable<string>) =>
  input$.pipe(
    switchMap((input: string) =>
      from(linesToArray(input)).pipe(
        map((line: string) => line.trim().split(/\s+/).map(Number)),
        reduce(
          (acc, nums: number[]) =>
            checkReportSafteyWithDampner(nums) ? acc + 1 : acc,
          0,
        ),
      ),
    ),
  );

export default day2part2;

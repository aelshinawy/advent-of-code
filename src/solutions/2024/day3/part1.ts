import { map, Observable } from 'rxjs';
import { ProblemSolver } from '../../../components/Solver';


function sumValidMultiplications(input: string): number {
  return Array.from(input.matchAll(/mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g)).reduce(
    (sum, [, x, y]) => sum + parseInt(x, 10) * parseInt(y, 10),
    0,
  );
}

export const day3part1: ProblemSolver = (input$: Observable<string>) =>
  input$.pipe(map(sumValidMultiplications));

export default day3part1;

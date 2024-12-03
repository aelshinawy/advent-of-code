import { map, Observable } from 'rxjs';
import { ProblemSolver } from '../../../components/Solver';

function sumEnabledMultiplications(input: string): number {
  let isEnabled = true;
  return Array.from(
    input.matchAll(/mul\(\s*(\d+)\s*,\s*(\d+)\s*\)|do\(\)|don't\(\)/g),
  ).reduce((sum, match) => {
    const [instruction, x, y] = match;
    if (instruction === 'do()') isEnabled = true;
    else if (instruction === "don't()") isEnabled = false;
    else if (isEnabled) return sum + parseInt(x, 10) * parseInt(y, 10);
    return sum;
  }, 0);
}

export const day3part2: ProblemSolver = (input$: Observable<string>) =>
  input$.pipe(map(sumEnabledMultiplications));

export default day3part2;

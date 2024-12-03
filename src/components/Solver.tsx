import { Button, Textarea } from '@mantine/core';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { Observable, of, Subject, switchMap, UnaryFunction } from 'rxjs';
import { resultAtom } from '../state';

const buttonClick$ = new Subject<void>();
const userInput$ = new Subject<string>();

export type ProblemSolver = UnaryFunction<
  Observable<string>,
  Observable<number>
>;

export default function Solver({ algorithm }: { algorithm: ProblemSolver }) {
  const [input, setInput] = useState('');
  const [, setAnswer] = useAtom<string>(resultAtom)

  const solver$ = useMemo(
    () => userInput$.pipe(switchMap((input) => algorithm(of(input)))),
    [algorithm],
  );

  useEffect(() => {
    const buttonSub = buttonClick$.subscribe(() => {
      userInput$.next(input);
    });

    const result = solver$.subscribe((input) => {
      setAnswer(input.toString());
    });
    return () => {
      buttonSub.unsubscribe();
      result.unsubscribe();
    };
  }, [algorithm, input, setAnswer, solver$]);

  return (
    <div>
      <Textarea
        style={{ marginBottom: '10px' }}
        autosize
        maxRows={10}
        label="Puzzle Input"
        placeholder="Add your puzzle input here"
        value={input}
        onChange={(event) => {
          setInput(event.currentTarget.value);
        }}
      />
      <Button
        variant="filled"
        color="green"
        onClick={() => buttonClick$.next()}
      >
        Solve
      </Button>
    </div>
  );
}

import { Button, Text, Textarea, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { from, Observable, Subject, switchMap, UnaryFunction } from "rxjs";
import { linesToArray } from "./utils";

const buttonClick$ = new Subject<void>();
const userInput$ = new Subject<string>();

export type ProblemSolver = UnaryFunction<
  Observable<string>,
  Observable<number>
>;

export default function Solver({ algorithm }: { algorithm: ProblemSolver }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const solver$ = useMemo(
    () =>
      userInput$.pipe(
        switchMap((userinput) => from(linesToArray(userinput)).pipe(algorithm))
      ),
    [algorithm]
  );

  useEffect(() => {
    const buttonSub = buttonClick$.subscribe(() => {
      userInput$.next(input);
    });

    const result = solver$.subscribe((input) => {
      setResult(input.toString());
    });
    return () => {
      buttonSub.unsubscribe();
      result.unsubscribe();
    };
  }, [algorithm, input, solver$]);

  return (
    <div>
      <Textarea
        style={{ marginBottom: "10px" }}
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
      <Text>Answer: </Text>
      <Title order={2} c="teal.4">
        {result}
      </Title>
    </div>
  );
}

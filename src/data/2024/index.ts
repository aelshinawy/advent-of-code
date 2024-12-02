import { TreeNodeData } from "@mantine/core";
import { ProblemSolver } from "../../Solver";


export type Part = {
    name: string;
    description: string;
    code: ProblemSolver;
};

export type Content = {
  [key: string]: {
    link: string;
    part1: Part;
    part2: Part;
  };
};

export interface TreeData extends TreeNodeData {
  key: string;
  data?: Record<string, unknown>;
}
export const data2024 = [
  {
    key: `2024`,
    label:`2024`,
    value:`2024`,
    children: [
      {
        key: `2024d1`,
        label:`Day 1`,
        value:`2024d1`,
        data: {
          link: `https://adventofcode.com/2024/day/1`,
          example: `3 4 \n4 3 \n2 5 \n1 3 \n3 9 \n3 3`,
        },
        children: [
          {
            key: `2024d1p1`,
            label: `Part 1`,
            value: `2024d1p1`,
            data: {
              description: "Day 1, Part 1 description",
              path: `2024/day1/part1`,
            }
          },
          {
            key: `2024d1p2`,
            label: `Part 2`,
            value: `2024d1p2`,
            data: {
              description: "Day 1, Part 2 description",
              path:`2024/day1/part2`,
            }
          }
        ]
      },
      {
        key: `2024d2`,
        label:`Day 2`,
        value:`2024d2`,
        data: {
          link: `https://adventofcode.com/2024/day/2`,
          example: `7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9`,
        },
        children: [
          {
            key: `2024d2p1`,
            label: `Part 1`,
            value: `2024d2p1`,
            data: {
              description: "Day 2, Part 1 description",
              path: `2024/day2/part1`,
            }
          },
          {
            key: `2024d2p2`,
            label: `Part 2`,
            value: `2024d2p2`,
            data: {
              description: "Day 2, Part 2 description",
              path:`2024/day2/part2`,
            }
          }
        ]
      }
    ]
  }
  
];
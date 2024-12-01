import { TreeNodeData } from "@mantine/core";
import { ProblemSolver } from "../Solver";
import { day1part1 } from "./day1/part1";
import { day1part2 } from "./day1/part2";


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

export const content = {
  day1: {
    link: "https://adventofcode.com/2024/day/1",
    part1: {
        name: "Part 1",
        description: "Day 1, Part 1 description",
        code: day1part1,
    },
    part2: {
        name: "Part 2",
        description: "Day 1, Part 2 description",
        code: day1part2,
    },
  },
};


export const parseContentToData = (content: Content): TreeNodeData[] => {
    return Object.keys(content).map((dayKey) => {
      const day = content[dayKey];
      const dayLabel = `Day ${dayKey.replace('day', '')}`;
      
      return {
        value: '2024',
        label: '2024',
        children: [
          {
            value: '',
            label: dayLabel,
            children: [
              { value: day.part1.name, label: 'Part 1' },
              { value: day.part2.name, label: 'Part 2' },
            ],
          },
        ],
      };
    });
  };
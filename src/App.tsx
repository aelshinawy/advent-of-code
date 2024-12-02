import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  useTree
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { content, parseContentToData } from "./2024";
import Solver, { ProblemSolver } from "./Solver";
import { theme } from "./theme";
import TreeComponent from "./Tree";

const data = parseContentToData(content);

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const tree = useTree();

  const [selectedSolver, setSelectedSolver] = useState<ProblemSolver | null>(
    null
  );

  useEffect(() => {
    let func: ProblemSolver;
    const loadSolver = async () => {
      const imported = await import(`./2024/day2/part2`);
      func = imported.day2part2;

      setSelectedSolver(() => func);
    };
    loadSolver();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <h4 className="ml-2">Advent of code</h4>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <TreeComponent tree={tree} data={data} />
        </AppShell.Navbar>
        <AppShell.Main>
          {selectedSolver && <Solver algorithm={selectedSolver} />}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  Tree,
  useTree,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import Solver, { ProblemSolver } from "./Solver";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { content, parseContentToData } from "./2024";

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
      const imported = await import("./2024/day1/part2");
      func = imported.day1part2;

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
          <Tree
            tree={tree}
            data={data}
            levelOffset={30}
            renderNode={({ node, expanded, hasChildren, elementProps }) => (
              <Group key={node.value} gap={5} {...elementProps}>
                {hasChildren && (
                  <IconChevronDown
                    size={18}
                    style={{
                      transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                    }}
                  />
                )}

                <div>{node.label}</div>
              </Group>
            )}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          {selectedSolver && <Solver algorithm={selectedSolver} />}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

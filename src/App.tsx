import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  useTree,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { Route, Switch } from "wouter";
import data from "./data";
import Solver from "./Solver";
import { solverAtom } from "./state";
import { theme } from "./theme";
import TreeComponent from "./Tree";

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const tree = useTree();

  const solvingFunc = useAtomValue(solverAtom);

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
          <Switch>
            <Route path="/solver/:year/:day/:part">
              {solvingFunc.state === 'hasData' && solvingFunc.data && <Solver algorithm={solvingFunc.data} />}
            </Route>
            <Route>404: No such page!</Route>
          </Switch>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

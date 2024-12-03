import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  Text,
  useTree
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { Route, Switch } from 'wouter';
import Solver from './components/Solver';
import TreeComponent from './components/Tree/Tree';
import data from './solutions';
import { solverAtom } from './state';
import { theme } from './theme';
import Result from './Result';

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const tree = useTree();

  const solvingFunc = useAtomValue(solverAtom);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell
        layout="alt"
        header={{ height: 60 }}
        footer={{ height: 200 }}
        navbar={{
          width: 220,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened },
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
            <h3>Advent of code</h3>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="sm">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Text>Navbar</Text>
          </Group>
          <TreeComponent tree={tree} data={data} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Switch>
            <Route path="/solver/:year/:day/:part">
              {solvingFunc.state === 'hasData' && solvingFunc.data && (
                <Solver algorithm={solvingFunc.data} />
              )}
            </Route>
            <Route>404: No such page!</Route>
          </Switch>
        </AppShell.Main>
        {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
        <AppShell.Footer p="md"><Result/></AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

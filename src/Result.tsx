import { useAtomValue } from 'jotai';
import { resultAtom } from './state';
import { Title } from '@mantine/core';

export default function Result() {
  const result = useAtomValue(resultAtom);
  return (
    <Title order={1} c="teal.4">
      {result}
    </Title>
  );
}

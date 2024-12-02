import {
  Group,
  RenderTreeNodePayload,
  Space,
  Tree,
  TreeNodeData,
  UseTreeReturnType,
} from "@mantine/core";
import { IconCode, IconFolder, IconFolderOpen } from "@tabler/icons-react";

import { useAtom } from "jotai";
import { useLocation } from "wouter";
import { TreeData } from "./data/2024";
import { solverPathAtom } from "./state";
import classes from "./Tree.module.css";

interface FileIconProps {
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ isFolder, expanded }: FileIconProps) {
  if (isFolder) {
    return expanded ? (
      <IconFolderOpen
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    ) : (
      <IconFolder
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    );
  } else {
    return <IconCode size={14} />;
  }

  return null;
}

function Leaf({
  node,
  expanded,
  hasChildren,
  elementProps,
  setSolver,
}: RenderTreeNodePayload & { setSolver: (solver: string) => void }) {
  const [, setLocation] = useLocation();

  const handleClick = (node: TreeData) => {
    if (!hasChildren) {
      if (!node.data) return;
      setLocation(`/solver/${node.data.path}`);
      setSolver(`${node.data.path}`);
    }
  };
  return (
    <Group key={(node as TreeData).key} gap={5} {...elementProps}>
      <Group onClick={() => handleClick(node as TreeData)}>
        <Space w="sm" />
        <FileIcon isFolder={hasChildren} expanded={expanded} />
        <span>{node.label}</span>
      </Group>
    </Group>
  );
}

export default function TreeComponent({
  tree,
  data,
}: {
  tree: UseTreeReturnType;
  data: TreeNodeData[];
}) {
  const [, setSelectedSolver] = useAtom(solverPathAtom);
  return (
    <Tree
      tree={tree}
      classNames={classes}
      clearSelectionOnOutsideClick
      data={data}
      renderNode={(payload) => (
        <Leaf {...payload} setSolver={setSelectedSolver} />
      )}
    />
  );
}

import {
    Group,
    RenderTreeNodePayload,
    Space,
    Tree,
    TreeNodeData,
    UseTreeReturnType
} from "@mantine/core";
import { IconCode, IconFolder, IconFolderOpen } from "@tabler/icons-react";

import classes from "./Tree.module.css";

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.startsWith("part")) {
    return <IconCode size={14} />;
  }

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
  }

  return null;
}

function Leaf({
  node,
  expanded,
  hasChildren,
  elementProps,
}: RenderTreeNodePayload) {
  return (
    <Group key={node.value} gap={5} {...elementProps}>
      <Space w="sm" />
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
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
  return (
    <Tree
      tree={tree}
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      data={data}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}

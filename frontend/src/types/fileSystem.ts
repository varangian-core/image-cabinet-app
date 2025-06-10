export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
  mimeType?: string;
  children?: FileNode[];
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date;
  isExpanded?: boolean;
}

export interface FileAction {
  id: string;
  label: string;
  icon: string;
  action: (node: FileNode) => void;
  variant?: 'default' | 'danger';
}

export interface TreeViewProps {
  nodes: FileNode[];
  selectedPath?: string;
  onSelectPath: (path: string) => void;
  onNodeAction?: (node: FileNode, action: string) => void;
  className?: string;
}
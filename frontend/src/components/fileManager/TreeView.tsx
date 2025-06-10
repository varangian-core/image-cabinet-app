import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Download,
  Copy,
  Move,
  MoreVertical
} from 'lucide-react';
import type { FileNode, TreeViewProps } from '../../types';

interface TreeNodeProps {
  node: FileNode;
  level: number;
  selectedPath?: string;
  onSelectPath: (path: string) => void;
  onNodeAction?: (node: FileNode, action: string) => void;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedPath,
  onSelectPath,
  onNodeAction,
  onToggle,
  expandedNodes
}) => {
  const [showActions, setShowActions] = useState(false);
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedPath === node.path;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'folder') {
      onToggle(node.id);
    }
  };

  const handleSelect = () => {
    if (node.type === 'folder') {
      onSelectPath(node.path);
    }
  };

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeAction?.(node, action);
    setShowActions(false);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "group relative flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all",
          "hover:bg-white/5",
          isSelected && "bg-white/10 text-white"
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleSelect}
      >
        {/* Expand/Collapse Button */}
        {node.type === 'folder' && (
          <button
            onClick={handleToggle}
            className="p-0.5 hover:bg-white/10 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
        {node.type === 'file' && <div className="w-5" />}

        {/* Icon */}
        {node.type === 'folder' ? (
          isExpanded ? (
            <FolderOpen className="w-5 h-5 text-yellow-400" />
          ) : (
            <Folder className="w-5 h-5 text-yellow-400" />
          )
        ) : (
          <File className="w-5 h-5 text-gray-400" />
        )}

        {/* Name */}
        <span className={cn(
          "flex-1 text-sm",
          isSelected ? "text-white font-medium" : "text-gray-300"
        )}>
          {node.name}
        </span>

        {/* Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          {node.type === 'folder' && (
            <>
              <button
                onClick={(e) => handleAction('new-folder', e)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title="New folder"
              >
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button
                onClick={(e) => handleAction('upload', e)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title="Upload files"
              >
                <Upload className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </>
          )}
          
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Action Menu */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50"
                  onMouseLeave={() => setShowActions(false)}
                >
                  <div className="p-1">
                    <button
                      onClick={(e) => handleAction('rename', e)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Rename
                    </button>
                    <button
                      onClick={(e) => handleAction('copy', e)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={(e) => handleAction('move', e)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                    >
                      <Move className="w-4 h-4" />
                      Move
                    </button>
                    {node.type === 'file' && (
                      <button
                        onClick={(e) => handleAction('download', e)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                    <div className="border-t border-gray-700 my-1" />
                    <button
                      onClick={(e) => handleAction('delete', e)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                selectedPath={selectedPath}
                onSelectPath={onSelectPath}
                onNodeAction={onNodeAction}
                onToggle={onToggle}
                expandedNodes={expandedNodes}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  selectedPath,
  onSelectPath,
  onNodeAction,
  className
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'upload']));

  const handleToggle = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  return (
    <div className={cn(
      "bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white">File System</h3>
        <button
          onClick={() => onNodeAction?.({ id: 'root', name: 'root', type: 'folder', path: '/' } as FileNode, 'new-folder')}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          title="New folder"
        >
          <Plus className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Tree */}
      <div className="p-2 max-h-[600px] overflow-y-auto">
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            level={0}
            selectedPath={selectedPath}
            onSelectPath={onSelectPath}
            onNodeAction={onNodeAction}
            onToggle={handleToggle}
            expandedNodes={expandedNodes}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <div className="text-xs text-gray-400">
          Selected: <span className="text-white font-medium">{selectedPath || 'None'}</span>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import {
  Upload,
  FolderPlus,
  Settings,
  HardDrive,
  Cloud,
  Trash2,
  Search,
  Grid,
  List,
  Filter,
  ChevronRight
} from 'lucide-react';
import { TreeView } from '../components/fileManager/TreeView';
import { CategoryManager } from '../components/categories/CategoryManager';
import type { Category, FileNode } from '../types';

export const FileManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('/Upload');
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');
  const [showCategories, setShowCategories] = useState(false);
  const [fileSystem, setFileSystem] = useState<FileNode[]>([]);

  // Initialize file system with default structure
  useEffect(() => {
    const uploadFolder: FileNode = {
      id: 'upload',
      name: 'Upload',
      type: 'folder',
      path: '/Upload',
      createdAt: new Date(),
      updatedAt: new Date(),
      children: []
    };

    // Create category folders
    const categoryFolders = categories.map((cat, index) => ({
      id: `cat-${cat.id}`,
      name: cat.name,
      type: 'folder' as const,
      path: `/Upload/${cat.name}`,
      categoryId: cat.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      children: []
    }));

    uploadFolder.children = categoryFolders;

    const rootStructure: FileNode[] = [
      {
        id: 'root',
        name: 'Root',
        type: 'folder',
        path: '/',
        createdAt: new Date(),
        updatedAt: new Date(),
        children: [uploadFolder]
      }
    ];

    setFileSystem(rootStructure);
  }, [categories]);

  const handleNodeAction = (node: FileNode, action: string) => {
    console.log('Node action:', action, node);
    // Handle different actions
    switch (action) {
      case 'new-folder':
        // Create new folder logic
        break;
      case 'upload':
        // Upload files logic
        break;
      case 'delete':
        // Delete node logic
        break;
      case 'rename':
        // Rename node logic
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (files: FileList) => {
    console.log('Uploading files to:', selectedPath);
    // File upload logic here
  };

  if (showCategories) {
    return (
      <div className="min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <button
            onClick={() => setShowCategories(false)}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to File Manager
          </button>
          <CategoryManager
            categories={categories}
            onCategoriesChange={setCategories}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">File Manager</h1>
            <p className="text-gray-400">Organize and manage your files efficiently</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCategories(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Manage Categories
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Files</p>
                <p className="text-2xl font-bold text-white mt-1">1,234</p>
              </div>
              <HardDrive className="w-8 h-8 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Storage Used</p>
                <p className="text-2xl font-bold text-white mt-1">45.2 GB</p>
              </div>
              <Cloud className="w-8 h-8 text-pink-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-white mt-1">{categories.length}</p>
              </div>
              <FolderPlus className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Recent Uploads</p>
                <p className="text-2xl font-bold text-white mt-1">23</p>
              </div>
              <Upload className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tree View */}
          <div className="lg:col-span-1">
            <TreeView
              nodes={fileSystem}
              selectedPath={selectedPath}
              onSelectPath={setSelectedPath}
              onNodeAction={handleNodeAction}
              className="h-full"
            />
          </div>

          {/* File Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toolbar */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      className="pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                    />
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Filter className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === 'grid' ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400"
                    )}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('tree')}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === 'tree' ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400"
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative bg-gray-900/50 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-xl p-12 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />
              
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-gray-400 mb-6">
                Files will be uploaded to: <span className="text-cyan-400 font-medium">{selectedPath}</span>
              </p>
              
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium cursor-pointer hover:from-cyan-600 hover:to-blue-600 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Choose Files
              </label>

              {/* Background decoration */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>

            {/* Recent Files */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Files</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm text-center py-8">
                  No files uploaded yet. Start by uploading files or creating folders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
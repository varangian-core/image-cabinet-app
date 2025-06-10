import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
  Plus,
  X,
  Edit2,
  Trash2,
  Save,
  Palette,
  FileText,
  Image,
  Video,
  Archive,
  Folder,
  Music,
  Code,
  Database,
  Sparkles
} from 'lucide-react';
import type { Category } from '../../types';
import { FLUORESCENT_COLORS, DEFAULT_CATEGORIES } from '../../types';

const iconMap = {
  FileText,
  Image,
  Video,
  Archive,
  Folder,
  Music,
  Code,
  Database,
  Sparkles
};

interface CategoryManagerProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  className?: string;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onCategoriesChange,
  className
}) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: FLUORESCENT_COLORS[0].value,
    icon: 'Folder',
    description: ''
  });

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        id: Date.now().toString(),
        ...newCategory,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      onCategoriesChange([...categories, category]);
      setNewCategory({
        name: '',
        color: FLUORESCENT_COLORS[0].value,
        icon: 'Folder',
        description: ''
      });
      setIsAddingCategory(false);
    }
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    onCategoriesChange(
      categories.map(cat =>
        cat.id === id
          ? { ...cat, ...updates, updatedAt: new Date() }
          : cat
      )
    );
    setEditingId(null);
  };

  const handleDeleteCategory = (id: string) => {
    onCategoriesChange(categories.filter(cat => cat.id !== id));
  };

  const initializeDefaultCategories = () => {
    const defaultCats: Category[] = DEFAULT_CATEGORIES.map((cat, index) => ({
      ...cat,
      id: `default-${index}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    onCategoriesChange(defaultCats);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Categories</h2>
          <p className="text-gray-400 mt-1">Organize your files with custom categories</p>
        </div>
        <div className="flex items-center gap-3">
          {categories.length === 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initializeDefaultCategories}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-black font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Use Defaults
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingCategory(true)}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </motion.button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Folder;
            const isEditing = editingId === category.id;
            const colorInfo = FLUORESCENT_COLORS.find(c => c.value === category.color) || FLUORESCENT_COLORS[0];

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <div
                  className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden"
                  style={{
                    boxShadow: `0 0 30px ${colorInfo.glow}`
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at center, ${category.color}, transparent 70%)`
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {isEditing ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={category.name}
                          onChange={(e) => handleUpdateCategory(category.id, { name: e.target.value })}
                          className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                          autoFocus
                        />
                        <textarea
                          value={category.description || ''}
                          onChange={(e) => handleUpdateCategory(category.id, { description: e.target.value })}
                          className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-sm"
                          rows={2}
                          placeholder="Description..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="p-3 rounded-lg"
                            style={{
                              backgroundColor: `${category.color}20`,
                              color: category.color
                            }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditingId(category.id)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-400">{category.description || 'No description'}</p>
                      </>
                    )}
                  </div>

                  {/* Color bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Add Category Card */}
          {isAddingCategory && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-xl p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Category name..."
                    className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500"
                    autoFocus
                  />
                  
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Description (optional)..."
                    className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm"
                    rows={2}
                  />

                  {/* Color Picker */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Choose a color:</p>
                    <div className="grid grid-cols-6 gap-2">
                      {FLUORESCENT_COLORS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                          className={cn(
                            "w-10 h-10 rounded-lg transition-all",
                            newCategory.color === color.value && "ring-2 ring-white ring-offset-2 ring-offset-gray-900"
                          )}
                          style={{
                            backgroundColor: color.value,
                            boxShadow: newCategory.color === color.value ? `0 0 20px ${color.glow}` : ''
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddCategory}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-medium"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingCategory(false);
                        setNewCategory({
                          name: '',
                          color: FLUORESCENT_COLORS[0].value,
                          icon: 'Folder',
                          description: ''
                        });
                      }}
                      className="px-4 py-2 bg-white/10 rounded-lg text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
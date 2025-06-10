import React, { useState } from 'react';
import { Archive, Plus, Edit2, Trash2, FolderOpen, Image } from 'lucide-react';
import { cn } from '../lib/utils';

interface Cabinet {
  id: string;
  name: string;
  description: string;
  color: string;
  imageCount: number;
  customSuffix?: string;
  createdAt: string;
}

const mockCabinets: Cabinet[] = [
  {
    id: '1',
    name: 'Family Photos',
    description: 'Precious family memories and gatherings',
    color: 'bg-blue-500',
    imageCount: 342,
    customSuffix: 'family',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Work Documents',
    description: 'Screenshots, presentations, and work-related images',
    color: 'bg-green-500',
    imageCount: 189,
    customSuffix: 'work',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Travel Adventures',
    description: 'Photos from trips around the world',
    color: 'bg-purple-500',
    imageCount: 456,
    customSuffix: 'travel',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Receipts',
    description: 'Digital copies of receipts and invoices',
    color: 'bg-yellow-500',
    imageCount: 78,
    customSuffix: 'receipt',
    createdAt: '2024-02-10',
  },
];

export const FilingCabinets: React.FC = () => {
  const [cabinets, setCabinets] = useState(mockCabinets);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCabinet, setEditingCabinet] = useState<Cabinet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    customSuffix: '',
    color: 'bg-blue-500',
  });

  const handleCreate = () => {
    const newCabinet: Cabinet = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      color: formData.color,
      customSuffix: formData.customSuffix,
      imageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCabinets([...cabinets, newCabinet]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleUpdate = () => {
    if (editingCabinet) {
      setCabinets(cabinets.map(cab =>
        cab.id === editingCabinet.id
          ? { ...cab, ...formData }
          : cab
      ));
      setEditingCabinet(null);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    setCabinets(cabinets.filter(cab => cab.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      customSuffix: '',
      color: 'bg-blue-500',
    });
  };

  const openEditModal = (cabinet: Cabinet) => {
    setEditingCabinet(cabinet);
    setFormData({
      name: cabinet.name,
      description: cabinet.description,
      customSuffix: cabinet.customSuffix || '',
      color: cabinet.color,
    });
  };

  const colorOptions = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-gray-500',
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Filing Cabinets</h1>
          <p className="text-gray-600 mt-2">Organize your images into logical categories</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Cabinet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cabinets.map(cabinet => (
          <div
            key={cabinet.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={cn("h-2", cabinet.color)} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-3 rounded-lg", cabinet.color, "bg-opacity-10")}>
                    <Archive className={cn("w-6 h-6", cabinet.color.replace('bg-', 'text-'))} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{cabinet.name}</h3>
                    <p className="text-sm text-gray-500">Created {cabinet.createdAt}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(cabinet)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cabinet.id)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{cabinet.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Images</span>
                  <span className="font-medium">{cabinet.imageCount}</span>
                </div>
                {cabinet.customSuffix && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Custom Suffix</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      _{cabinet.customSuffix}
                    </code>
                  </div>
                )}
              </div>
              
              <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <FolderOpen className="w-4 h-4" />
                View Images
              </button>
            </div>
          </div>
        ))}
        
        <div
          onClick={() => setShowCreateModal(true)}
          className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors min-h-[280px]"
        >
          <Plus className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">Create New Cabinet</p>
          <p className="text-sm text-gray-500 mt-1">Organize your images</p>
        </div>
      </div>

      {(showCreateModal || editingCabinet) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCabinet ? 'Edit Cabinet' : 'Create New Cabinet'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Family Photos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description of this cabinet..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Suffix (Optional)
                </label>
                <input
                  type="text"
                  value={formData.customSuffix}
                  onChange={(e) => setFormData({ ...formData, customSuffix: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., family"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used in naming patterns: IMG_2024_family.jpg
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={cn(
                        "w-full h-10 rounded-lg transition-all",
                        color,
                        formData.color === color && "ring-2 ring-offset-2 ring-gray-400"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingCabinet(null);
                  resetForm();
                }}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingCabinet ? handleUpdate : handleCreate}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingCabinet ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
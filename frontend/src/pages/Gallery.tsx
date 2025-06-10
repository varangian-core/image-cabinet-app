import React, { useState } from 'react';
import { Search, Filter, Grid, List, Download, Trash2, Tag, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  size: string;
  date: string;
  categories: string[];
  status: 'classified' | 'unclassified' | 'pending';
}

const mockImages: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `img-${i}`,
  name: `IMG_${1000 + i}.jpg`,
  url: `https://picsum.photos/300/300?random=${i}`,
  size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
  date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  categories: ['Nature', 'Landscape', 'Travel'].slice(0, Math.floor(Math.random() * 3) + 1),
  status: ['classified', 'unclassified', 'pending'][Math.floor(Math.random() * 3)] as any,
}));

export const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const filteredImages = mockImages.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || image.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
          <p className="text-gray-600 mt-2">Browse and manage your image collection</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === 'grid'
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === 'list'
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="classified">Classified</option>
          <option value="unclassified">Unclassified</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {selectedImages.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm font-medium text-blue-900">
            {selectedImages.length} images selected
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white text-sm font-medium rounded-md hover:bg-gray-50">
              <Tag className="w-4 h-4 inline mr-1" />
              Classify
            </button>
            <button className="px-3 py-1 bg-white text-sm font-medium rounded-md hover:bg-gray-50">
              <Download className="w-4 h-4 inline mr-1" />
              Download
            </button>
            <button className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600">
              <Trash2 className="w-4 h-4 inline mr-1" />
              Delete
            </button>
          </div>
        </div>
      )}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className={cn(
                "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all",
                selectedImages.includes(image.id) && "ring-2 ring-blue-500"
              )}
              onClick={() => toggleImageSelection(image.id)}
            >
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded",
                    image.status === 'classified' && "bg-green-100 text-green-800",
                    image.status === 'unclassified' && "bg-yellow-100 text-yellow-800",
                    image.status === 'pending' && "bg-blue-100 text-blue-800"
                  )}>
                    {image.status}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{image.name}</p>
                <p className="text-xs text-gray-500 mt-1">{image.size} • {image.date}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {image.categories.map(cat => (
                    <span key={cat} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Image</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Categories</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Size</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map(image => (
                <tr
                  key={image.id}
                  className={cn(
                    "border-b border-gray-100 hover:bg-gray-50",
                    selectedImages.includes(image.id) && "bg-blue-50"
                  )}
                >
                  <td className="px-4 py-3">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{image.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {image.categories.map(cat => (
                        <span key={cat} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded",
                      image.status === 'classified' && "bg-green-100 text-green-800",
                      image.status === 'unclassified' && "bg-yellow-100 text-yellow-800",
                      image.status === 'pending' && "bg-blue-100 text-blue-800"
                    )}>
                      {image.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{image.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{image.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
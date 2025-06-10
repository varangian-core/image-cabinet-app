import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, AlertCircle, RefreshCw, Save } from 'lucide-react';
import { cn } from '../lib/utils';

interface ClassificationItem {
  id: string;
  imageUrl: string;
  imageName: string;
  ollamaSuggestions: Array<{ category: string; confidence: number }>;
  userCategories: string[];
  status: 'pending' | 'reviewing' | 'completed';
}

const mockClassifications: ClassificationItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `class-${i}`,
  imageUrl: `https://picsum.photos/400/300?random=${i + 20}`,
  imageName: `IMG_${2000 + i}.jpg`,
  ollamaSuggestions: [
    { category: 'Nature', confidence: 0.92 },
    { category: 'Landscape', confidence: 0.87 },
    { category: 'Outdoor', confidence: 0.75 },
  ],
  userCategories: [],
  status: i === 0 ? 'reviewing' : 'pending',
}));

export const Classification: React.FC = () => {
  const [classifications, setClassifications] = useState(mockClassifications);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const currentItem = classifications[currentIndex];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApprove = () => {
    const updatedClassifications = [...classifications];
    updatedClassifications[currentIndex] = {
      ...currentItem,
      userCategories: selectedCategories,
      status: 'completed',
    };
    setClassifications(updatedClassifications);
    moveToNext();
  };

  const handleReject = () => {
    setSelectedCategories([]);
  };

  const moveToNext = () => {
    if (currentIndex < classifications.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedCategories([]);
    }
  };

  const progress = ((classifications.filter(c => c.status === 'completed').length / classifications.length) * 100).toFixed(0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Classification</h1>
          <p className="text-gray-600 mt-2">Review and refine AI-suggested categories</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Progress: {progress}%
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Current Image</h2>
          <div className="space-y-4">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.imageName}
              className="w-full rounded-lg"
            />
            <div className="flex justify-between items-center">
              <p className="font-medium">{currentItem.imageName}</p>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                currentItem.status === 'reviewing' && "bg-yellow-100 text-yellow-800",
                currentItem.status === 'pending' && "bg-gray-100 text-gray-800",
                currentItem.status === 'completed' && "bg-green-100 text-green-800"
              )}>
                {currentItem.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">AI Suggestions</h2>
            </div>
            <div className="space-y-3">
              {currentItem.ollamaSuggestions.map((suggestion) => (
                <div
                  key={suggestion.category}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                    selectedCategories.includes(suggestion.category)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleCategoryToggle(suggestion.category)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center",
                      selectedCategories.includes(suggestion.category)
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    )}>
                      {selectedCategories.includes(suggestion.category) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{suggestion.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {(suggestion.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <button
                onClick={handleApprove}
                className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Selection
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleReject}
                  className="py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Clear
                </button>
                <button
                  onClick={moveToNext}
                  className="py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Skip
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Classification Tips</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Review AI suggestions carefully</li>
                  <li>You can select multiple categories</li>
                  <li>Add custom categories if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Reviewing image {currentIndex + 1} of {classifications.length}
          </p>
          <div className="flex gap-2">
            {classifications.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full",
                  idx === currentIndex
                    ? "bg-blue-600"
                    : classifications[idx].status === 'completed'
                    ? "bg-green-600"
                    : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
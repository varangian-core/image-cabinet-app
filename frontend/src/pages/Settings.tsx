import React, { useState } from 'react';
import { Settings as SettingsIcon, Folder, Terminal, FileText, Bell, User, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

type SettingsTab = 'general' | 'ollama' | 'naming' | 'notifications' | 'account';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [localPath, setLocalPath] = useState('/Users/username/ImageCabinet');
  const [ollamaStatus, setOllamaStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'ollama', label: 'Ollama Setup', icon: Terminal },
    { id: 'naming', label: 'Naming Patterns', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
  ];

  const handleBrowse = () => {
    // Simulate file browser
    alert('File browser would open here to select directory');
  };

  const handleOllamaCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalOutput(prev => [...prev, `[${timestamp}] $ ${command}`, 'Processing...']);
    
    // Simulate command execution
    setTimeout(() => {
      if (command === 'ollama pull llava') {
        setTerminalOutput(prev => [...prev, 'Pulling llava model...', 'Model downloaded successfully']);
        setOllamaStatus('connected');
      } else if (command === 'ollama serve') {
        setTerminalOutput(prev => [...prev, 'Starting Ollama server...', 'Server running on http://localhost:11434']);
        setOllamaStatus('connected');
      }
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Local Storage Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Root Directory Path
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={localPath}
                      onChange={(e) => setLocalPath(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleBrowse}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <Folder className="w-4 h-4" />
                      Browse
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    This is where your images will be stored and organized
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Shield className="w-5 h-5" />
                    <p className="text-sm">
                      <strong>Security Note:</strong> The application will only access files within this directory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm">Generate thumbnails automatically</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm">Enable batch processing</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm">Use hardware acceleration when available</span>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'ollama':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ollama Configuration</h3>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  ollamaStatus === 'connected' ? "bg-green-500" : "bg-red-500"
                )} />
                <span className="text-sm font-medium">
                  {ollamaStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleOllamaCommand('ollama --version')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Check Installation
              </button>
              <button
                onClick={() => handleOllamaCommand('ollama pull llava')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Model
              </button>
              <button
                onClick={() => handleOllamaCommand('ollama serve')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Server
              </button>
            </div>
            
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Terminal Output</span>
                <button
                  onClick={() => setTerminalOutput([])}
                  className="text-xs text-gray-500 hover:text-gray-300"
                >
                  Clear
                </button>
              </div>
              <div className="h-64 overflow-y-auto space-y-1">
                {terminalOutput.length === 0 ? (
                  <p className="text-gray-500">$ Ready for commands...</p>
                ) : (
                  terminalOutput.map((line, idx) => (
                    <p key={idx} className={line.startsWith('[') ? 'text-green-400' : ''}>
                      {line}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        );
        
      case 'naming':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Naming Pattern Builder</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop elements to create your custom naming pattern
              </p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['<date>', '<original-name>', '<category>', '<custom-suffix>', '<number>'].map(tag => (
                    <div
                      key={tag}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium cursor-move"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[60px] flex items-center">
                  <p className="text-gray-500">Drop pattern elements here</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Preview:</p>
                  <p className="font-mono text-sm mt-1">2024-06-09_vacation_photo_family_001.jpg</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-3">Upload Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm">Notify when upload completes</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm">Notify on upload errors</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-3">Classification Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm">Notify when classification is ready for review</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm">Daily summary of classifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'account':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Account Information</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your Image Cabinet preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-12">
          <div className="col-span-3 border-r border-gray-200">
            <nav className="p-4 space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="col-span-9 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
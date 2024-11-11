import React, { useState } from 'react';
import { Upload, FolderOpen, Image, Video, FileText, Download, Trash2, Share2 } from 'lucide-react';

interface FileManagerProps {
  darkMode: boolean;
}

const FileManager: React.FC<FileManagerProps> = ({ darkMode }) => {
  const [dragActive, setDragActive] = useState(false);

  const files = [
    {
      id: 1,
      type: 'image',
      name: 'Thumbnail.jpg',
      size: '2.4 MB',
      preview: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    },
    {
      id: 2,
      type: 'video',
      name: 'Project.mp4',
      size: '345 MB',
      preview: 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
    },
    {
      id: 3,
      type: 'document',
      name: 'Script.docx',
      size: '45 KB',
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className={`space-y-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : `${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto mb-4" size={48} />
        <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
          Support for video, images, and documents
        </p>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Select Files
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {files.map((file) => (
          <div
            key={file.id}
            className={`rounded-xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            {file.preview ? (
              <div className="aspect-video relative">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                {file.type === 'video' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Video className="text-white" size={48} />
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <FileText size={48} />
              </div>
            )}
            <div className="p-4">
              <h4 className="font-semibold mb-1">{file.name}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {file.size}
              </p>
              <div className="flex justify-between mt-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                  <Download size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                  <Share2 size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileManager;
'use client';

import React, { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import Compressor from 'compressorjs';

interface FileWithProgress {
  file: File;
  progress: number;
  uploadedUrl?: string;
}

export default function Gallery() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    Array.from(fileList).forEach((file) => {
      // compress before adding
      new Compressor(file, {
        quality: 0.6, // 0–1
        maxWidth: 1920, // optional resize
        maxHeight: 1080,
        success: (compressed: File) => {
          setFiles((prev) => [
            ...prev,
            { file: compressed, progress: 0 },
          ]);
        },
        error(err) {
          console.error(err);
        },
      });
    });
  };

  const uploadFile = async (fileObj: FileWithProgress, index: number) => {
    try {
      // ask our backend for a PUT URL
      const presign = await axios.post('/api/upload-image', {
        filename: fileObj.file.name,
        type: fileObj.file.type,
      });

      const { url } = presign.data;
      console.log('here uploadURL', presign)

      // upload directly to S3
      await axios.put(url, fileObj.file, {
        headers: { 'Content-Type': fileObj.file.type },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setFiles((prev) => {
              const copy = [...prev];
              copy[index] = { ...copy[index], progress: percent };
              return copy;
            });
          }
        },
      });

      setFiles((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], progress: 100, uploadedUrl: url };
        return copy;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const startUpload = () => {
    files.forEach((file, index) => {
      if (file.progress === 0) uploadFile(file, index);
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Images (compressed)</h1>

      <div
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 p-6 mb-4 text-center rounded"
      >
        Drag & Drop images here or
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="mt-2 block"
        />
      </div>

      <button
        onClick={startUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Upload
      </button>

      <div className="mt-6 space-y-4">
        {files.map((f, i) => (
          <div key={i} className="border p-2 rounded">
            <p className="text-sm">{f.file.name}</p>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${f.progress}%` }}
              />
            </div>
            <p className="text-xs">{f.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
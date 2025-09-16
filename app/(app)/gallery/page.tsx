'use client';

import React, { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import Compressor from 'compressorjs';

interface FileWithProgress {
  file: File;
  preview: string; // added preview URL
  progress: number;
  uploadedUrl?: string;
}

export default function Gallery() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);

  /** Handle new files (drag or input) */
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    Array.from(fileList).forEach((file) => {
      // compress before adding
      new Compressor(file, {
        quality: 0.6, // 0–1
        maxWidth: 1920,
        maxHeight: 1080,
        success: (compressed: File) => {
          const preview = URL.createObjectURL(compressed); // preview URL
          setFiles((prev) => [
            ...prev,
            { file: compressed, preview, progress: 0 },
          ]);
        },
        error(err) {
          console.error(err);
        },
      });
    });
  };

  /** Delete file from list */
  const removeFile = (index: number) => {
    setFiles((prev) => {
      const copy = [...prev];
      // revoke preview URL
      URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      return copy;
    });
  };

  /** Upload single file */
  const uploadFile = async (fileObj: FileWithProgress, index: number) => {
    try {
      // ask our backend for a PUT URL
      const presign = await axios.post('/api/upload-image', {
        filename: fileObj.file.name,
        type: fileObj.file.type,
      });

      const { url } = presign.data;

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

  /** Upload all not-started files */
  const startUpload = () => {
    files.forEach((file, index) => {
      if (file.progress === 0) uploadFile(file, index);
    });
  };

  return (
    <div className="p-8 pt-0">
      <h1 className="text-2xl font-bold">Upload Images</h1>
      <h6 className="text-xl font-bold mb-4">Irawan & Cindy</h6>
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
        disabled={files.length == 0}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Upload
      </button>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((f, i) => (
          <div
            key={i}
            className="border rounded p-2 flex flex-col items-center relative"
          >
            {/* Delete button */}
            <button
              onClick={() => removeFile(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>

            {/* Preview image */}
            <img
              src={f.preview}
              alt={f.file.name}
              className="w-full h-32 object-cover rounded"
            />

            <p className="text-xs mt-1 truncate w-full">{f.file.name}</p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 rounded mt-1">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${f.progress}%` }}
              />
            </div>
            <p className="text-xs">{f.progress}%</p>

            {/* If uploaded show link */}
            {/* {f.uploadedUrl && (
              <a
                href={f.uploadedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-xs mt-1 underline"
              >
                View S3 file
              </a>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
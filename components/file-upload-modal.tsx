"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, FileText, ImageIcon, Video, File } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: File[]) => void
}

export function FileUploadModal({ isOpen, onClose, onUpload }: FileUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setSelectedFiles([...selectedFiles, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles([...selectedFiles, ...newFiles])
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  const handleSubmit = () => {
    onUpload(selectedFiles)
    onClose()
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type.split("/")[0]
    switch (fileType) {
      case "image":
        return <ImageIcon size={20} className="text-[#2563EB]" />
      case "video":
        return <Video size={20} className="text-[#2563EB]" />
      case "application":
        return <FileText size={20} className="text-[#2563EB]" />
      default:
        return <File size={20} className="text-[#2563EB]" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#0F172A] flex items-center gap-2">
            <Upload size={20} className="text-[#2563EB]" />
            Upload Files
          </h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#0F172A] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div
            className={`p-10 flex flex-col items-center justify-center bg-[#F8FAFC] border-4 border-dashed ${dragActive ? "border-[#2563EB]" : "border-[#CBD5E1]"} rounded-xl transition-all duration-300 hover:border-[#2563EB] cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] mb-6`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="bg-[#EFF6FF] rounded-full p-4 mb-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),2px_2px_5px_rgba(255,255,255,0.5)]">
              <Upload size={32} className="text-[#2563EB]" />
            </div>
            <p className="text-[#0F172A] font-medium mb-2 text-lg">Drag & Drop Files Here</p>
            <p className="text-[#64748B] text-sm mb-6">or</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
            <Button
              variant="default"
              onClick={handleUploadClick}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-6 text-base rounded-xl shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_15px_20px_-3px_rgba(37,99,235,0.4)] hover:translate-y-[-2px]"
            >
              <span className="mr-2">+</span> Browse Files
            </Button>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#0F172A] mb-4">Selected Files</h3>
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file)}
                      <div>
                        <p className="text-[#0F172A] font-medium truncate max-w-[300px]">{file.name}</p>
                        <p className="text-[#64748B] text-xs">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-[#64748B] hover:text-[#EF4444] transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#E2E8F0] flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-lg shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_15px_20px_-3px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}
          </Button>
        </div>
      </div>
    </div>
  )
}

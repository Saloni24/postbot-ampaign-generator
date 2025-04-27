"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface PostEditModalProps {
  isOpen: boolean
  onClose: () => void
  platform: "Instagram" | "LinkedIn"
  postTitle?: string
  postContent: string
  hashtags: string[]
  onSave: (data: { title?: string; content: string; hashtags: string[] }) => void
}

export function PostEditModal({
  isOpen,
  onClose,
  platform,
  postTitle,
  postContent,
  hashtags,
  onSave,
}: PostEditModalProps) {
  const [title, setTitle] = useState(postTitle || "")
  const [content, setContent] = useState(postContent)
  const [editedHashtags, setEditedHashtags] = useState<string[]>(hashtags)
  const [newHashtag, setNewHashtag] = useState("")

  if (!isOpen) return null

  const handleAddHashtag = () => {
    if (newHashtag.trim()) {
      // Ensure hashtag starts with #
      let tag = newHashtag.trim()
      if (!tag.startsWith("#")) {
        tag = "#" + tag
      }
      setEditedHashtags([...editedHashtags, tag])
      setNewHashtag("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newHashtag.trim()) {
      e.preventDefault()
      handleAddHashtag()
    }
  }

  const removeHashtag = (tagToRemove: string) => {
    setEditedHashtags(editedHashtags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    onSave({
      title: platform === "LinkedIn" ? title : undefined,
      content,
      hashtags: editedHashtags,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#0F172A]">Edit {platform} Post</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#0F172A] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {platform === "LinkedIn" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Post Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Post Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content..."
              className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300 min-h-[200px]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Add Hashtags</label>
            <div className="flex gap-2">
              <Input
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter hashtag..."
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
              <Button
                onClick={handleAddHashtag}
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg shadow-[0_5px_10px_-3px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_8px_15px_-3px_rgba(37,99,235,0.4)]"
              >
                Add
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Current Hashtags</label>
            <div className="flex flex-wrap gap-2 p-3 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC] min-h-[100px]">
              {editedHashtags.length > 0 ? (
                editedHashtags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] border border-[#BFDBFE] px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button className="ml-2 text-[#64748B] hover:text-[#0F172A]" onClick={() => removeHashtag(tag)}>
                      ×
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-[#64748B] text-sm">No hashtags added yet</p>
              )}
            </div>
          </div>
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
            onClick={handleSave}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_15px_20px_-3px_rgba(37,99,235,0.4)]"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

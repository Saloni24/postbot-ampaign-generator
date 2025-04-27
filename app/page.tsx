"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Rocket, Cloud, ImageIcon, Edit, Trash2, Instagram, Linkedin, ChevronDown, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { CampaignFormData, UploadedFile } from "@/types/campaign"
import { saveCampaignData } from "@/utils/storage"
import { FileUploadModal } from "@/components/file-upload-modal"

export default function CampaignGenerator() {
  const router = useRouter()
  // Update the uploadedFiles state to use the type
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [tags, setTags] = useState<string[]>(["Sponsors", "Universities", "Tech Leaders"])
  const [newTag, setNewTag] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "LinkedIn"])

  // Add a formData state to store all form inputs
  // Update the formData state to use the type
  const [formData, setFormData] = useState<Omit<CampaignFormData, "targetAudience">>({
    businessName: "VIA",
    businessDescription:
      "A nonprofit empowering underrepresented students to become global tech leaders through immersive experiences",
    campaignTitle: "VIA Tech Immersive Launch",
    campaignGoals: "Announce 2025 Tech Immersive and attract sponsors and partners",
    intendedImpact: "Raise awareness of VIA's mission and showcase 2025 program kickoff",
  })

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true)
  }

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false)
  }

  const handleFileUpload = (files: File[]) => {
    const newUploadedFiles = files.map((file) => {
      // Create object URLs for previews (for images only)
      let preview = "/placeholder.svg?height=100&width=100"
      if (file.type.startsWith("image/")) {
        preview = URL.createObjectURL(file)
      }
      return {
        name: file.name,
        preview,
      }
    })

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleOpenUploadModal()
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Update the handleGenerateCampaign function
  const handleGenerateCampaign = () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform")
      return
    }

    setIsGenerating(true)

    // Save all form data using the utility function
    saveCampaignData(
      {
        ...formData,
        targetAudience: tags,
      },
      selectedPlatforms,
    )

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      router.push("/generated-campaign")
    }, 2000)
  }

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      // Remove platform if already selected
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    } else {
      // Add platform if not selected
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <header className="flex justify-between items-center px-8 py-5 bg-[#1E40AF] text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Rocket size={20} className="text-white" />
          <span className="font-medium text-lg">Campaign Generator</span>
        </div>
        <div className="font-bold text-xl">
          <span className="text-[#BFDBFE]">Post</span>
          <span className="text-white">Bot</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        {/* Campaign Information */}
        <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-xl font-semibold text-[#0F172A]">Campaign Information</h2>
            <p className="text-[#64748B] mt-1">Provide details about your marketing campaign</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Business Name</label>
              <Input
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Business Description</label>
              <Input
                placeholder="Describe your business"
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Campaign Title</label>
              <Input
                placeholder="Enter campaign title"
                value={formData.campaignTitle}
                onChange={(e) => setFormData({ ...formData, campaignTitle: e.target.value })}
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Campaign Goals</label>
              <Input
                placeholder="Describe your campaign goals"
                value={formData.campaignGoals}
                onChange={(e) => setFormData({ ...formData, campaignGoals: e.target.value })}
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Target Audience</label>
              <div className="flex flex-wrap gap-2 p-3 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] border border-[#BFDBFE] px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button className="ml-2 text-[#64748B] hover:text-[#0F172A]" onClick={() => removeTag(tag)}>
                      ×
                    </button>
                  </Badge>
                ))}
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add audience tag..."
                  className="border-0 p-0 h-7 text-sm focus:ring-0 min-w-[150px] flex-grow bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Intended Impact</label>
              <Textarea
                placeholder="Describe the intended impact"
                value={formData.intendedImpact}
                onChange={(e) => setFormData({ ...formData, intendedImpact: e.target.value })}
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300 min-h-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-xl font-semibold text-[#0F172A]">Platform Selection</h2>
            <p className="text-[#64748B] mt-1">Choose where to publish your campaign (select at least one)</p>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => togglePlatform("Instagram")}
                className={`flex items-center gap-2 border-[#CBD5E1] rounded-xl py-6 px-6 transition-all duration-300 ${
                  selectedPlatforms.includes("Instagram")
                    ? "bg-[#2563EB] text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]"
                    : "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]"
                }`}
              >
                <Instagram size={20} />
                <span className="font-medium">Instagram</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => togglePlatform("LinkedIn")}
                className={`flex items-center gap-2 border-[#CBD5E1] rounded-xl py-6 px-6 transition-all duration-300 ${
                  selectedPlatforms.includes("LinkedIn")
                    ? "bg-[#2563EB] text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]"
                    : "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]"
                }`}
              >
                <Linkedin size={20} />
                <span className="font-medium">LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>

        {/* SEO Optimization Preferences */}
        <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-xl font-semibold text-[#0F172A]">SEO Optimization</h2>
            <p className="text-[#64748B] mt-1">Configure search engine optimization settings</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Tone</label>
              <div className="relative">
                <select
                  defaultValue="Friendly"
                  className="w-full border border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 appearance-none focus:outline-none focus:border-[#2563EB] text-[#0F172A] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300"
                >
                  <option>Friendly</option>
                  <option>Inspiring</option>
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#2563EB]" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="enable-seo"
                className="border-[#CBD5E1] data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB] rounded-md w-5 h-5"
                defaultChecked
              />
              <label htmlFor="enable-seo" className="text-[#0F172A] font-medium">
                Enable SEO Optimization
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="hashtags"
                className="border-[#CBD5E1] data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB] rounded-md w-5 h-5"
                defaultChecked
              />
              <label htmlFor="hashtags" className="text-[#0F172A] font-medium">
                Hashtags
              </label>
            </div>

            <Input
              placeholder="Enter the hashtags or AI will auto generate"
              defaultValue="#VIAImmersive #FutureBuilders #BuiltWithVIA #ETHGlobal #Devconnect2025"
              className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
            />
          </div>
        </div>

        {/* Lead Generation Preferences */}
        <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-xl font-semibold text-[#0F172A]">Lead Generation</h2>
            <p className="text-[#64748B] mt-1">Configure lead capture settings</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Checkbox
                id="enable-lead"
                className="border-[#CBD5E1] data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB] rounded-md w-5 h-5"
                defaultChecked
              />
              <label htmlFor="enable-lead" className="text-[#0F172A] font-medium">
                Enable lead capture
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Outreach Method</label>
              <div className="relative">
                <select
                  defaultValue="Email"
                  className="w-full border border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 appearance-none focus:outline-none focus:border-[#2563EB] text-[#0F172A] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300"
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Social Media</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#2563EB]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Outreach Message Style</label>
              <Input
                placeholder="Enter your outreach message style"
                defaultValue="Professional with a touch of enthusiasm"
                className="border-[#CBD5E1] bg-[#F8FAFC] rounded-lg py-3 px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-25 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* File Upload Area - MOVED TO BOTTOM */}
        {/* File Upload Area */}
        <div className="mb-8 rounded-xl bg-white shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-xl font-semibold text-[#0F172A] flex items-center gap-2">
              <Upload size={20} className="text-[#2563EB]" />
              Content Uploader
            </h2>
            <p className="text-[#64748B] mt-1">Upload your content to generate marketing campaigns</p>
          </div>

          <div
            className="p-10 flex flex-col items-center justify-center bg-[#F8FAFC] border-4 border-dashed border-[#CBD5E1] m-6 rounded-xl transition-all duration-300 hover:border-[#2563EB] cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleOpenUploadModal}
          >
            <div className="bg-[#EFF6FF] rounded-full p-4 mb-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),2px_2px_5px_rgba(255,255,255,0.5)]">
              <Cloud size={32} className="text-[#2563EB]" />
            </div>
            <p className="text-[#0F172A] font-medium mb-2 text-lg">Drag & Drop Files Here</p>
            <p className="text-[#64748B] text-sm mb-6">or</p>
            <Button
              variant="default"
              onClick={(e) => {
                e.stopPropagation()
                handleOpenUploadModal()
              }}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-6 text-base rounded-xl shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_15px_20px_-3px_rgba(37,99,235,0.4)] hover:translate-y-[-2px]"
            >
              <span className="mr-2">+</span> Upload Files
            </Button>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-6 mb-8">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="w-[120px] h-[120px] bg-white rounded-xl flex items-center justify-center shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden transition-all duration-300 group-hover:shadow-[12px_12px_20px_#d1d9e6,-12px_-12px_20px_#ffffff]">
                  {file.preview.startsWith("/placeholder") ? (
                    <div className="w-full h-full flex items-center justify-center bg-[#EFF6FF]">
                      <ImageIcon size={32} className="text-[#2563EB]" />
                    </div>
                  ) : (
                    <img
                      src={file.preview || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                  <span className="text-sm text-[#0F172A] font-medium truncate max-w-[80px]">{file.name}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-[#2563EB] hover:text-[#1E40AF] transition-colors">
                      <Edit size={16} />
                    </button>
                    <button
                      className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                      onClick={() => {
                        const newFiles = [...uploadedFiles]
                        newFiles.splice(index, 1)
                        setUploadedFiles(newFiles)
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Generate Campaign Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleGenerateCampaign}
            disabled={isGenerating || selectedPlatforms.length === 0}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-10 py-7 text-lg font-medium rounded-xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] transition-all duration-300 hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.7),0_0_10px_rgba(37,99,235,0.4)] hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] disabled:hover:translate-y-0"
          >
            {isGenerating ? (
              <>
                <Loader2 size={22} className="mr-3 animate-spin" />
                Generating Campaign...
              </>
            ) : (
              <>
                <span className="mr-2">⚡</span> Generate Campaign
              </>
            )}
          </Button>
        </div>

        <FileUploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} onUpload={handleFileUpload} />
      </main>
    </div>
  )
}

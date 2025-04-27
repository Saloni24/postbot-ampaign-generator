"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Rocket, Instagram, Linkedin, Edit, RefreshCw, Save, Send, Calendar, Upload, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PostEditModal } from "@/components/post-edit-modal"
import type { CampaignFormData } from "@/types/campaign"
import { getCampaignData } from "@/utils/storage"

export default function GeneratedCampaign() {
  const [isPublishing, setIsPublishing] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Instagram post state
  const [isInstagramPostModalOpen, setIsInstagramPostModalOpen] = useState(false)
  const [instagramContent, setInstagramContent] = useState(
    "🌟 Exciting news! VIA is gearing up for the 2025 Tech Immersive Launch 🚀 Are you ready to join the future builders? Let's do this together! 🔧🔥 🔹 Learn more: https://drive.google.com/via_tech_immersive_launch 🔹 Tag a friend who needs to know!",
  )
  const [instagramHashtags, setInstagramHashtags] = useState<string[]>([
    "#VIAImmersive",
    "#FutureBuilders",
    "#BuiltWithVIA",
    "#ETHGlobal",
    "#Devconnect2025",
  ])

  // LinkedIn post state
  const [isLinkedInPostModalOpen, setIsLinkedInPostModalOpen] = useState(false)
  const [linkedInTitle, setLinkedInTitle] = useState("VIA 2025 Tech Immersive Launch - Partnership Opportunity")
  const [linkedInContent, setLinkedInContent] = useState(
    "🔷 Join VIA in empowering underrepresented students to become global tech leaders through immersive experiences! Our 2025 Tech Immersive Launch is coming up. Interested in partnering with us to make a difference? Let's connect! ➡️ 🔹 Explore more: https://drive.google.com/via_tech_immersive_launch 🔹 Reach out to collaborate!",
  )
  const [linkedInHashtags, setLinkedInHashtags] = useState<string[]>([
    "#VIAImmersive",
    "#FutureBuilders",
    "#BuiltWithVIA",
    "#ETHGlobal",
    "#Devconnect2025",
  ])

  // Add campaignData state
  const [campaignData, setCampaignData] = useState<CampaignFormData>({
    businessName: "",
    businessDescription: "",
    campaignTitle: "",
    campaignGoals: "",
    targetAudience: [],
    intendedImpact: "",
  })

  // Update the useEffect
  useEffect(() => {
    // Get data using the utility function
    const { formData, platforms } = getCampaignData()

    if (platforms && platforms.length > 0) {
      setSelectedPlatforms(platforms)
    } else {
      // Default to Instagram if nothing is stored
      setSelectedPlatforms(["Instagram"])
    }

    if (formData) {
      setCampaignData(formData)
    }

    setIsLoaded(true)
  }, [])

  const handlePublish = () => {
    setIsPublishing(true)
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false)
    }, 2000)
  }

  const handleSaveInstagramPost = (data: { content: string; hashtags: string[] }) => {
    setInstagramContent(data.content)
    setInstagramHashtags(data.hashtags)
  }

  const handleSaveLinkedInPost = (data: { title?: string; content: string; hashtags: string[] }) => {
    if (data.title) {
      setLinkedInTitle(data.title)
    }
    setLinkedInContent(data.content)
    setLinkedInHashtags(data.hashtags)
  }

  // If not loaded yet, don't render anything to avoid flicker
  if (!isLoaded) {
    return null
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
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-[#64748B] mb-4">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">
            Campaign Builder
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-[#0F172A] font-medium">Generated Campaign</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Generated Campaign</h1>

        {/* Campaign Summary Card */}
        <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">{campaignData.businessName || "VIA"}</h2>
                <h3 className="text-lg font-medium text-[#2563EB]">
                  {campaignData.campaignTitle || "2025 Tech Immersive Launch"}
                </h3>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {selectedPlatforms.includes("Instagram") && (
                  <Badge className="bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] border border-[#BFDBFE] px-3 py-1 rounded-full flex items-center gap-2">
                    <Instagram size={16} />
                    <span>Instagram</span>
                  </Badge>
                )}
                {selectedPlatforms.includes("LinkedIn") && (
                  <Badge className="bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] border border-[#BFDBFE] px-3 py-1 rounded-full flex items-center gap-2">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h4 className="text-sm font-medium text-[#64748B] mb-1">Target Audience</h4>
                <p className="text-[#0F172A]">
                  {campaignData.targetAudience && campaignData.targetAudience.length > 0
                    ? campaignData.targetAudience.join(", ")
                    : "Underrepresented students, Tech enthusiasts, Future builders"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#64748B] mb-1">Campaign Goal</h4>
                <p className="text-[#0F172A]">
                  {campaignData.campaignGoals || "Promote Tech Immersive Launch and build partnerships"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#64748B] mb-1">Intended Impact</h4>
                <p className="text-[#0F172A]">
                  {campaignData.intendedImpact || "Empower students to become global tech leaders"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Post Card - Only show if Instagram is selected */}
        {selectedPlatforms.includes("Instagram") && (
          <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Instagram size={20} className="text-[#2563EB]" />
                  <h2 className="text-lg font-semibold text-[#0F172A]">Instagram Post</h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsInstagramPostModalOpen(true)}
                    className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-lg shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all duration-300 flex items-center gap-1"
                  >
                    <Edit size={14} />
                    <span>Edit Post</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-lg shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all duration-300 flex items-center gap-1"
                  >
                    <RefreshCw size={14} />
                    <span>Regenerate</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[#0F172A] mb-4 whitespace-pre-line">{instagramContent}</div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {instagramHashtags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] px-2 py-1 rounded-md"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg flex items-center justify-center min-h-[240px] overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-09%20at%207.36.55%E2%80%AFAM-j048bzHJmGVcMWH607TeJy3y96xe4x.png"
                    alt="Tech Immersive Launch - Students collaborating"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LinkedIn Post Card - Only show if LinkedIn is selected */}
        {selectedPlatforms.includes("LinkedIn") && (
          <div className="bg-white rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] overflow-hidden mb-8">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Linkedin size={20} className="text-[#2563EB]" />
                  <h2 className="text-lg font-semibold text-[#0F172A]">LinkedIn Post</h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLinkedInPostModalOpen(true)}
                    className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-lg shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all duration-300 flex items-center gap-1"
                  >
                    <Edit size={14} />
                    <span>Edit Post</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-lg shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all duration-300 flex items-center gap-1"
                  >
                    <RefreshCw size={14} />
                    <span>Regenerate</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{linkedInTitle}</h3>
                  <div className="text-[#0F172A] mb-4 whitespace-pre-line">{linkedInContent}</div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {linkedInHashtags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] px-2 py-1 rounded-md"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg flex items-center justify-center min-h-[240px] overflow-hidden">
                  <img
                    src="/linkedin-post.png"
                    alt="LinkedIn post by Ann Abraham about VIA Tech Immersive Launch"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-xl py-5 px-4 shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw size={18} />
              <span>Generate Again</span>
            </Button>
            <Button
              variant="outline"
              className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-xl py-5 px-4 shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] transition-all duration-300 flex items-center gap-2"
            >
              <Save size={18} />
              <span>Save Draft</span>
            </Button>
            <Button
              variant="outline"
              className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-xl py-5 px-4 shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] transition-all duration-300 flex items-center gap-2"
            >
              <Send size={18} />
              <span>Export for Review</span>
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB] rounded-xl py-5 px-4 shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={18} />
              <span>Schedule Later</span>
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-5 rounded-xl shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_15px_20px_-3px_rgba(37,99,235,0.4)] hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)] disabled:hover:translate-y-0 flex items-center gap-2"
            >
              <Upload size={18} />
              <span>{isPublishing ? "Publishing..." : "Publish Now"}</span>
            </Button>
          </div>
        </div>

        {/* Post Edit Modals */}
        <PostEditModal
          isOpen={isInstagramPostModalOpen}
          onClose={() => setIsInstagramPostModalOpen(false)}
          platform="Instagram"
          postContent={instagramContent}
          hashtags={instagramHashtags}
          onSave={handleSaveInstagramPost}
        />

        <PostEditModal
          isOpen={isLinkedInPostModalOpen}
          onClose={() => setIsLinkedInPostModalOpen(false)}
          platform="LinkedIn"
          postTitle={linkedInTitle}
          postContent={linkedInContent}
          hashtags={linkedInHashtags}
          onSave={handleSaveLinkedInPost}
        />
      </main>

      <footer className="text-center py-5 text-[#64748B] text-sm border-t border-[#CBD5E1] bg-white">
        © 2025 PostBot. All rights reserved.
      </footer>
    </div>
  )
}

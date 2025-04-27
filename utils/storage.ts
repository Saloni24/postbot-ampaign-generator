import type { CampaignFormData } from "@/types/campaign"

export const saveCampaignData = (data: CampaignFormData, platforms: string[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("campaignFormData", JSON.stringify(data))
    localStorage.setItem("selectedPlatforms", JSON.stringify(platforms))
  }
}

export const getCampaignData = (): { formData: CampaignFormData | null; platforms: string[] } => {
  if (typeof window === "undefined") {
    return { formData: null, platforms: [] }
  }

  const formDataStr = localStorage.getItem("campaignFormData")
  const platformsStr = localStorage.getItem("selectedPlatforms")

  return {
    formData: formDataStr ? JSON.parse(formDataStr) : null,
    platforms: platformsStr ? JSON.parse(platformsStr) : [],
  }
}

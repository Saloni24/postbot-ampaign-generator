export interface CampaignFormData {
  businessName: string
  businessDescription: string
  campaignTitle: string
  campaignGoals: string
  targetAudience: string[]
  intendedImpact: string
}

export interface UploadedFile {
  name: string
  preview: string
}

export interface Hashtag {
  text: string
  platform: string
}

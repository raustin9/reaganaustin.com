import type { ProjectTag } from "./Projects"

export interface Experience {
    name: string
    role: string
    description: string
    location: string
    startDate: Date
    endDate?: Date
    logoUrl: string
    outUrl?: string
    tags: ProjectTag[]
}
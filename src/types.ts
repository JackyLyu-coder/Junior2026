export type EventLevel = 'national' | 'asian' | 'international' | 'club'
export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'tbd'

export interface SquashEvent {
  id: string
  name: string
  nameEn: string
  level: EventLevel
  location: string
  startDate: string | null
  endDate: string | null
  registrationDeadline: string | null
  description: string
  organizer: string
  website: string
  imageUrl?: string
}

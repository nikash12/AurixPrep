// types/index.ts

export interface User {
  id: string
  username: string
  email: string
}

export interface Question {
  id: string
  sessionId: string
  ttsAudioUrl?: string
  text: string
  answer?: string
  startTime?: number
  endTime?: number
}

export interface Session {
  id: string
  userId: string
  mode?: string
  language: string
  title?: string
  startedAt: Date
  endedAt?: Date
  description?: string
  questions: Question[]
}
// app/profile/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserInfoCard } from '@/components/profile/UserInfoCard'
import { SessionsSection } from '@/components/profile/SessionsSection'
import type { User, Session } from '@/types'

// Mock data - replace with actual API calls
const mockUser: User = {
  email: "nik@gmail.com",
  id: "cab70ff9-dd06-4a7b-82d9-8fdc20ae6aaf",
  username: "nik"
}

const mockSessions: Session[] = [
  {
    id: "session-1",
    userId: "cab70ff9-dd06-4a7b-82d9-8fdc20ae6aaf",
    mode: "interview",
    language: "en-US",
    title: "Technical Interview Practice",
    startedAt: new Date('2024-08-28T10:00:00Z'),
    endedAt: new Date('2024-08-28T11:30:00Z'),
    description: "Frontend development interview preparation",
    questions: [
      {
        id: "q1",
        sessionId: "session-1",
        text: "Explain the difference between let, const, and var in JavaScript",
        answer: "Let and const are block-scoped while var is function-scoped. Const cannot be reassigned while let can be. Var has function scope and can be redeclared.",
        startTime: 0,
        endTime: 120
      },
      {
        id: "q2",
        sessionId: "session-1",
        text: "What is the virtual DOM and how does it work?",
        answer: "The virtual DOM is a programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM through a process called reconciliation.",
        startTime: 130,
        endTime: 280
      }
    ]
  },
  {
    id: "session-2",
    userId: "cab70ff9-dd06-4a7b-82d9-8fdc20ae6aaf",
    mode: "practice",
    language: "en-US",
    title: "Algorithm Practice Session",
    startedAt: new Date('2024-08-29T14:00:00Z'),
    endedAt: new Date('2024-08-29T15:45:00Z'),
    description: "Data structures and algorithms practice",
    questions: [
      {
        id: "q3",
        sessionId: "session-2",
        text: "Implement a binary search algorithm",
        answer: "Binary search works by repeatedly dividing the search interval in half. Here's a recursive implementation...",
        startTime: 0,
        endTime: 300
      }
    ]
  },
  {
    id: "session-3",
    userId: "cab70ff9-dd06-4a7b-82d9-8fdc20ae6aaf",
    language: "en-US",
    title: "Quick Practice Round",
    startedAt: new Date('2024-08-30T09:00:00Z'),
    description: "Short coding challenges",
    questions: [
      {
        id: "q4",
        sessionId: "session-3",
        text: "Write a function to reverse a string",
        startTime: 0
      }
    ]
  }
]

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        // const userResponse = await fetch('/api/user/profile')
        // const userResult = await userResponse.json()
        // const sessionsResponse = await fetch('/api/user/sessions')
        // const sessionsResult = await sessionsResponse.json()
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setUser(mockUser)
        setSessions(mockSessions)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">User not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and view your session history
        </p>
      </div>

      {/* User Information Section */}
      <UserInfoCard user={user} />

      <Separator />

      {/* Sessions Section */}
      <SessionsSection sessions={sessions} />
    </div>
  )
}
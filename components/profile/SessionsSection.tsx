// components/SessionsSection.tsx

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'
import { SessionCard } from './SessionCard'
import { SessionDetailModal } from './SessionDetailModal'
import type { Session } from '@/types'

interface SessionsSectionProps {
  sessions: Session[]
}

export const SessionsSection: React.FC<SessionsSectionProps> = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (session: Session) => {
    setSelectedSession(session)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSession(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sessions</h2>
          <p className="text-muted-foreground">
            Your practice and interview sessions
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {sessions.length} total sessions
        </Badge>
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
            <p className="text-muted-foreground">
              Start your first practice session to see it here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      <SessionDetailModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
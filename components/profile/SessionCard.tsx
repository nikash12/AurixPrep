// components/SessionCard.tsx

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Globe,
  ChevronRight,
  Activity
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Session } from '@/types'

interface SessionCardProps {
  session: Session
  onViewDetails: (session: Session) => void
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onViewDetails }) => {
  const getSessionStats = (session: Session) => {
    const duration = session.endedAt 
      ? Math.round((session.endedAt.getTime() - session.startedAt.getTime()) / 60000)
      : null
    const questionsCount = session.questions.length
    const answeredCount = session.questions.filter(q => q.answer).length
    
    return { duration, questionsCount, answeredCount }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const stats = getSessionStats(session)
  const isActive = !session.endedAt

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">
                {session.title || 'Untitled Session'}
              </h3>
              {isActive && (
                <Badge variant="default" className="bg-green-500">
                  <Activity className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              )}
              {session.mode && (
                <Badge variant="outline" className="capitalize">
                  {session.mode}
                </Badge>
              )}
            </div>
            
            {session.description && (
              <p className="text-muted-foreground">{session.description}</p>
            )}
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDistanceToNow(session.startedAt, { addSuffix: true })}
              </div>
              
              {stats.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDuration(stats.duration)}
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {stats.answeredCount}/{stats.questionsCount} questions
              </div>
              
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {session.language}
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(session)}
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
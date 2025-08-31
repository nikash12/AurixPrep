// components/SessionDetailModal.tsx

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MessageSquare, 
  Play, 
  Clock,
  CheckCircle
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDistanceToNow } from 'date-fns'
import type { Session } from '@/types'

interface SessionDetailModalProps {
  session: Session | null
  isOpen: boolean
  onClose: () => void
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({ 
  session, 
  isOpen, 
  onClose 
}) => {
  if (!session) return null

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {session.title || 'Session Details'}
            {isActive && (
              <Badge variant="default" className="bg-green-500">
                Active
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Started {formatDistanceToNow(session.startedAt, { addSuffix: true })}
            {stats.duration && ` • Duration: ${formatDuration(stats.duration)}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Session Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Mode</label>
              <p className="capitalize">{session.mode || 'Standard'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Language</label>
              <p>{session.language}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Questions</label>
              <p>{stats.questionsCount}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Completed</label>
              <p>{stats.answeredCount}/{stats.questionsCount}</p>
            </div>
          </div>

          {session.description && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="mt-1">{session.description}</p>
            </div>
          )}

          <Separator />

          {/* Questions */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Questions ({session.questions.length})
            </h4>
            
            {session.questions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No questions in this session yet
              </p>
            ) : (
              <div className="space-y-4">
                {session.questions.map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                Q{index + 1}
                              </Badge>
                              {question.startTime !== undefined && question.endTime !== undefined && (
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {Math.round(question.endTime - question.startTime)}s
                                </Badge>
                              )}
                              {question.ttsAudioUrl && (
                                <Badge variant="secondary" className="text-xs">
                                  <Play className="h-3 w-3 mr-1" />
                                  Audio
                                </Badge>
                              )}
                              {question.answer && (
                                <Badge variant="default" className="text-xs bg-green-500">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Answered
                                </Badge>
                              )}
                            </div>
                            <p className="font-medium mb-2">{question.text}</p>
                            {question.answer ? (
                              <div className="bg-muted p-3 rounded-md">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Answer:</p>
                                <p className="text-sm">{question.answer}</p>
                              </div>
                            ) : (
                              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                  No answer provided yet
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
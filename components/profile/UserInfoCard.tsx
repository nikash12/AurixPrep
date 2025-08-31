// components/UserInfoCard.tsx

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import type { User as UserType } from '@/types'

interface UserInfoCardProps {
  user: UserType
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Information
        </CardTitle>
        <CardDescription>
          Your account details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Username</label>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="font-mono text-sm text-muted-foreground">{user.id}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
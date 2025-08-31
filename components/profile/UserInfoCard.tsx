// components/UserInfoCard.tsx
"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import type { User as UserType } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UserInfoCardProps {
  user: UserType
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  const [logoutPopUp, setLogoutPopUp] = React.useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully")
    router.push("/auth/login")
  }

  return (
    <Card>
      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutPopUp} onOpenChange={setLogoutPopUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutPopUp(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Info */}
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

      {/* Logout Button */}
      <div className="p-4">
        <Button variant="outline" onClick={() => setLogoutPopUp(true)}>
          Log Out
          <LogOut className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

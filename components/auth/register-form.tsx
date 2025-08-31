"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from 'sonner'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const navigate = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")
        console.log({ username, email, password, confirmPassword });

        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }
        try{
            const user = await axios.post("/api/user/register", {
                username,
                email,
                password
            })
            console.log(user)
            toast("Registration successful")
            navigate.push('/auth/login')
        }catch (error) {
            toast("Registration failed")
            console.error(error)
        }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" placeholder="username" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" name="confirmPassword" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                
              </div>
            </div>
            <div className="mt-4 text-center text-sm" >
              Already have an account?{" "}
              <a onClick={() => navigate.push('/auth/login')} className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
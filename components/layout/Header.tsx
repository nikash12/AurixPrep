// src/components/layout/Header.tsx
"use client"
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mic } from 'lucide-react';
import { useRouter } from "next/navigation";
import { ModeToggle } from '../utils/ModeToggle';
import Link from "next/link"
import axios from 'axios';
import { CircleUserRound } from 'lucide-react';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<{ id: string; username: string, email: string } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/me",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const router = useRouter();
  return (
    <header className="border-b backdrop-blur-md sticky top-0 z-50 ">
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            
            <span className="text-2xl font-bold text-black dark:text-amber-50">
              AurixPrep
            </span>
          </div>
          
          {/* Navigation */}
          

          {/* Auth Buttons */}
          
          {!isLoggedIn ? (<div className="flex items-center space-x-4">
            <ModeToggle />
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Button className="rounded-full" onClick={() => router.push("/interview")}>
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>) : (
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <p>{user?.username}</p>
              <Link href="/profile" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <CircleUserRound className="ml-1 size-8" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
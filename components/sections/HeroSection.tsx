// src/components/sections/HeroSection.tsx
"use client"
import React, { use, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, Star, Users, Trophy, Zap } from 'lucide-react';
import { useRouter } from "next/navigation";
import { GradientText } from '../animate-ui/text/gradient';
import { TypingText } from '../animate-ui/text/typing';

const languages = ["English", "日本人","हिन्दी","தமிழ்","Español","Français","Deutsch","Italiano","Português","Русский"];

const HeroSection = () => {
  const router = useRouter();
  const [language, setLanguage] = useState(languages[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage((prev) => {
        const currentIndex = languages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-20 px-4 ">
      <div className="container mx-auto text-center">
        {/* Badge */}

        
        {/* Main Heading */}
        <GradientText text="Master Your" className="text-5xl md:text-7xl font-bold  bg-clip-text text-transparent" />
        <br />
        <GradientText text="Interviews" className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent" />
        {/* Subtitle */}
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed dark:text-amber-50">
          Practice interviews with AI-powered feedback, voice interaction, 
          and personalized questions tailored to your dream job.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className=" text-lg px-8 py-3"
            onClick={() => router.push("/interview")}
          >
            <Play className="mr-2 h-5 w-5" />
            Start Practicing
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-3 border-slate-300 hover:bg-slate-50"
          >
            Watch Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 text-slate-500 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>10k+ users</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-1" />
            <span>85% success rate</span>
          </div>

        </div>
        <div className='m-4'>
          <label className="text-slate-500 text-[15px]">Available in:   </label>
        </div>
          <div className='p-2 m-auto relative w-[50%]  h-[5vh] font-bold text-2xl'>
            <TypingText text={" ' "+language+" ' "} className='inline-block ml-1' />
          </div>
        {/* Hero Image with Gradient Fade */}
        <div className="relative w-[70vw] m-auto mt-15">
          {/* Gradient background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-3xl opacity-30" />
          
          {/* Actual Image */}
          <img 
            src="/heroSection-light.png" 
            alt="Hero Image" 
            className="relative w-full rounded-2xl z-10"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
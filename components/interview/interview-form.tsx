"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SessionDetails {
  id: string;
  title: string;
  jobDescription: string;
  interviewMode: "interview" | "mock" | "";
  language: "English" | "Tamil" | "Hindi" | "Japanese" |"Bengali" | "Italian" | "Spanish" | "French";
  resume?: File | null;
}

export function SessionDetailsForm() {
  const router = useRouter();

  const [sessionDetails, setSessionDetails] = React.useState<SessionDetails>({
    id: "43102ecd-04af-46cb-8d1c-e1eb4a1f26c1", // 🔹 static user ID for now
    title: "",
    jobDescription: "",
    interviewMode: "",
    language: "English",
    resume: null
  });

  const [fileName, setFileName] = React.useState("No file chosen");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setSessionDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: "interviewMode" | "language", value: any) => {
    setSessionDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSessionDetails((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
    } else {
      setSessionDetails((prev) => ({ ...prev, resume: null }));
      setFileName("No file chosen");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/interview/create", sessionDetails);
      router.push(`/interview/${response.data.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create a New Interview Session</CardTitle>
          <CardDescription>
            Fill in the details below to start your personalized AI-powered interview.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Senior Frontend Developer"
                value={sessionDetails.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                className="min-h-[150px]"
                value={sessionDetails.jobDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interview Mode */}
              <div className="space-y-2">
                <Label>Interview Mode</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("interviewMode", value as "interview" | "mock")
                  }
                  value={sessionDetails.interviewMode}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="mock">Mock Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(
                      "language",
                      value as "English" | "Tamil" | "Hindi" | "Japanese" | "Bengali" | "Italian" | "Spanish" | "French"
                    )
                  }
                  value={sessionDetails.language}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume">Attach Resume (PDF)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="resume"
                  className="flex-grow h-10 flex items-center rounded-md border border-input bg-background px-3 text-sm text-gray-500 cursor-pointer"
                >
                  {fileName}
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("resume")?.click()}
                >
                  Browse
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Start Session
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

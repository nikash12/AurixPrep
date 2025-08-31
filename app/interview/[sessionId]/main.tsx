"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionSection from "./questionSection";
import RecorderUtil from "@/components/utils/RecorderUtil";
import InterviewInstructions from "@/components/utils/InterviewPopUp";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EndSessionButton from "@/components/utils/EndSessions";
import InfoSection from "./infoSection";

type InterviewQuestion = {
  id: string;
  sessionId: string;
  text: string;
  ttsAudioUrl?: string;
};

export default function MainPage({ sessionId }: { sessionId: string }) {
  const [currIndex, setCurrIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [endSessionPopup, setEndSessionPopup] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    axios.get(`/api/interview/${sessionId}`).then((res) => {
      setQuestions(res.data.questions);

      localStorage.setItem("questions", JSON.stringify(res.data.questions));
    });
  }, [sessionId]);

  const playQuestionAudio = async (index: number) => {
    if (manualMode) return;
    const question = questions[index];
    if (!question) return;

    audioRef.current?.pause();
    audioRef.current = null;

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    const cached =
      localStorage.getItem(`audio-${question.id}`) ||
      questions[currIndex].ttsAudioUrl;

    try {
      let url = cached;
      if (!cached) {
        const res = await axios.post("/api/tts", { text: question.text, sessionId });
        url = res.data.audioFile;
        localStorage.setItem(`audio-${question.id}`, url || "");
      }

      if (url) {
        audioRef.current = new Audio(url);
        setAudioUrl(url);

        audioRef.current.play().catch((err) =>
          console.error("Play error:", err)
        );
        videoRef.current?.play();

        // When audio ends → stop & reset video
        audioRef.current.onended = () => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        };
      }
    } catch (err: any) {
      console.error("TTS error:", err.response?.data || err.message);
    }
  };

  const handleStartInterview = () => {
    setShowPopup(false);
    playQuestionAudio(currIndex);
  };

  const goNext = () => {
    if (currIndex < questions.length - 1) {
      setCurrIndex(currIndex + 1);
      playQuestionAudio(currIndex + 1);
    }
  };

  const goPrev = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
      playQuestionAudio(currIndex - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrIndex(index);
    playQuestionAudio(index);
  };

  return (
    <main>
      {showPopup && <InterviewInstructions onStart={handleStartInterview} />}

      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border md:min-w-[100vw] min-h-[100vh]"
      >
        {/* Left panel → Interviewer video */}
        <ResizablePanel defaultSize={20} minSize={20} maxSize={40}>
          <div className="h-[50%]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              disablePictureInPicture
              controls={false}
            >
              <source src="/interviewer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="h-[50%] p-4 border-t flex flex-col justify-between">
            <InfoSection sessionId={sessionId} />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Middle + Right panels */}
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
              <QuestionSection
                text={questions[currIndex]?.text || ""}
                index={currIndex}
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel className="p-6 flex flex-col gap-6 flex-1 min-h-0">
              {/* scrollable content */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-6">
                {/* 🎤 Answer Section */}
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-semibold">Your Answer</h3>
                  <RecorderUtil questionId={questions[currIndex]?.id || "q1"} />
                </div>

                {/* 🎧 Mode Toggle */}
                <div className="text-center">
                  <Button
                    variant={manualMode ? "default" : "outline"}
                    onClick={() => setManualMode(!manualMode)}
                    className={
                      !manualMode
                        ? "w-[50%] dark:bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                        : "w-[50%]"
                    }
                  >
                    {manualMode ? "Manual Mode (You control)" : "Listen Mode (AI asks)"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Switch between listening to AI or manually reading the questions.
                  </p>
                </div>

                {/* 🔀 Navigation */}
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex gap-3">
                    <Button onClick={goPrev} disabled={currIndex === 0}>
                      Previous
                    </Button>
                    <Button
                      onClick={goNext}
                      disabled={currIndex === questions.length - 1}
                    >
                      Next
                    </Button>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">View All Questions</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>All Questions</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 flex flex-col gap-2">
                        {questions.map((q, idx) => (
                          <Button
                            key={q.id}
                            variant={idx === currIndex ? "default" : "outline"}
                            onClick={() => jumpToQuestion(idx)}
                            className="mx-3"
                          >
                            Q{idx + 1}
                          </Button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                  </div>
                </div>
              </div>

            </ResizablePanel>


          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

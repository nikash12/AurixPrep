"use client";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface RecorderUtilProps {
  questionId: string;
}

export default function RecorderUtil({ questionId }: RecorderUtilProps) {
  const { startRecording, stopRecording, isRecording, audioBlob, setAudioBlob } =
    useAudioRecorder();

  const [info, setInfo] = useState<{ id: string; transcript: string } | null>(null);
  const [transcriptStatus, setTranscriptStatus] = useState(false);

  // ✅ Load from localStorage only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(questionId);
      if (stored) {
        setInfo(JSON.parse(stored));
      } else {
        setInfo({ id: questionId, transcript: "" });
      }
    }
  }, [questionId]);

  // ✅ Save to localStorage whenever info changes
  useEffect(() => {
    if (info) {
      localStorage.setItem(questionId, JSON.stringify(info));
    }
  }, [info, questionId]);

  const handleUpload = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    setTranscriptStatus(true);
    const res = await fetch(
      `https://deepgram.g-nikash13579.workers.dev/speech-to-text`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    const newInfo = {
      id: questionId,
      transcript:
        data.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
        "No transcript",
    };

    setInfo(newInfo);
    setTranscriptStatus(false);
  };

  useEffect(() => {
    if (audioBlob) {
      handleUpload();
    }
  }, [audioBlob]);

  return (
    <div className=" relative grid gap-6 p-6 rounded-xl shadow-md max-w-md mx-auto mt-10 place-items-center   ">
      {isRecording && <div className="absolute top-0.5">Listening</div>}
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="icon"
        onClick={() => {
          if (isRecording) {
            stopRecording();
            handleUpload();
          } else {
            startRecording();
          }
        }}
        className="w-16 h-16 rounded-full "
      >
        {isRecording ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>

      {transcriptStatus ? (
        <div>
          <Skeleton className="h-[3vh] w-[200px] m-1" />
          <Skeleton className="h-[3vh] w-[100px] m-1" />
          <Skeleton className="h-[3vh] w-[150px] m-1" />
        </div>
      ) : (
        <>
          {info == null ||info.transcript == "" ? (
            <h1 className="h-[8vh] overflow-auto">Your Answer appears here</h1>
          ) : (
            <h1 className="h-[8vh] overflow-auto">{info?.transcript}</h1>
          )}
        </>
      )}
  
      
    </div>
  );
}

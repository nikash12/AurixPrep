"use client";
import EndSessionButton from "@/components/utils/EndSessions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InfoSection({ sessionId }: { sessionId: string }) {
  const [title, setTitle] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const info = await axios.get(`/api/interview/${sessionId}/info`);
      setTitle(info.data.title || null);
      setLanguage(info.data.language || null);

      // Format the date nicely
      if (info.data.startedAt) {
        const date = new Date(info.data.startedAt);
        setStartedAt(date.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }));
      }
    };
    fetchData();
  }, [sessionId]);

  return (
    <div className="flex h-full flex-col justify-around border rounded p-4 bg-secondary/50">
      <div className="gap-2 mb-4">
        <h1><span className="font-bold">Title :</span> {title || "Waiting..."}</h1>
        <h1><span className="font-bold">Language :</span> {language || "Waiting..."}</h1>
        <h1><span className="font-bold">Started At :</span> {startedAt || "Waiting..."}</h1>
        <p className="text-sm text-white/80">Details about the interview process will go here.</p>
      </div>
      <div>
        <EndSessionButton sessionId={sessionId} />
      </div>
    </div>

  );
}

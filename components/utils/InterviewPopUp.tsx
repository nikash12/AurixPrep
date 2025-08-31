"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function InterviewInstructions({
  onStart,
}: {
  onStart: () => void;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true); // Auto-open on load
  }, []);

  const handleStart = () => {
    setOpen(false);
    onStart(); // trigger callback (e.g., start audio)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Interview Instructions
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Before starting your interview, please note:
          </DialogDescription>
        </DialogHeader>

        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-amber-50">
          <li>Each question will be read aloud and shown on screen.</li>
          <li>
            You can use <b>Next</b> / <b>Previous</b> buttons to move between
            questions.
          </li>
          <li>
            If you don’t want to listen to the audio, you can simply read the
            question text.
          </li>
          <li>Once you press Start, the timer will begin.</li>
        </ul>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleStart}>Start Interview</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

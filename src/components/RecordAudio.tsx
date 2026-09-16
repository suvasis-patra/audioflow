import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { useRef, useState } from "react";

type TMicrophoneStatus = "connected" | "disconnected" | "connecting" | "denied";

const RecordAudio = () => {
  const mediaRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const [microphone, setMicrophone] =
    useState<TMicrophoneStatus>("disconnected");

  async function handleRecording() {
    setMicrophone("connecting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRef.current = stream;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      sourceNodeRef.current = source;
      setMicrophone("connected");
      console.log(stream);
    } catch (error) {
      console.log(error);
      setMicrophone("denied");
    }
  }

  function stopRecording() {
    mediaRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    sourceNodeRef.current?.disconnect();
    audioCtxRef.current?.close();
    mediaRef.current = null;
    audioCtxRef.current = null;
    sourceNodeRef.current = null;
    setMicrophone("disconnected");
  }

  return (
    <div className="flex min-h-100 items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
            <div
              className={cn(
                "h-5 w-5 rounded-full bg-cyan-500",
                `${microphone === "connected" ? "animate-pulse" : ""}`,
              )}
            />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">
            Audio Recorder
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Connect your microphone to start recording
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-cyan-500 hover:bg-cyan-600"
            onClick={handleRecording}
            disabled={microphone === "connected"}
          >
            Start Recording
          </Button>

          <Button
            className="flex-1"
            variant="outline"
            onClick={stopRecording}
            disabled={microphone === "disconnected"}
          >
            Stop
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border bg-muted/30 px-4 py-3">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              microphone === "connected"
                ? "bg-green-500"
                : microphone === "connecting"
                  ? "bg-yellow-500"
                  : microphone === "denied"
                    ? "bg-red-500"
                    : "bg-muted-foreground"
            }`}
          />

          <p className="text-sm font-medium">
            {microphone === "connected"
              ? "Connected"
              : microphone === "connecting"
                ? "Connecting"
                : microphone === "denied"
                  ? "Denied"
                  : "Disconnected"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordAudio;

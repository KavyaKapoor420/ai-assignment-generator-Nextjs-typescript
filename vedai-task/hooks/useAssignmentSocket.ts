"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5000";

export type GenerationSocketState = {
  progress: number;
  message: string;
  status: string;
  error: string | null;
  completed: boolean;
  failed: boolean;
};

const initialState: GenerationSocketState = {
  progress: 0,
  message: "",
  status: "idle",
  error: null,
  completed: false,
  failed: false,
};

export function useAssignmentSocket(assignmentId: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<GenerationSocketState>(initialState);

  const reset = useCallback(() => setState(initialState), []);

  useEffect(() => {
    if (!assignmentId) return;

    const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    socket.emit("join_assignment", assignmentId);

    socket.on("generation_started", (payload: { message?: string }) => {
      setState((s) => ({
        ...s,
        status: "generating",
        message: payload.message ?? "Started",
        progress: Math.max(s.progress, 5),
      }));
    });

    socket.on(
      "generation_progress",
      (payload: { progress?: number; message?: string; status?: string }) => {
        setState((s) => ({
          ...s,
          status: payload.status ?? s.status,
          progress: payload.progress ?? s.progress,
          message: payload.message ?? s.message,
        }));
      },
    );

    socket.on("generation_completed", () => {
      setState((s) => ({
        ...s,
        status: "completed",
        progress: 100,
        message: "Generation complete",
        completed: true,
      }));
    });

    socket.on("generation_failed", (payload: { error?: string }) => {
      setState((s) => ({
        ...s,
        status: "failed",
        failed: true,
        error: payload.error ?? "Generation failed",
      }));
    });

    return () => {
      socket.emit("leave_assignment", assignmentId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [assignmentId]);

  return { ...state, reset };
}

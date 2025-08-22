import { useState, useRef, useCallback } from 'react';
import { RecorderStatus } from '../types';

export const useRecorder = () => {
  const [status, setStatus] = useState<RecorderStatus>(RecorderStatus.IDLE);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setStatus(RecorderStatus.STOPPED);
        // Clean up stream tracks
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setStatus(RecorderStatus.ERROR);
      };

      mediaRecorderRef.current.start();
      setStatus(RecorderStatus.RECORDING);
    } catch (err) {
      if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
        console.error("Microphone permission was denied by the user.");
      } else if (err instanceof DOMException && err.name === 'NotFoundError') {
        console.error("No microphone device was found.");
      } else {
        console.error("Error accessing microphone:", err);
      }
      setStatus(RecorderStatus.ERROR);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && status === RecorderStatus.RECORDING) {
      mediaRecorderRef.current.stop();
    }
  }, [status]);

  const resetRecording = useCallback(() => {
    setAudioURL(null);
    setStatus(RecorderStatus.IDLE);
    audioChunksRef.current = [];
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
    }
  }, []);

  return { status, audioURL, startRecording, stopRecording, resetRecording };
};
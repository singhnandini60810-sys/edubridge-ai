import { useRef, useState } from "react";
import { getSpeechCode } from "../config/languages";

type SpeechRecognitionEvent = {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEvent = {
  error: string;
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionInstance;

type BrowserWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type UseSpeechRecognitionOptions = {
  languageCode: string;
  onResult: (transcript: string) => void;
};

export const useSpeechRecognition = ({
  languageCode,
  onResult,
}: UseSpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState("");

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const startListening = () => {
    const browserWindow = window as BrowserWindow;

    const RecognitionConstructor =
      browserWindow.SpeechRecognition ||
      browserWindow.webkitSpeechRecognition;

    if (!RecognitionConstructor) {
      setSpeechError(
        "Speech recognition is not supported in this browser. Please use Google Chrome.",
      );
      return;
    }

    if (isListening) {
      return;
    }

    const recognition = new RecognitionConstructor();

    recognition.lang = getSpeechCode(languageCode);
    recognition.interimResults = false;
    recognition.continuous = false;

    recognitionRef.current = recognition;

    setSpeechError("");
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript =
        event.results[0]?.[0]?.transcript?.trim();

      if (transcript) {
        onResult(transcript);
      } else {
        setSpeechError(
          "No speech was detected. Please try again.",
        );
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setSpeechError(
          "Microphone permission is blocked. Allow microphone access from the browser address bar.",
        );
      } else if (event.error === "no-speech") {
        setSpeechError(
          "No voice was detected. Click the microphone and speak clearly.",
        );
      } else if (event.error === "audio-capture") {
        setSpeechError(
          "No microphone was detected. Check your device microphone settings.",
        );
      } else if (event.error === "network") {
        setSpeechError(
          "Speech recognition requires an internet connection.",
        );
      } else {
        setSpeechError(
          `Speech recognition error: ${event.error}`,
        );
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setSpeechError(
        "Could not start speech recognition. Please try again.",
      );
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const cancelListening = () => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setIsListening(false);
  };

  const clearSpeechError = () => {
    setSpeechError("");
  };

  return {
    isListening,
    speechError,
    startListening,
    stopListening,
    cancelListening,
    clearSpeechError,
  };
};
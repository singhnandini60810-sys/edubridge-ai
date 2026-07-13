import { useState } from "react";
import { getSpeechCode } from "../config/languages";

type SpeakOptions = {
  text: string;
  languageCode: string;
};

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");

  const speak = ({ text, languageCode }: SpeakOptions) => {
    if (!text.trim()) {
      setSpeechError("Nothing to speak.");
      return;
    }

    if (!("speechSynthesis" in window)) {
      setSpeechError(
        "Speech synthesis is not supported in this browser."
      );
      return;
    }

    setSpeechError("");

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = getSpeechCode(languageCode);

    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice = voices.find((voice) => {
      const lang = voice.lang.toLowerCase();

      return (
        lang === getSpeechCode(languageCode).toLowerCase() ||
        lang.startsWith(languageCode.toLowerCase())
      );
    });

    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);

      setSpeechError(
        `Speech voice unavailable for ${languageCode}.`
      );
    };

    window.speechSynthesis.speak(speech);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const clearSpeechError = () => {
    setSpeechError("");
  };

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    speechError,
    clearSpeechError,
  };
};
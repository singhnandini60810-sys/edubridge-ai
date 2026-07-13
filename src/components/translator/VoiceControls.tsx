import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

type VoiceControlsProps = {
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onSpeak: () => void;
  onStopSpeaking: () => void;
};

const VoiceControls = ({
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onSpeak,
  onStopSpeaking,
}: VoiceControlsProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {isListening ? (
        <button
          type="button"
          onClick={onStopListening}
          className="flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
        >
          <MicOff size={18} />
          Stop Listening
        </button>
      ) : (
        <button
          type="button"
          onClick={onStartListening}
          className="flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 font-semibold text-sky-700 transition hover:bg-sky-100"
        >
          <Mic size={18} />
          Use Microphone
        </button>
      )}

      {isSpeaking ? (
        <button
          type="button"
          onClick={onStopSpeaking}
          className="flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          <VolumeX size={18} />
          Stop Audio
        </button>
      ) : (
        <button
          type="button"
          onClick={onSpeak}
          className="flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          <Volume2 size={18} />
          Listen
        </button>
      )}
    </div>
  );
};

export default VoiceControls;
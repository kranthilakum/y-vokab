import React, { useState, useCallback } from "react";
import Button from '@mui/material/Button';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';

interface ReadAloudProps {
  text: string;
  enabled: boolean;
}

const ReadAloud: React.FC<ReadAloudProps> = ({ text, enabled }) => {
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Initialize SpeechSynthesis instance
  useState(() => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      setSpeechSynthesis(synthesis);
    }
  });

  const handleReadAloud = useCallback(() => {
    if (enabled && speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Set the language to American English
      utterance.rate = 0.7; // Set a default speed rate
      speechSynthesis.speak(utterance);
    }
  }, [enabled, text, speechSynthesis]);

  return (
    <Button variant="text"
      sx={{ borderRadius: 8 }}
      onClick={handleReadAloud}
      disabled={!enabled || !speechSynthesis}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${!enabled || !speechSynthesis ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <VolumeUpOutlinedIcon />
    </Button>
  );
};

export default ReadAloud;

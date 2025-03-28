import React, { createContext, useContext, useRef, useState } from 'react';

interface SoundContextType {
  playSound: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType>({} as SoundContextType);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const playSound = () => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleSound = () => setIsSoundEnabled(!isSoundEnabled);

  return (
    <SoundContext.Provider value={{ playSound, isSoundEnabled, toggleSound }}>
      {children}
      <audio ref={audioRef}>
        <source src="/sounds/tap.mp3" type="audio/mpeg" />
      </audio>
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
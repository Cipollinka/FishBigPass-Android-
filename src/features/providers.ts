import {createContext, useContext} from 'react';

interface MusicControlContextProps {
  setVolumeLevel: (value: number) => void;
  raiseVolume: () => void;
  lowerVolume: () => void;
  currentVolume: number;
}

export const MusicControlContext = createContext<
  MusicControlContextProps | undefined
>(undefined);

export const useMusicControls = () => {
  const musicContext = useContext(MusicControlContext);

  if (!musicContext) {
    throw new Error('useMusicControls must be used within a MusicProvider');
  }

  return musicContext;
};

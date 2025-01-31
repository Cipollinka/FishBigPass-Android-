import {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {AppState} from 'react-native';

export const useMusicController = () => {
  const [musicInstance, setMusicInstance] = useState<Sound | null>(null);
  const [currentVolume, adjustVolume] = useState(1);

  useEffect(() => {
    Sound.setCategory('Playback');
    const musicTrack = new Sound(
      'backgroundmusic.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.error('Error loading sound:', error);
          return;
        }

        musicTrack.play();
        musicTrack.setNumberOfLoops(-1);
        setMusicInstance(musicTrack);
      },
    );

    const handleAppStateChange = (appStateStatus: string) => {
      if (appStateStatus === 'background') {
        musicTrack.pause();
      } else if (appStateStatus === 'active') {
        musicTrack.play();
      }
    };

    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateListener.remove();
      musicTrack.release();
    };
  }, []);

  const modifyVolume = (level: number) => {
    adjustVolume(previous => {
      if (!musicInstance || level > 1) {
        return previous;
      }
      musicInstance.setVolume(level);
      return level;
    });
  };

  const incrementVolume = () => {
    adjustVolume(previous => {
      if (!musicInstance) {
        return previous;
      }
      const updatedVolume = Math.min(previous + 0.1, 1.0);
      musicInstance.setVolume(updatedVolume);
      return updatedVolume;
    });
  };

  const decrementVolume = () => {
    if (!musicInstance) {
      return;
    }
    adjustVolume(previous => {
      const updatedVolume = Math.max(previous - 0.1, 0.0);
      musicInstance.setVolume(updatedVolume);
      return updatedVolume;
    });
  };

  return {
    modifyVolume,
    incrementVolume,
    decrementVolume,
    currentVolume,
  };
};

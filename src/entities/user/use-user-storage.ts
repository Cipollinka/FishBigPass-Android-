import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './types.ts';

const STORAGE_KEY = 'userData';
const defaultUserState: User = {
  score: 0,
  nickname: '',
  avatar: '',
  dailyTaskLastPlayedAt: 0,
  dailyEarnedScore: 0,
  lastGiftClaim: 0,
  boughtFishes: [],
  boughtStories: [],
  isOnboarded: false,
};

export const useUserData = () => {
  const [userData, setUserData] = useState<User>(defaultUserState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const updateUserData = async (updatedData: User) => {
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    setUserData(updatedData);
  };

  const resetUserData = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUserData(defaultUserState);
  };

  const resetUserProgress = async () => {
    if (!userData) return;
    await updateUserData({
      score: 0,
      nickname: '',
      avatar: '',
      dailyTaskLastPlayedAt: 0,
      dailyEarnedScore: 0,
      lastGiftClaim: 0,
      boughtFishes: [],
      isOnboarded: false,
      boughtStories: [],
    });
  };

  return {
    userData,
    loading,
    updateUserData,
    resetUserData,
    resetUserProgress,
  };
};

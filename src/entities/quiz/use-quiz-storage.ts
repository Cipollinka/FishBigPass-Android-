import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QuizStore} from './types.ts';

const STORAGE_KEY = 'quizState';

export const useQuizStorage = () => {
  const [quizState, setQuizState] = useState<QuizStore>({
    topicId: 1,
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
  });

  // Завантажуємо дані з локального сховища при монтуванні компонента
  useEffect(() => {
    const loadQuizState = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue) {
          setQuizState(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error('Failed to load quiz state from AsyncStorage', error);
      }
    };

    loadQuizState();
  }, []);

  // Функція для збереження даних в локальне сховище
  const saveQuizState = async (newState: QuizStore) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      setQuizState(newState);
    } catch (error) {
      console.error('Failed to save quiz state to AsyncStorage', error);
    }
  };

  // Функція для очищення даних
  const clearQuizState = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setQuizState({
        topicId: 1,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
      });
    } catch (error) {
      console.error('Failed to clear quiz state from AsyncStorage', error);
    }
  };
  console.log(quizState);
  return {
    quizState,
    saveQuizState,
    clearQuizState,
  };
};

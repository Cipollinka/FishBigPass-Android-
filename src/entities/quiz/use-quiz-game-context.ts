import {createContext, useContext} from 'react';
import {QuizStore} from './types.ts';

interface QuizGameContextProps {
  quizState: QuizStore | null;
  saveQuizState: (newState: QuizStore) => Promise<void>;
  clearQuizState: () => void;
}

export const QuizGameContext = createContext<QuizGameContextProps | undefined>(
  undefined,
);

export const useCurrentQuizGame = () => {
  const context = useContext(QuizGameContext);

  if (!context) {
    throw new Error('useQuizGame must be used within a CurrentGameProvider');
  }

  return context;
};

import {ImageSourcePropType} from 'react-native';

export interface QuestionForLevel {
  id: number;
  text: string;
  correctAnswer: string;
  variants: string[];
}

export interface Level {
  id: number;
  title: string;
  image: ImageSourcePropType;
  questions: QuestionForLevel[];
}

export interface QuizStore {
  topicId: number;
  correctAnswers: number;
  currentQuestionIndex: number;
  score: number;
}

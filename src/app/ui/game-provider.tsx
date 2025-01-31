import React, {ReactNode} from 'react';
import {QuizGameContext, useQuizStorage} from '../../entities/quiz';

export const CurrentGameProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {quizState, saveQuizState, clearQuizState} = useQuizStorage();

  return (
    <QuizGameContext.Provider
      value={{clearQuizState, saveQuizState, quizState}}>
      {children}
    </QuizGameContext.Provider>
  );
};

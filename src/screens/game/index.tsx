import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCurrentQuizGame} from '../../entities/quiz';
import {Level, levels} from '../../levels.ts';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';
import {useUser} from '../../entities/user';
import {Navigation} from '../../widgets/navigation.tsx';

export const GameScreen = () => {
  const {quizState} = useCurrentQuizGame();

  const activeTopic = useMemo(() => {
    if (!quizState?.topicId) {
      return null;
    }

    return levels.find(level => level.id === quizState?.topicId);
  }, [quizState?.topicId]);
  if (!activeTopic || !quizState) {
    return null;
  }

  return <Game activeTopic={activeTopic} />;
};

interface GameProps {
  activeTopic: Level;
}

const Game: FC<GameProps> = ({activeTopic}) => {
  const {navigate} = useNavigation();
  const {userData, updateUserData} = useUser();
  const {quizState, saveQuizState} = useCurrentQuizGame();
  const [selectedVariant, setVariant] = useState<string | undefined>(undefined);
  const [isNextQuestionLoading, setNextQuestionLoading] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    quizState?.currentQuestionIndex || 0,
  );
  const currentQuestion = activeTopic.questions[currentQuestionIndex];

  useEffect(() => {
    if (!selectedVariant) return;
    setNextQuestionLoading(true);
    setTimeout(() => {
      nextTask();
    }, 1000);
  }, [selectedVariant]);

  const nextTask = async () => {
    const questionIndex = currentQuestionIndex + 1;

    let score = quizState?.score || 0;
    let correctAnswers = quizState?.correctAnswers || 0;

    if (selectedVariant === currentQuestion.correctAnswer) {
      score += 100;
      correctAnswers += 1;
      await saveQuizState({
        ...quizState!,
        correctAnswers,
        score,
      });
    }
    if (activeTopic.questions.length - 1 >= questionIndex) {
      setCurrentQuestionIndex(questionIndex);
    } else if (correctAnswers === 5) {
      await saveQuizState({
        ...quizState!,
        topicId: quizState?.topicId! + 1,
        correctAnswers: 0,
        score: 0,
      });
      await updateUserData({
        ...userData!,
        score: userData!.score + score,
      });
      navigate(ScreenName.Completed);
    } else {
      await saveQuizState({
        ...quizState!,
        score: 0,
        currentQuestionIndex: 0,
      });
      navigate(ScreenName.NotCompleted);
    }

    setNextQuestionLoading(false);
  };

  const quizStateRef = useRef(quizState);
  useEffect(() => {
    quizStateRef.current = quizState;
  }, [quizState]);

  const currentQuestionIndexRF = useRef(currentQuestionIndex);

  useEffect(() => {
    currentQuestionIndexRF.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    return () => {
      if (!quizStateRef.current) return;
      saveQuizState({
        ...quizStateRef.current,
        currentQuestionIndex: currentQuestionIndexRF.current || 0,
      });
    };
  }, []);

  const getButtonBackground = (answer: string) => {
    if (selectedVariant !== answer) {
      return '#FF6F61';
    }
    if (selectedVariant === currentQuestion.correctAnswer) {
      return '#70ff29';
    }
    if (selectedVariant !== currentQuestion.correctAnswer) {
      return '#ff2929';
    }
    return '#FF6F61';
  };

  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={styles.wrapper}>
      <SafeAreaView
        style={{
          maxWidth: 400,
          width: '100%',
          flex: 1,
        }}>
        <ImageBackground
          borderRadius={20}
          style={{
            borderRadius: 20,
            maxWidth: 400,
            width: '100%',
            maxHeight: 221,
            height: '100%',
            borderColor: 'white',
            borderWidth: 2,
            position: 'relative',
          }}
          source={activeTopic.image}>
          <Text
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              paddingRight: 10,
              paddingLeft: 10,
              borderRadius: 20,
              backgroundColor: 'rgba(0,168,232,0.69)',
              fontSize: 24,
              lineHeight: 32.18,
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
              color: 'white',
            }}>
            {currentQuestionIndex + 1} of 5
          </Text>
          <Text
            style={{
              borderWidth: 2,
              borderColor: 'white',
              marginTop: 'auto',
              padding: 10,
              fontSize: 24,
              lineHeight: 32.18,
              textAlign: 'center',
              fontFamily: 'Montserrat-Regular',
              color: 'white',
              backgroundColor: '#00A8E8',
              borderRadius: 20,
            }}>
            {activeTopic.title}
          </Text>
        </ImageBackground>
        <View
          style={{
            marginTop: 15,
            marginBottom: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              backgroundColor: '#00A8E8',
              paddingRight: 10,
              borderRadius: 20,
            }}>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: quizState!.score < 100 ? '#888888' : '#38d24d',
                opacity: quizState!.score < 100 ? 0.5 : 1,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'white',
              }}
              disabled={quizState!.score < 100 || isNextQuestionLoading}
              onPress={async () => {
                await saveQuizState({
                  ...quizState!,
                  score: quizState!.score - 100,
                });
                setVariant(currentQuestion.correctAnswer);
              }}
              activeOpacity={0.8}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../shared/assets/images/eye.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: 'white',
                fontSize: 16,
              }}>
              Hint for 100
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              backgroundColor: '#00A8E8',
              borderRadius: 20,
              borderWidth: 2,
              borderColor: 'white',
            }}>
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 10,
                paddingRight: 18,
                paddingLeft: 25,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Bold',
                  color: 'white',
                }}>
                {quizState?.score}
              </Text>
              <Image
                style={{
                  width: 33,
                  height: 33,
                }}
                source={require('../../shared/assets/images/score.png')}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            borderRadius: 20,
            height: '100%',
            width: '100%',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              backgroundColor: 'rgba(0,168,232,0.51)',
              borderRadius: 20,
            }}>
            {currentQuestion.text}
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              paddingLeft: 40,
              paddingRight: 40,
            }}>
            {currentQuestion.variants.map((answer, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isNextQuestionLoading}
                onPress={() => setVariant(answer)}
                style={{
                  backgroundColor: getButtonBackground(answer),
                  maxWidth: 350,
                  borderRadius: 50,
                  height: 40,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={index}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Bold',
                    color: 'white',
                  }}>
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Navigation />
      </SafeAreaView>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

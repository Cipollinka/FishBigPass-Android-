import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';
import {useCurrentQuizGame} from '../../entities/quiz';
import {levels} from '../../levels.ts';
import {Navigation} from '../../widgets/navigation.tsx';

export function IncompleteLevelScreen() {
  const {navigate} = useNavigation();
  const {quizState, saveQuizState} = useCurrentQuizGame();

  if (!quizState) {
    return null;
  }

  const levelData = levels[quizState.topicId - 1];

  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ImageBackground
            borderRadius={20}
            source={levelData.image}
            style={styles.imageBackground}>
            <View style={styles.overlay}>
              <Text style={styles.successMessage}>You answered correctly!</Text>

              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  {quizState.correctAnswers}/5
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.factContainer}>
            <Text style={styles.factText}>{levelData.fact}</Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              if (!quizState) return;
              await saveQuizState({
                ...quizState,
                score: 0,
                currentQuestionIndex: 0,
                correctAnswers: 0,
              });
              navigate(ScreenName.Game);
            }}
            style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>

        <Navigation />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 410,
    gap: 20,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    borderRadius: 20,
  },
  overlay: {
    padding: 20,
    gap: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,168,232,0.32)',
    borderRadius: 20,
  },
  successMessage: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    borderRadius: 20,
    padding: 10,
    color: 'white',
    backgroundColor: 'rgba(0,168,232,0.78)',
  },
  scoreContainer: {
    backgroundColor: '#00A8E8',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    width: 170,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  scoreText: {
    fontSize: 24,
    lineHeight: 29,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  factContainer: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#00A8E8',
    padding: 10,
  },
  factText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  retryButton: {
    fontFamily: 'Montserrat-Bold',
    backgroundColor: '#FF6F61',
    borderRadius: 20,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: 'white',
  },
});

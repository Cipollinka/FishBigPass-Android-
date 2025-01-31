import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCurrentQuizGame} from '../../entities/quiz';
import {Navigation} from '../../widgets/navigation.tsx';
import {levels} from '../../levels.ts';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';

export function CompletedLevelScreen() {
  const {navigate} = useNavigation();
  const {quizState, saveQuizState} = useCurrentQuizGame();

  if (!quizState) return null;

  const levelReward = levels[quizState.topicId - 2];

  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <Image
            borderRadius={20}
            style={styles.levelImage}
            source={levelReward.image}
          />

          <Text style={styles.completionText}>Level Completed!🔥🎉</Text>

          <ScrollView
            style={styles.factContainer}
            contentContainerStyle={styles.factContent}>
            <Text style={styles.factText}>{levelReward.fact}</Text>
          </ScrollView>

          <TouchableOpacity
            onPress={async () => {
              if (!quizState) return;
              if (quizState.topicId === 10) {
                saveQuizState({
                  ...quizState,
                  score: 0,
                  topicId: 1,
                  currentQuestionIndex: 0,
                  correctAnswers: 0,
                });
                navigate(ScreenName.Home);
              } else {
                await saveQuizState({
                  ...quizState,
                  score: 0,
                  currentQuestionIndex: 0,
                  correctAnswers: 0,
                });
                navigate(ScreenName.Game);
              }
            }}
            style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
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
  contentWrapper: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 410,
    flexDirection: 'column',
    gap: 10,
  },
  levelImage: {
    width: '100%',
    maxHeight: 200,
  },
  completionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#00A8E8',
    borderRadius: 20,
    paddingVertical: 10,
  },
  factContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#00A8E8',
  },
  factContent: {
    padding: 15,
    borderRadius: 20,
  },
  factText: {
    fontSize: 16,
    color: 'white',
  },
  nextButton: {
    marginTop: 'auto',
    backgroundColor: '#FF6F61',
    maxWidth: 390,
    borderRadius: 20,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: 'white',
  },
});

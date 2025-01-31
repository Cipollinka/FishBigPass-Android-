import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../entities/user';
import FishGame from './fish_game.tsx';
import {Navigation} from '../../widgets/navigation.tsx';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';

export const DailyTasksScreen = () => {
  const {userData} = useUser();
  const {navigate} = useNavigation();
  const lastPlayedAt = new Date(userData?.dailyTaskLastPlayedAt || 0);
  const now = new Date();
  const diff = now.getTime() - lastPlayedAt.getTime();
  const diffInHours = diff / (1000 * 3600);
  console.log('user', userData);
  if (diffInHours < 24) {
    return (
      <ImageBackground
        source={require('../../shared/assets/images/fishingbg.png')}
        style={styles.wrapper}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              maxWidth: 400,
              width: '100%',
              gap: 45,
            }}>
            <Text style={styles.title}>Daily Task</Text>
            <View style={styles.descriptionWrapper}>
              <View
                style={{
                  alignSelf: 'center',
                  borderRadius: 18,
                  flexDirection: 'row',
                  gap: 10,
                  minWidth: 150,
                  justifyContent: 'center',
                  padding: 12,
                  backgroundColor: '#00A8E8',
                }}>
                <Text
                  style={{
                    fontSize: 42,
                    lineHeight: 53.09,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  +{userData?.dailyEarnedScore || 0}
                </Text>
                <ImageBackground
                  source={require('../../shared/assets/images/score.png')}
                  style={styles.image}
                />
              </View>
              <Text style={styles.description}>You`ve completed fishing!</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => {
              navigate(ScreenName.Home);
            }}>
            <Text style={styles.buttonText}>Thanks!</Text>
          </TouchableOpacity>

          <Navigation />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return <FishGame />;
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 19,
  },
  title: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    fontSize: 33,
    backgroundColor: '#00A8E8',
    padding: 5,
    lineHeight: 43.09,
    textAlign: 'center',

    color: 'white',
  },
  descriptionWrapper: {
    borderRadius: 39,
    padding: 20,
    backgroundColor: '#05739d',
  },
  description: {
    fontSize: 40,
    lineHeight: 50.56,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#FF6F61',
    borderWidth: 2,
    borderColor: 'white',
    height: 79,
  },
  buttonText: {
    fontSize: 36,
    lineHeight: 45.5,
    color: 'white',
  },
  image: {
    width: 51,
    height: 51,
  },
});

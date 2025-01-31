import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from '../../widgets/navigation.tsx';
import React from 'react';
import {useUser} from '../../entities/user';
import {useCurrentQuizGame} from '../../entities/quiz';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';

export const SettingsScreen = () => {
  const {userData, resetUserProgress} = useUser();
  const {clearQuizState} = useCurrentQuizGame();

  const {navigate} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <SafeAreaView
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.content}>
          <View
            style={{
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}>
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 250,
              }}
              source={
                userData?.avatar
                  ? {uri: userData?.avatar}
                  : require('../../shared/assets/images/imageplaceholder.png')
              }
            />
            <Text
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 20,
                backgroundColor: '#00A8E8',
                fontSize: 24,
                fontFamily: 'Montserrat-Bold',
                color: 'white',
              }}>
              Nickname: {userData?.nickname || '-'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetProgress}
          onPress={async () => {
            await resetUserProgress();
            await clearQuizState();
            navigate(ScreenName.Register);
          }}>
          <Text style={styles.resetProgressText}>Reset</Text>
        </TouchableOpacity>

        <Navigation />
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 33,
    backgroundColor: '#00A8E8',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 42,
    lineHeight: 53.09,
    textAlign: 'center',
  },
  contentTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  content: {
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#05739d',
    borderRadius: 39,
    paddingTop: 30,
    paddingLeft: 34,
    paddingRight: 34,
    paddingBottom: 30,
  },

  resetProgress: {
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    width: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
    borderRadius: 18,
    backgroundColor: '#f66699',
  },
  resetProgressText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
});

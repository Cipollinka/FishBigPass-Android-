import React, {ReactNode} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useCurrentQuizGame} from '../../entities/quiz';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';
import {useUser} from '../../entities/user';
import {styles} from '../leaderboard/leaderboard-entry.tsx';

export function MainScreen(): React.JSX.Element {
  const {navigate} = useNavigation();
  const navigateToPage = (sreen: ScreenName) => () => navigate(sreen);
  const {userData} = useUser();
  const {quizState: quiz, saveQuizState} = useCurrentQuizGame();

  const canResume = () => {
    if (quiz?.currentQuestionIndex === 0 && quiz?.topicId === 1) {
      return false;
    }
    return true;
  };
  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={{
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <SafeAreaView
          style={{
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            justifyContent: 'space-between',
            flex: 1,
            gap: 16,
            paddingBottom: 40,
            paddingTop: 20,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../../shared/assets/images/logo.png')}
          />
          <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(17,112,255,0.69)',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 28,
                color: 'white',
              }}>
              Your score: {userData?.score || 0}
            </Text>
            <Image
              resizeMode="cover"
              style={styles.scoreIcon}
              source={require('../../shared/assets/images/score.png')}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              gap: 16,
              backgroundColor: 'rgba(0,168,232,0.56)',
              paddingTop: 20,
              paddingBottom: 20,
              borderRadius: 20,
            }}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                gap: 5,
              }}>
              <MenuButton
                style={{
                  width: 'auto',
                  flex: 0.5,
                }}
                onPress={async () => {
                  await saveQuizState({
                    ...quiz,
                    topicId: quiz?.topicId || 1,
                    currentQuestionIndex: 0,
                    correctAnswers: 0,
                    score: 0,
                  });
                  navigateToPage(ScreenName.Game)();
                }}>
                {canResume() ? 'Resume' : 'Adventure'}
              </MenuButton>
              <MenuButton
                style={{
                  width: 'auto',
                  flex: 0.5,
                }}
                onPress={navigateToPage(ScreenName.DailyTasks)}>
                Daily fishing
              </MenuButton>
            </View>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                gap: 5,
              }}>
              <MenuButton
                onPress={navigateToPage(ScreenName.StoryShop)}
                style={{
                  width: 'auto',
                  flex: 0.5,
                }}>
                Stories
              </MenuButton>
              <MenuButton
                onPress={navigateToPage(ScreenName.Marketplace)}
                style={{
                  width: 'auto',
                  flex: 0.5,
                }}>
                Shop
              </MenuButton>
            </View>
            <MenuButton onPress={navigateToPage(ScreenName.Leaderboard)}>
              Scoreboard
            </MenuButton>
            <MenuButton onPress={navigateToPage(ScreenName.Settings)}>
              Options
            </MenuButton>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const MenuButton = ({
  children,
  onPress,
  style,
                      buttonStyle
}: {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  buttonStyle?: ViewStyle;
}) => (
  <TouchableOpacity
    style={{
      width: '90%',
      ...style,
    }}
    onPress={onPress}
    activeOpacity={0.8}>
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1170ff',
        height: 65,
        borderColor: 'white',
        borderBottomWidth: 6,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderRadius: 24,
        ...buttonStyle
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: 24,
          color: 'white',
        }}>
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

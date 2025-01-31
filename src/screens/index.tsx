import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {MainScreen} from './main';
import {SettingsScreen} from './options';
import {DailyTasksScreen} from './daily-tasks';
import {GameScreen} from './game';
import {ScreenName} from '../shared/lib/use-navigation.ts';
import {RegisterScreen} from './register';
import {LeaderboardScreen} from './leaderboard/score-screen.tsx';
import {RewardScreen} from './reward';
import {CompletedLevelScreen} from './completed-level';
import {IncompleteLevelScreen} from './incomplete-level';
import {InfoScreen} from './info';
import {MarketplaceScreen} from './marketplace';
import { StoryShopScreen } from "./story-shop";

const Stack = createStackNavigator();
export const Screens = () => {
  return (
    <View style={styles.wrapper}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
        initialRouteName={ScreenName.Loading}>
        <Stack.Screen name={ScreenName.Register} component={RegisterScreen} />
        <Stack.Screen name={ScreenName.Home} component={MainScreen} />
        <Stack.Screen name={ScreenName.StoryShop} component={StoryShopScreen} />
        <Stack.Screen
          name={ScreenName.Completed}
          component={CompletedLevelScreen}
        />
        <Stack.Screen
          name={ScreenName.NotCompleted}
          component={IncompleteLevelScreen}
        />
        <Stack.Screen name={ScreenName.About} component={InfoScreen} />
        <Stack.Screen
          name={ScreenName.Leaderboard}
          component={LeaderboardScreen}
        />
        <Stack.Screen name={ScreenName.Settings} component={SettingsScreen} />
        <Stack.Screen name={ScreenName.Loading} component={LoadingScreen} />
        <Stack.Screen
          name={ScreenName.DailyTasks}
          component={DailyTasksScreen}
        />
        <Stack.Screen
          name={ScreenName.Marketplace}
          component={MarketplaceScreen}
        />
        <Stack.Screen name={ScreenName.Reward} component={RewardScreen} />
        <Stack.Screen name={ScreenName.Game} component={GameScreen} />
      </Stack.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const LoadingScreen = () => (
  <Image
    style={{
      width: '100%',
      height: '100%',
    }}
    source={require('../shared/assets/images/mainmenubg.jpeg')}
  />
);

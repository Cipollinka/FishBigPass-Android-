import {View} from 'react-native';

import {NavigationProvider} from './ui/navigation-provider';
import {Screens} from '../screens';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserProvider} from './ui/user-provider';
import React, {ReactNode} from 'react';
import {useMusicController} from '../features';
import {MusicControlContext} from '../features/providers.ts';
import {CurrentGameProvider} from './ui/game-provider.tsx';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
export const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <UserProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={navTheme}>
            <NavigationProvider>
              <CurrentGameProvider>
                <Screens />
              </CurrentGameProvider>
            </NavigationProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProvider>
    </View>
  );
};

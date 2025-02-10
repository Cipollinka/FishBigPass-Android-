import React from 'react';
import {UserProvider} from './app/ui/user-provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {NavigationProvider} from './app/ui/navigation-provider';
import {CurrentGameProvider} from './app/ui/game-provider';
import {Screens} from './screens';
import {View} from 'react-native';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function GameComponent() {
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
}

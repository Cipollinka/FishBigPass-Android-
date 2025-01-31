import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export enum ScreenName {
  Home = 'Home',
  Settings = 'Settings',
  StoryShop = 'StoryShop',
  About = 'About',
  Leaderboard = 'Leaderboard',
  NotCompleted = 'NotCompleted',
  Game = 'Game',
  Completed = 'Completed',
  Reward = 'Reward',
  Marketplace = 'Marketplace',
  Loading = 'Loading',
  Register = 'Register',
  DailyTasks = 'DailyTasks',
}

export const useNavigation = () => {
  const {dispatch} = useStackNavigation();

  const currentScreen = useNavigationState(state =>
    state?.routes ? state.routes[state.index].name : '',
  );

  const navigate = (screen: ScreenName) => {
    if (currentScreen !== screen) {
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screen}],
        }),
      );
    }
  };
  return {navigate, currentScreen};
};

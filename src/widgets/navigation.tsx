import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FC} from 'react';
import {ScreenName, useNavigation} from '../shared/lib/use-navigation.ts';

export const Navigation = () => {
  const {currentScreen, navigate} = useNavigation();

  return (
    <View style={styles.navContainer}>
      <NavButton
        activeImage={require('../shared/assets/images/homeactive.png')}
        inactiveImage={require('../shared/assets/images/home.png')}
        isActive={currentScreen === ScreenName.Home}
        onPress={() => navigate(ScreenName.Home)}
      />
      <NavButton
        activeImage={require('../shared/assets/images/shopactive.png')}
        inactiveImage={require('../shared/assets/images/shop.png')}
        isActive={currentScreen === ScreenName.Marketplace}
        onPress={() => navigate(ScreenName.Marketplace)}
      />
      <NavButton
        activeImage={require('../shared/assets/images/activeinfo.png')}
        inactiveImage={require('../shared/assets/images/info.png')}
        isActive={currentScreen === ScreenName.About}
        onPress={() => navigate(ScreenName.About)}
      />
      <NavButton
        activeImage={require('../shared/assets/images/settingsactive.png')}
        inactiveImage={require('../shared/assets/images/settings.png')}
        isActive={currentScreen === ScreenName.Settings}
        onPress={() => navigate(ScreenName.Settings)}
      />
    </View>
  );
};

interface NavButtonProps {
  isActive: boolean;
  activeImage: ImageSourcePropType;
  inactiveImage: ImageSourcePropType;
  onPress: () => void;
}

const NavButton: FC<NavButtonProps> = ({
  isActive,
  activeImage,
  inactiveImage,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={styles.icon}
      source={isActive ? activeImage : inactiveImage}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#7FDBFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  icon: {
    width: 40,
    height: 40,
  },
});

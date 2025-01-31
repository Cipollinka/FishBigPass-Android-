import React, {useEffect, useMemo} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';
import {useUser} from '../../entities/user';
import {fishTypes} from '../daily-tasks/fish_game.tsx';

export function RewardScreen(): React.JSX.Element {
  const {navigate} = useNavigation();
  const {userData, updateUserData} = useUser();

  const dailyPrize = useMemo(() => {
    return fishTypes[Math.floor(Math.random() * fishTypes.length)];
  }, []);

  useEffect(() => {
    if (!userData) return;

    const lastClaimed = userData.lastGiftClaim;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastClaimed > oneDay) {
      updateUserData({
        ...userData,
        lastGiftClaim: now,
        boughtFishes: userData.boughtFishes.some(
          fish => fish.id === dailyPrize.id,
        )
          ? userData.boughtFishes.map(fish =>
              fish.id === dailyPrize.id
                ? {...fish, count: fish.count + 1}
                : fish,
            )
          : [...(userData.boughtFishes || []), {id: dailyPrize.id, count: 1}],
      });
    }
  }, []);

  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={styles.background}>
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.header}>Today's Gift</Text>

        <View style={styles.prizeContainer}>
          <View style={styles.imageWrapper}>
            <Image source={dailyPrize.image} style={styles.prizeImage} />
          </View>
          <Text style={styles.prizeText}>
            You’ve received a {dailyPrize.name}!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.thankButton}
          onPress={() => navigate(ScreenName.Home)}>
          <Text style={styles.buttonLabel}>Thanks</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    fontSize: 42,
    lineHeight: 53,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    marginTop: 33,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: '#00A8E8',
    paddingHorizontal: 20,
  },
  prizeContainer: {
    padding: 10,
    paddingBottom: 20,
    width: 372,
    borderRadius: 39,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0479a6',
  },
  imageWrapper: {
    gap: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prizeImage: {
    width: 100,
    height: 100,
  },
  prizeText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  thankButton: {
    width: 372,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#FF6F61',
    height: 70,
  },
  buttonLabel: {
    fontFamily: 'Montserrat-Bold',

    fontSize: 30,
    lineHeight: 46,
    color: 'white',
  },
});

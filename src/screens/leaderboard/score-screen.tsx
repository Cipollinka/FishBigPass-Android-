import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LeaderboardEntry} from './leaderboard-entry.tsx';
import {Navigation} from '../../widgets/navigation.tsx';
import {useUser} from '../../entities/user';

export const LeaderboardScreen = () => {
  const {userData} = useUser();

  return (
    <ImageBackground
      source={require('../../shared/assets/images/mainmenubg.jpeg')}
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.scoreContainer}>
          <LeaderboardEntry points={userData?.score || 0} name="You" />
          {dummyData.map((player, idx) => (
            <LeaderboardEntry
              key={idx}
              name={player.name}
              points={player.points}
            />
          ))}
        </View>
        <Navigation />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 34,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#00A8E8',
    textAlign: 'center',
  },
  scoreContainer: {
    borderRadius: 20,
    maxWidth: 400,
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#00A8E8',
  },
});

const dummyData = [
  {name: 'Alex Grey', points: 12100},
  {name: 'Mia Reed', points: 11500},
  {name: 'Finn Blake', points: 10900},
  {name: 'Lily Stone', points: 9700},
  {name: 'Noah Scott', points: 7800},
];

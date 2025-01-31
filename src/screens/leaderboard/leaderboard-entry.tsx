import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  name: string;
  points: number;
}

export const LeaderboardEntry: FC<Props> = ({name, points}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.username}>{name}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{points}</Text>
        <Image
          resizeMode="cover"
          style={styles.scoreIcon}
          source={require('../../shared/assets/images/score.png')}
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  nameContainer: {
    width: '100%',
    maxWidth: 165,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  username: {
    paddingHorizontal: 20,
    fontSize: 24,
    color: 'white',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    justifyContent: 'space-between',
    height: 70,
  },
  scoreText: {
    paddingLeft: 18,
    fontSize: 24,
    color: 'white',
  },
  scoreIcon: {
    width: 66,
    height: 66,
  },
});

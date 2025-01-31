import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from '../../widgets/navigation.tsx';
import {useUser} from '../../entities/user';

const {width, height} = Dimensions.get('window');
const GAME_DURATION = 30;
const FISH_SIZE = 80;

export const fishTypes = [
  {
    id: 'salmon',
    name: 'Salmon',
    image: require('../../shared/assets/images/salmon.png'),
  },
  {
    id: 'tuna',
    name: 'Tuna',
    image: require('../../shared/assets/images/tuna.png'),
  },
  {
    id: 'clownfish',
    name: 'Clownfish',
    image: require('../../shared/assets/images/clownfish.png'),
  },
  {
    id: 'catfish',
    name: 'Catfish',
    image: require('../../shared/assets/images/catfish.png'),
  },
  {
    id: 'goldfish',
    name: 'Goldfish',
    image: require('../../shared/assets/images/goldfish.png'),
  },
  {
    id: 'barracuda',
    name: 'Barracuda',
    image: require('../../shared/assets/images/barracuda.png'),
  },
  {
    id: 'angelfish',
    name: 'Angelfish',
    image: require('../../shared/assets/images/angelfish.png'),
  },
  {
    id: 'pufferfish',
    name: 'Pufferfish',
    image: require('../../shared/assets/images/pufferfish.png'),
  },
  {
    id: 'marlin',
    name: 'Marlin',
    image: require('../../shared/assets/images/marlin.png'),
  },
  {
    id: 'swordfish',
    name: 'Swordfish',
    image: require('../../shared/assets/images/sword.png'),
  },
];

interface Fish {
  id: string;
  name: string;
  image: any;
}

interface AnimatedFish {
  id: number;
  y: number;
  x: Animated.Value;
  type: Fish;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
};
const getRandomValueInInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const FishGame = () => {
  const [remainingTime, setRemainingTime] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [fishArray, setFishArray] = useState<AnimatedFish[]>([]);
  const [caughtFish, setCaughtFish] = useState<Fish[]>([]);
  const {userData, updateUserData} = useUser();

  const scoreRef = useRef(score);
  const caughtFishRef = useRef(caughtFish);
  const userScoreRef = useRef(userData?.score || 0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    caughtFishRef.current = caughtFish;
  }, [caughtFish]);
  useEffect(() => {
    userScoreRef.current = userData?.score || 0;
  }, [userData?.score]);
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isGameRunning && remainingTime > 0) {
      timerId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isGameRunning, remainingTime]);

  useEffect(() => {
    let spawnerId: NodeJS.Timeout;
    let gameTimer: NodeJS.Timeout;

    if (isGameRunning) {
      setScore(0);
      setCaughtFish([]);
      setFishArray([]);

      spawnerId = setInterval(spawnFish, 500);
      gameTimer = setTimeout(() => endGame(), GAME_DURATION * 1000);
    }

    return () => {
      spawnerId && clearInterval(spawnerId);
      clearTimeout(gameTimer);
      setFishArray([]);
    };
  }, [isGameRunning]);

  const startGame = () => {
    setIsGameRunning(true);
  };

  const endGame = () => {
    setIsGameRunning(false);
    const mergedFishes = caughtFishRef.current.reduce(
      (boughtFishes, caughtFish) => {
        const existingFishIndex = boughtFishes.findIndex(
          fish => fish.id === String(caughtFish.id),
        );

        if (existingFishIndex !== -1) {
          boughtFishes[existingFishIndex].count += 1;
        } else {
          return [...boughtFishes, {id: String(caughtFish.id), count: 1}];
        }

        return boughtFishes;
      },
      [...(userData?.boughtFishes || [])],
    );
    updateUserData({
      ...userData!,
      score: userScoreRef.current + scoreRef.current,
      dailyEarnedScore: scoreRef.current,
      dailyTaskLastPlayedAt: Date.now(),
      boughtFishes: userData?.boughtFishes
        ? mergedFishes
        : caughtFishRef.current.map(fish => ({id: String(fish.id), count: 1})),
    });
  };
  const spawnFish = () => {
    const randomFishType =
      fishTypes[Math.floor(Math.random() * fishTypes.length)];
    const randomY = getRandomValueInInterval(60 + FISH_SIZE, height / 1.5);

    const newFish = {
      id: Date.now() + Math.random(),
      type: randomFishType,
      x: new Animated.Value(width),
      y: randomY,
    };

    setFishArray(prevFish => [...prevFish, newFish]);
    animateFish(newFish);
  };

  const animateFish = (fish: AnimatedFish) => {
    Animated.timing(fish.x, {
      toValue: -FISH_SIZE,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      setFishArray(prevFish => prevFish.filter(f => f.id !== fish.id));
    });
  };

  const handleFishCatch = (fish: AnimatedFish) => {
    if (isGameRunning) {
      setScore(score + 100);
      setCaughtFish([...caughtFish, fish.type]);
      setFishArray(fishArray.filter(f => f.id !== fish.id));
    }
  };

  const renderCaughtFish = ({item}: any) => (
    <View style={styles.caughtFishItem}>
      <Image source={item.image} style={styles.caughtFishImage} />
      <Text style={styles.caughtFishText}>{item.name}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../shared/assets/images/fishingbg.png')}
      style={styles.container}>
      {isGameRunning ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}>
            <SafeAreaView
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <Text style={styles.score}>Score: {score}</Text>

              <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
            </SafeAreaView>
          </View>

          {fishArray.map(fish => (
            <Animated.View
              key={fish.id}
              style={[
                styles.fishContainer,
                {
                  transform: [
                    {translateX: fish.x}, // Static x position
                    {translateY: fish.y}, // Animated y position
                  ],
                },
              ]}>
              <TouchableOpacity onPress={() => handleFishCatch(fish)}>
                <Image source={fish.type.image} style={styles.fish} />
              </TouchableOpacity>
            </Animated.View>
          ))}

          <View style={styles.caughtFishContainer}>
            <SafeAreaView
              style={{
                width: '100%',
                flexDirection: 'row',
                gap: 5,
              }}>
              <Text style={styles.caughtFishTitle}>Caught Fish:</Text>
              <FlatList
                data={caughtFish}
                renderItem={renderCaughtFish}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal
              />
            </SafeAreaView>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startText}>Start Game</Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 'auto',
            }}>
            <Navigation />
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  startButton: {
    width: 200,
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: 'center',
    marginTop: 'auto',
    padding: 20,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
  },
  startText: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 20,
  },
  fishContainer: {
    position: 'absolute',
  },
  fish: {
    width: FISH_SIZE,
    height: FISH_SIZE,
  },
  caughtFishContainer: {
    width: '100%',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  caughtFishTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  caughtFishItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  caughtFishImage: {
    width: 40,
    height: 40,
  },
  caughtFishText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default FishGame;

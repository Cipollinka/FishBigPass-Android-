import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from '../../widgets/navigation.tsx';
import {useUser} from '../../entities/user';

export const MarketplaceScreen = () => {
  const {userData, updateUserData} = useUser();

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../shared/assets/images/shopbg.png')}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Buy or sell your fish</Text>

        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>{userData?.score}</Text>
          <Image
            style={styles.scoreIcon}
            source={require('../../shared/assets/images/score.png')}
          />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
          {FISHES.map((fish: Fish) => (
            <View key={fish.name} style={styles.fishCard}>
              <View style={styles.fishImageWrapper}>
                <Text style={styles.fishCount}>
                  {userData?.boughtFishes?.find(
                    userFish => userFish.id === fish.id,
                  )?.count || 0}
                </Text>
                <Image style={styles.fishImage} source={fish.image} />
              </View>

              <Text style={styles.fishName}>{fish.name}</Text>

              <View style={styles.buttonContainer}>
                {(userData?.boughtFishes?.find(
                  userFish => userFish.id === fish.id,
                )?.count || 0) > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (!userData) return;
                      updateUserData({
                        ...userData,
                        score: userData.score + fish.price,
                        boughtFishes: userData.boughtFishes
                          .map(boughtFish => {
                            if (boughtFish.id === fish.id) {
                              return {
                                ...boughtFish,
                                count: boughtFish.count - 1,
                              };
                            }
                            return boughtFish;
                          })
                          .filter(boughtFish => boughtFish.count > 0),
                      });
                    }}>
                    <Text style={styles.sellButton}>Sell</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  disabled={Boolean((userData?.score || 0) < fish.price)}
                  onPress={() => {
                    if (!userData) return;
                    updateUserData({
                      ...userData,
                      score: userData.score - fish.price,
                      boughtFishes: userData.boughtFishes.some(
                        boughtFish => boughtFish.id === fish.id,
                      )
                        ? userData.boughtFishes.map(boughtFish =>
                            boughtFish.id === fish.id
                              ? {...boughtFish, count: boughtFish.count + 1}
                              : boughtFish,
                          )
                        : [
                            ...(userData.boughtFishes || []),
                            {id: fish.id, count: 1},
                          ],
                    });
                  }}>
                  <Text
                    style={{
                      ...styles.buyButton,
                      color:
                        (userData?.score || 0) >= fish.price
                          ? '#00e804'
                          : 'gray',
                    }}>
                    Buy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <Navigation />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 24,
    marginTop: '40%',
    backgroundColor: '#eb9532',
    padding: 8,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    justifyContent: 'center',
    backgroundColor: '#eb9532',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    gap: 8,
  },
  scoreText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreIcon: {
    width: 32,
    height: 32,
  },
  scrollContainer: {
    maxWidth: 400,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 16,
  },
  fishCard: {
    width: 100,
    alignItems: 'center',
  },
  fishImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    backgroundColor: '#00A8E8',
    borderColor: 'white',
    position: 'relative',
  },
  fishCount: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 1,
    backgroundColor: '#12be00',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  fishImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  fishName: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  sellButton: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  buyButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface Fish {
  id: string;
  image: any;
  price: number;
  name: string;
}

const FISHES: Fish[] = [
  {
    id: 'salmon',
    image: require('../../shared/assets/images/salmon.png'),
    price: 100,
    name: 'Salmon',
  },
  {
    id: 'marlin',
    image: require('../../shared/assets/images/marlin.png'),
    price: 200,
    name: 'Marlin',
  },
  {
    id: 'clownfish',
    image: require('../../shared/assets/images/clownfish.png'),
    price: 300,
    name: 'Clownfish',
  },
  {
    id: 'pufferfish',
    image: require('../../shared/assets/images/pufferfish.png'),
    price: 400,
    name: 'Pufferfish',
  },
  {
    id: 'angelfish',
    image: require('../../shared/assets/images/angelfish.png'),
    price: 500,
    name: 'Angelfish',
  },
  {
    id: 'catfish',
    image: require('../../shared/assets/images/catfish.png'),
    price: 600,
    name: 'Catfish',
  },
  {
    id: 'goldfish',
    image: require('../../shared/assets/images/goldfish.png'),
    price: 600,
    name: 'Goldfish',
  },
  {
    id: 'barracuda',
    image: require('../../shared/assets/images/barracuda.png'),
    price: 600,
    name: 'Barracuda',
  },
  {
    id: 'swordfish',
    image: require('../../shared/assets/images/sword.png'),
    price: 600,
    name: 'Sword',
  },
  {
    id: 'tuna',
    image: require('../../shared/assets/images/tuna.png'),
    price: 600,
    name: 'Tuna',
  },
];

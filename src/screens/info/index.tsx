import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from '../../widgets/navigation.tsx';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';

export const InfoScreen = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigate(ScreenName.Home)}
            style={styles.closeButton}>
            <Image
              style={styles.closeIcon}
              source={require('../../shared/assets/images/close.png')}
            />
          </TouchableOpacity>

          <Text style={styles.header}>About</Text>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.description}>
                Our app – the ultimate fishing adventure game designed for kids,
                families, and anyone who loves the sea! Dive into a world of
                underwater excitement, where learning about fish and marine life
                is just as fun as catching them! Our game combines the joy of
                fishing with quizzes and educational facts, making it perfect
                for young explorers and curious minds. In our app, you’ll
                journey through different levels, each featuring a unique fish
                or underwater creature. Test your knowledge with quizzes, unlock
                new levels, and collect badges as you explore the deep blue sea!
                This game is designed to entertain, educate, and inspire a love
                for our oceans and the amazing creatures that live there.
              </Text>
            </View>
          </ScrollView>
        </View>

        <Navigation />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FDBFF',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    zIndex: 1,
    position: 'absolute',
    right: 30,
    top: 26,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  header: {
    paddingTop: 13,
    fontSize: 42,
    lineHeight: 53,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily:'Montserrat-Bold',
    color: 'white',
  },
  scrollContainer: {
    paddingTop: 13,
  },
  textContainer: {
    padding: 8,
    paddingBottom: 45,
    backgroundColor: '#00A8E8',
  },
  description: {
    fontFamily:'Montserrat-Regular',
    fontSize: 28,
    lineHeight: 35,
    textAlign: 'center',
    color: 'white',
  },
});

import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from '../../widgets/navigation.tsx';
import {useUser} from '../../entities/user';
import {useState} from 'react';

export const StoryShopScreen = () => {
  const {userData, updateUserData} = useUser();
  const [storyToRead, setStoryToRead] = useState<Story | null>(null);

  const shareStory = async (storyText: Story) => {
    try {
      await Share.share({
        title: storyText.name,
        message: storyText.story,
      });
    } catch (error) {
      console.error('Error sharing story:', error);
    }
  };

  const openMap = (latitude: number, longitude: number) => {
    const url = `http://maps.apple.com/?ll=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening map:', err));
  };

  if (storyToRead) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        source={require('../../shared/assets/images/bookstory.jpeg')}>
        <SafeAreaView
          style={{
            flex: 1,
            maxWidth: 400,
            width: '100%',
            paddingTop: 20,
            gap: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#00A8E8',
              borderRadius: 20,
              position: 'relative',
            }}>
            <Image
              style={{
                width: '100%',
                height: 200,
                borderRadius: 20,
              }}
              source={storyToRead.image}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: '#00A8E8',
                padding: 10,
              }}
              onPress={() =>
                openMap(
                  storyToRead.location.latitude,
                  storyToRead.location.longitude,
                )
              }>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require('../../shared/assets/images/location.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                zIndex: 1,
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: '#00A8E8',
                borderRadius: 50,
                padding: 10,
                position: 'absolute',
                right: 10,
                top: 10,
              }}
              onPress={() => {
                setStoryToRead(null);
              }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('../../shared/assets/images/close.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                paddingLeft: 20,
                paddingTop: 20,
                color: 'white',
                fontSize: 24,
              }}>
              {storyToRead.name}
            </Text>
            <ScrollView
              contentContainerStyle={{
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                }}>
                {storyToRead.story}
              </Text>
            </ScrollView>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: '80%',
              borderRadius: 20,
              flexDirection: 'row',
              paddingRight: 50,
              paddingLeft: 50,
              justifyContent: 'space-between',
              height: 55,
              backgroundColor: '#FF6F61',
              alignItems: 'center',
              gap: 10,
            }}
            onPress={() => shareStory(storyToRead)}>
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../../shared/assets/images/share.png')}
            />
            <Text
              style={{
                fontSize: 24,
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              Share story
            </Text>
          </TouchableOpacity>

          <Navigation />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      style={{
        flex: 1,
        alignItems: 'center',
      }}
      source={require('../../shared/assets/images/bookstory.jpeg')}>
      <SafeAreaView
        style={{
          flex: 1,
          maxWidth: 400,
          width: '100%',
          paddingTop: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <ScrollView
          contentContainerStyle={{
            gap: 10,
          }}
          style={{
            width: '100%',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                backgroundColor: 'rgb(183,118,33)',
                borderRadius: 20,
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 34,
                fontFamily: 'Montserrat-Regular',
                color: 'white',
                borderWidth: 2,
                borderColor: 'white',
                height: 50,
              }}>
              Story Shop
            </Text>

            <View
              style={{
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'rgb(183,118,33)',
                borderWidth: 2,
                borderColor: 'white',
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 20,
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                }}>
                {userData?.score || 0}
              </Text>
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                source={require('../../shared/assets/images/score.png')}
              />
            </View>
          </View>

          {STORIES.map(story => (
            <View
              key={story.id}
              style={{
                width: '100%',
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: '#00A8E8',
                position: 'relative',
              }}>
              <Image
                borderRadius={20}
                source={story.image}
                style={{
                  width: '100%',
                  height: 250,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'white',
                  backgroundColor: '#00A8E8',
                  padding: 5,
                }}
                onPress={() =>
                  openMap(story.location.latitude, story.location.longitude)
                }>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require('../../shared/assets/images/location.png')}
                />
              </TouchableOpacity>
              <View
                style={{
                  padding: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Montserrat-Regular',
                    color: 'white',
                  }}>
                  {story.name}
                </Text>
                {(userData?.boughtStories || []).includes(story.id) && (
                  <View
                    style={{
                      marginTop: 10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <TouchableOpacity
                      disabled={Boolean((userData?.score || 0) < story.price)}
                      onPress={() => {
                        setStoryToRead(story);
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          fontFamily: 'Montserrat-Regular',
                          color: 'rgb(183,118,33)',
                        }}>
                        Read story
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {!(userData?.boughtStories || []).includes(story.id) && (
                  <View
                    style={{
                      marginTop: 10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <TouchableOpacity
                      disabled={Boolean((userData?.score || 0) < story.price)}
                      onPress={() => {
                        if (!userData) return;
                        updateUserData({
                          ...userData,
                          score: userData.score - story.price,
                          boughtStories: [
                            ...(userData?.boughtStories || []),
                            story.id,
                          ],
                        });
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Montserrat-Bold',
                          color:
                            (userData?.score || 0) >= story.price
                              ? '#00e804'
                              : 'rgba(232,0,89,0.59)',
                        }}>
                        {(userData?.score || 0) >= story.price
                          ? 'Buy'
                          : 'Not enough points'}
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 5,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: 'white',
                        }}>
                        {story.price}
                      </Text>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        source={require('../../shared/assets/images/score.png')}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <Navigation />
      </SafeAreaView>
    </ImageBackground>
  );
};

interface Story {
  id: string;
  image: ImageSourcePropType;
  price: number;
  story: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const STORIES: Story[] = [
  {
    id: '1',
    image: require('../../shared/assets/images/salmonstory.jpg'),
    price: 500,
    name: "Salmon's Great River Adventure",
    story: `
      Salmon had always known that one day, she would need to swim upriver, just like her ancestors. The journey was a rite of passage—a test of strength and courage. Setting off at dawn, Salmon felt the river's current tugging against her scales as she began her long journey upstream. Along the way, she encountered friendly fish who gave her tips and warnings about the obstacles ahead.

      As she pushed on, she encountered rocky rapids that tried to pull her back downstream. Salmon had to leap high into the air to clear each one, catching glimpses of the sunrise above. One morning, after a night of swimming, she met Beaver, who was busy building his dam. Beaver offered her a shortcut around a particularly treacherous waterfall. Grateful for the help, Salmon continued on, growing stronger with each passing day.

      Finally, after days of perseverance and countless leaps, Salmon reached the tranquil pool at the end of her journey. Exhausted but triumphant, she marveled at how far she had come, ready to complete the final part of her adventure.
    `,
    location: {latitude: 58.3019, longitude: -134.4197},
  },
  {
    id: '2',
    image: require('../../shared/assets/images/tunastory.jpg'),
    price: 500,
    name: "Tuna's Journey Across the Ocean",
    story: `
      Tuna had always dreamed of the open ocean. One night, as the stars sparkled above, he decided to leave his familiar coral reef and venture into the unknown. The vast, open water was both exhilarating and a little scary. The deeper he swam, the more wonders he discovered—colorful coral gardens, forests of seaweed, and schools of shimmering fish who danced with him in the currents.

      One day, Tuna encountered a pod of dolphins. They invited him to join their playful games, leaping and spinning in the waves. Tuna felt like he was flying as he jumped alongside them, feeling the wind on his fins. But the joy of the game was short-lived when a dark shadow appeared in the water below—a shark!

      With the dolphins' guidance, Tuna learned to dart and weave through the water, outsmarting the predator. After a thrilling chase, the shark gave up, and Tuna continued his journey, forever grateful for his new friends. His heart swelled with pride and excitement, knowing he had braved the vast ocean and all its challenges.
    `,
    location: {latitude: 35.6895, longitude: 139.6917},
  },
  {
    id: '3',
    image: require('../../shared/assets/images/marlinstory.jpg'),
    price: 500,
    name: "Marlin's Deep Sea Mystery",
    story: `
      Marlin had always been curious about what lay in the deep, dark waters below the reef. One day, he finally decided to explore, diving deeper and deeper until the sunlight faded into darkness. Strange creatures with glowing bodies flitted around him, lighting up the water in mesmerizing patterns. Marlin was both fascinated and a little nervous as he swam further into the depths.

      Suddenly, he noticed something shimmering in the distance—a hidden cave filled with treasures from the ocean’s past. There were ancient seashells, glimmering jewels, and old artifacts from shipwrecks long ago. As Marlin explored the cave, he stumbled upon a mysterious map carved into the rock, showing a path to an even greater treasure.

      Just then, a giant octopus appeared, guarding the cave. Marlin had to use all his agility to avoid the octopus's tentacles, weaving in and out of the treasure-filled cavern. With a final burst of speed, Marlin escaped the cave, carrying a single pearl as a reminder of his daring adventure. The mystery of the ocean’s depths would stay with him forever.
    `,
    location: {latitude: 24.5557, longitude: -81.7826},
  },
  {
    id: '4',
    image: require('../../shared/assets/images/clownfishstory.jpg'),
    price: 500,
    name: 'Clownfish and the Coral Kingdom',
    story: `
      Clownfish lived in a bustling coral kingdom, where fish of all colors swam in harmony. One day, a strange current brought a mysterious golden shell to the kingdom. Intrigued, Clownfish swam up to it, only to find that the shell was a key to a hidden part of the reef—a secret garden known only to the oldest fish in the kingdom.

      Gathering his courage, Clownfish took the shell and unlocked the entrance to the secret garden. Inside, he found a magical underwater world filled with glowing plants, colorful corals, and ancient statues covered in moss. But there was a problem—a large seaweed creature had taken over the garden, scaring away any fish who dared to enter.

      Clownfish, determined to protect his kingdom, bravely approached the creature. With the help of his friends, he tricked the seaweed monster into leaving, restoring peace to the coral kingdom. The fish celebrated by exploring their new garden, grateful to Clownfish for his bravery.
    `,
    location: {latitude: -8.3405, longitude: 115.092},
  },
  {
    id: '5',
    image: require('../../shared/assets/images/pufferfishstory.jpg'),
    price: 500,
    name: "Pufferfish's Bubble Adventure",
    story: `
      Pufferfish loved playing with bubbles. One day, he discovered a mysterious, magical bubble floating in the water. Curiosity got the best of him, and he jumped inside. To his surprise, the bubble lifted him up and carried him on a journey through the ocean. Everywhere he went, fish stared in awe as Pufferfish floated past, safe inside his bubble.

      As he traveled, Pufferfish saw amazing sights—a field of bioluminescent jellyfish, schools of fish that formed beautiful patterns, and even a pod of playful dolphins who tried to pop his bubble! When the bubble finally burst, Pufferfish found himself on a gentle sea turtle's back, who gave him a ride back home.

      Pufferfish returned to his reef with stories of his magical journey. His friends listened in awe, and from that day on, they looked at bubbles in a whole new way.
    `,
    location: {latitude: 26.8206, longitude: 30.8025},
  },
  {
    id: '6',
    image: require('../../shared/assets/images/angelfishstory.jpg'),
    price: 500,
    name: 'Angelfish and the Shimmering Reef',
    story: `
      Angelfish was known for her beauty and grace, gliding elegantly through the reef. One day, she heard rumors of a hidden Shimmering Reef—a place where the corals glowed in radiant colors, lighting up the water like a starry night. Intrigued, Angelfish set out to find it. She swam past familiar territories, asking other fish and following faint trails of light that seemed to lead her forward.

      After hours of swimming, she finally arrived at the Shimmering Reef. The sight took her breath away—corals of all colors glowed in the dark, lighting up the water in shades of pink, blue, and green. She swam through the glowing forest, feeling like she was in a dream. 

      Suddenly, she noticed a pearl caught in a tangle of seaweed, its soft glow hidden. Remembering the kindness she received along her journey, Angelfish freed the pearl, causing the entire reef to shine even brighter. She returned home with tales of the magical Shimmering Reef, a memory she would cherish forever.
    `,
    location: {latitude: -14.235, longitude: -51.9253},
  },
  {
    id: '7',
    image: require('../../shared/assets/images/catfishstory.jpg'),
    price: 500,
    name: 'Catfish and the Hidden Treasure',
    story: `
      Catfish was always a curious soul, known for rummaging through the sand and exploring hidden nooks of the riverbed. One day, he uncovered a shiny metal box partially buried in the sand. Excited, he called over his friends and together, they managed to open the box to reveal a weathered old map inside.

      The map showed a path to a hidden treasure, marked with mysterious symbols and landmarks. Catfish eagerly followed the map, navigating through tunnels and past rocky outcrops. Along the way, he encountered tricky puzzles and clues that tested his wits. After hours of searching, he finally reached a hidden cove with a sparkling chest at the center.

      Inside the chest, Catfish found glistening shells, pearls, and ancient trinkets. But the greatest treasure was a beautiful amulet with a glowing gem. Catfish returned home, his heart full of excitement and pride, knowing that his curiosity had led him to a treasure beyond his wildest dreams.
    `,
    location: {latitude: 33.749, longitude: -84.388},
  },
  {
    id: '8',
    image: require('../../shared/assets/images/goldfishstory.jpg'),
    price: 500,
    name: 'Goldfish and the Magic Pond',
    story: `
      Goldfish lived in a quiet pond at the edge of a forest. It was a peaceful life, but she often found herself daydreaming about adventures. One sunny afternoon, she noticed a sparkling path of light dancing across the water. Following it, she discovered an enchanted part of the pond that seemed to glow with magic.

      As she swam closer, the plants around her began to sing, and the water sparkled with tiny bubbles that danced around her. Goldfish felt as though she had entered a magical realm. She met other creatures she had never seen before—glowing dragonflies, shimmering turtles, and even a wise old frog who told her the secrets of the pond.

      By the time she returned home, Goldfish knew she had experienced something extraordinary. She had discovered a secret world within her pond, one she would revisit in her dreams, forever cherishing the magic she found.
    `,
    location: {latitude: 34.0522, longitude: -118.2437},
  },
  {
    id: '9',
    image: require('../../shared/assets/images/barracudastory.jpg'),
    price: 500,
    name: "Barracuda's Brave Encounter",
    story: `
      Barracuda was known for his speed and agility. While exploring a new part of the reef, he heard whispers of a great predator lurking in the depths—a creature feared by all who ventured too close. Curious and unafraid, Barracuda decided to investigate, determined to uncover the truth.

      As he swam deeper into the ocean, the water grew darker, and an eerie silence surrounded him. Suddenly, he saw a shadow moving through the water—a massive shark with sharp teeth and piercing eyes. The shark circled him, and Barracuda knew he had to rely on his wits and speed to escape.

      Using every ounce of his strength, Barracuda darted and weaved, outmaneuvering the shark in a thrilling chase. Just as the shark was about to catch him, Barracuda dove into a narrow crevice, leaving the predator behind. Emerging from the depths, Barracuda was hailed as a hero, admired for his bravery and skill.
    `,
    location: {latitude: 18.1096, longitude: -77.2975},
  },
  {
    id: '10',
    image: require('../../shared/assets/images/swordfishstory.jpg'),
    price: 500,
    name: "Swordfish's Daring Duel",
    story: `
      Swordfish was known as the fastest swimmer in the ocean, with a sharp bill and fearless spirit. One day, he heard rumors of another swordfish challenging his title, claiming to be the fastest and most skilled fighter in the sea. Swordfish couldn’t resist the call and set off to meet his challenger.

      The two swordfish met at sunrise in a wide-open area of the ocean, surrounded by onlookers. They circled each other, their fins cutting through the water like blades. The duel was fierce and breathtaking, each one showing skill and strength, darting and weaving in a thrilling display of speed.

      After hours of battling, Swordfish finally gained the upper hand, proving himself to be the fastest and most skilled. The two swordfish, now respecting each other, swam off as friends, with Swordfish knowing he had met a worthy opponent. His legend grew even more, as tales of his duel spread across the ocean.
    `,
    location: {latitude: 36.2048, longitude: 138.2529},
  },
];

import {ImageSourcePropType} from 'react-native';

export interface Question {
  text: string;
  variants: string[];
  correctAnswer: string;
}

export interface Level {
  id: number;
  title: string;
  questions: Question[];
  image: ImageSourcePropType;
  fact: string;
}

export const levels: Level[] = [
  {
    id: 1,
    image: require('./shared/assets/images/a.jpg'),
    title: 'Level 1: Salmon',
    fact: 'Salmon are known for their incredible migratory journeys, traveling from freshwater rivers to the ocean and back to spawn. They are also known for their ability to jump waterfalls and navigate through strong currents. Salmon are anadromous fish, meaning they migrate from freshwater rivers to the ocean and back to spawn. This journey can be thousands of miles long and is a remarkable feat of endurance and navigation. Salmon are one of the few fish that can live in both fresh and saltwater, adjusting their bodies as they move between the ocean and rivers.',
    questions: [
      {
        text: 'Salmon are known to migrate to which type of water to spawn?',
        variants: ['Saltwater', 'Freshwater', 'Both', 'Neither'],
        correctAnswer: 'Freshwater',
      },
      {
        text: 'Which ocean is home to salmon?',
        variants: ['Atlantic', 'Pacific', 'Both', 'Indian'],
        correctAnswer: 'Both',
      },
      {
        text: 'Salmon are known for their ability to:',
        variants: [
          'Jump waterfalls',
          'Swim slowly',
          'Live in the desert',
          'Produce electricity',
        ],
        correctAnswer: 'Jump waterfalls',
      },
      {
        text: 'How long can salmon live?',
        variants: [
          'Up to 5 years',
          'Up to 10 years',
          'More than 20 years',
          'Up to 50 years',
        ],
        correctAnswer: 'Up to 10 years',
      },
      {
        text: 'What type of diet do salmon primarily follow?',
        variants: ['Herbivorous', 'Carnivorous', 'Omnivorous', 'Detritivorous'],
        correctAnswer: 'Carnivorous',
      },
    ],
  },
  {
    id: 2,
    image: require('./shared/assets/images/s.jpg'),
    title: 'Level 2: Tuna',
    fact: 'Tuna are known for their incredible speed and endurance, reaching speeds of up to 40 mph. They are also able to regulate their body temperature, allowing them to thrive in a variety of ocean environments. Tuna are among the fastest swimmers in the ocean, reaching speeds over 40 miles per hour! This speed helps them chase down prey and escape from predators.',
    questions: [
      {
        text: 'What speed can tuna reach when swimming?',
        variants: ['10 mph', '20 mph', '40 mph', '60 mph'],
        correctAnswer: '40 mph',
      },
      {
        text: 'Tuna are known for their ability to regulate their:',
        variants: ['Body temperature', 'Breathing', 'Weight', 'Fin length'],
        correctAnswer: 'Body temperature',
      },
      {
        text: 'Where do tuna primarily live?',
        variants: ['Freshwater', 'Saltwater', 'Both', 'Neither'],
        correctAnswer: 'Saltwater',
      },
      {
        text: 'The largest species of tuna is:',
        variants: ['Yellowfin', 'Bluefin', 'Skipjack', 'Albacore'],
        correctAnswer: 'Bluefin',
      },
      {
        text: 'What type of diet do tuna follow?',
        variants: ['Herbivorous', 'Carnivorous', 'Omnivorous', 'Detritivorous'],
        correctAnswer: 'Carnivorous',
      },
    ],
  },
  {
    id: 3,
    title: 'Level 3: Clownfish',
    image: require('./shared/assets/images/d.jpg'),
    fact: "Clownfish are known for their symbiotic relationship with sea anemones. They are immune to the stings of sea anemones and use them for protection from predators. Clownfish are also known for their unique communication style, making popping sounds to interact with each other. Clownfish have a unique relationship with sea anemones. They are immune to the anemone's stings, and this partnership helps protect the clownfish from predators!",
    questions: [
      {
        text: 'Clownfish have a symbiotic relationship with:',
        variants: ['Coral', 'Sea anemones', 'Seaweed', 'Sponges'],
        correctAnswer: 'Sea anemones',
      },
      {
        text: 'Where are clownfish found?',
        variants: [
          'Atlantic Ocean',
          'Indian and Pacific Oceans',
          'Arctic Ocean',
          'Mediterranean Sea',
        ],
        correctAnswer: 'Indian and Pacific Oceans',
      },
      {
        text: 'Clownfish are immune to the stings of:',
        variants: ['Jellyfish', 'Sea anemones', 'Stingrays', 'Corals'],
        correctAnswer: 'Sea anemones',
      },
      {
        text: 'All clownfish are born as:',
        variants: ['Males', 'Females', 'Hermaphrodites', 'Larvae'],
        correctAnswer: 'Males',
      },
      {
        text: 'Clownfish communicate by:',
        variants: [
          'Making popping sounds',
          'Changing colors',
          'Singing',
          'Blinking',
        ],
        correctAnswer: 'Making popping sounds',
      },
    ],
  },
  {
    id: 4,
    title: 'Level 4: Catfish',
    image: require('./shared/assets/images/g.jpg'),
    fact: 'Catfish are known for their distinctive barbels, which are sensory organs that help them locate food in murky waters. These fish are primarily found in freshwater habitats. Catfish have special whisker-like barbels around their mouths that help them sense food in murky waters, making them excellent nighttime hunters!',
    questions: [
      {
        text: 'Catfish have which distinctive feature around their mouths?',
        variants: ['Scales', 'Fins', 'Barbels', 'Spikes'],
        correctAnswer: 'Barbels',
      },
      {
        text: 'Catfish are primarily found in:',
        variants: ['Saltwater', 'Freshwater', 'Both', 'Neither'],
        correctAnswer: 'Freshwater',
      },
      {
        text: 'Catfish use their sense of smell and taste to:',
        variants: [
          'Find mates',
          'Locate food',
          'Hide from predators',
          'Build nests',
        ],
        correctAnswer: 'Locate food',
      },
      {
        text: 'Catfish have bodies covered with:',
        variants: ['Scales', 'Smooth skin', 'Spines', 'Feathers'],
        correctAnswer: 'Smooth skin',
      },
      {
        text: 'Some catfish species can produce:',
        variants: ['Electric shocks', 'Venom', 'Oil', 'Bubbles'],
        correctAnswer: 'Electric shocks',
      },
    ],
  },
  {
    id: 5,
    title: 'Level 5: Goldfish',
    image: require('./shared/assets/images/h.jpg'),
    fact: 'Goldfish are one of the most popular aquarium fish worldwide. They come in a variety of colors and patterns, making them a favorite among fish enthusiasts!Goldfish can live for over 20 years with proper care! They also have a memory span that can last several months, allowing them to recognize their owners.',
    questions: [
      {
        text: 'Goldfish originated in:',
        variants: ['Europe', 'South America', 'East Asia', 'Africa'],
        correctAnswer: 'East Asia',
      },
      {
        text: 'Goldfish have a memory span of:',
        variants: ['A few seconds', 'A few minutes', 'Months', 'Years'],
        correctAnswer: 'Months',
      },
      {
        text: 'Goldfish can recognize:',
        variants: [
          'Their owners',
          'Other species',
          'Predators',
          'Specific objects',
        ],
        correctAnswer: 'Their owners',
      },
      {
        text: 'Under proper care, goldfish can live up to:',
        variants: ['5 years', '10 years', '20 years', '50 years'],
        correctAnswer: '20 years',
      },
      {
        text: 'Goldfish are:',
        variants: ['Carnivorous', 'Herbivorous', 'Omnivorous', 'Insectivorous'],
        correctAnswer: 'Omnivorous',
      },
    ],
  },
  {
    id: 6,
    title: 'Level 6: Barracuda',
    image: require('./shared/assets/images/j.jpg'),
    fact: 'Barracudas are known for their sharp teeth and lightning-fast reflexes, making them effective hunters.',
    questions: [
      {
        text: 'What is a distinctive feature of barracudas?',
        variants: ['Blunt teeth', 'Sharp teeth', 'Flat body', 'Curved tail'],
        correctAnswer: 'Sharp teeth',
      },
      {
        text: 'Barracudas are primarily found in which waters?',
        variants: ['Freshwater', 'Saltwater', 'Both', 'Neither'],
        correctAnswer: 'Saltwater',
      },
      {
        text: 'Barracudas are known for their:',
        variants: [
          'Slow movement',
          'Fast reflexes',
          'Herbivorous diet',
          'Bright colors',
        ],
        correctAnswer: 'Fast reflexes',
      },
      {
        text: 'How long can some barracuda species grow?',
        variants: ['1 foot', '3 feet', '5 feet', 'Over 6 feet'],
        correctAnswer: 'Over 6 feet',
      },
      {
        text: 'Barracudas are primarily:',
        variants: ['Omnivorous', 'Carnivorous', 'Herbivorous', 'Detritivorous'],
        correctAnswer: 'Carnivorous',
      },
    ],
  },
  {
    id: 7,
    title: 'Level 7: Angelfish',
    image: require('./shared/assets/images/k.jpg'),
    fact: 'Angelfish are popular in the aquarium trade for their colorful appearance and unique body shape.',
    questions: [
      {
        text: 'Angelfish are primarily found in:',
        variants: ['Freshwater', 'Saltwater', 'Both', 'Neither'],
        correctAnswer: 'Both',
      },
      {
        text: 'What is a defining feature of angelfish?',
        variants: [
          'Flattened, disc-like body',
          'Long, streamlined body',
          'Bright red color',
          'Thick scales',
        ],
        correctAnswer: 'Flattened, disc-like body',
      },
      {
        text: 'Angelfish can change color to:',
        variants: [
          'Hide from predators',
          'Communicate with other fish',
          'Absorb more sunlight',
          'Attract prey',
        ],
        correctAnswer: 'Communicate with other fish',
      },
      {
        text: 'Angelfish are mostly found in which regions?',
        variants: ['Polar', 'Tropical', 'Desert', 'Mountainous'],
        correctAnswer: 'Tropical',
      },
      {
        text: 'In aquariums, angelfish are known for their:',
        variants: [
          'Longevity',
          'Aggressive behavior',
          'Color-changing abilities',
          'Rapid swimming',
        ],
        correctAnswer: 'Color-changing abilities',
      },
    ],
  },
  {
    id: 8,
    title: 'Level 8: Pufferfish',
    image: require('./shared/assets/images/l.jpg'),
    fact: 'Pufferfish can inflate their bodies to defend against predators, and many species contain a toxic substance.',
    questions: [
      {
        text: 'Pufferfish are also known as:',
        variants: ['Blowfish', 'Ballfish', 'Spinefish', 'Bubblefish'],
        correctAnswer: 'Blowfish',
      },
      {
        text: 'Pufferfish can inflate to protect themselves from:',
        variants: ['Prey', 'Predators', 'Other pufferfish', 'Food'],
        correctAnswer: 'Predators',
      },
      {
        text: 'Many pufferfish contain a toxic substance called:',
        variants: ['Tetrodotoxin', 'Cyanide', 'Botulinum', 'Arsenic'],
        correctAnswer: 'Tetrodotoxin',
      },
      {
        text: 'Pufferfish are primarily found in which environment?',
        variants: ['Freshwater', 'Saltwater', 'Both', 'Desert lakes'],
        correctAnswer: 'Saltwater',
      },
      {
        text: 'Pufferfish have which defensive feature?',
        variants: [
          'Electric shock',
          'Poisonous spikes',
          'Color-changing scales',
          'Venomous bite',
        ],
        correctAnswer: 'Poisonous spikes',
      },
    ],
  },
  {
    id: 9,
    title: 'Level 9: Marlin',
    image: require('./shared/assets/images/q.jpg'),
    fact: 'Marlin are known for their long, spear-like snouts and can leap out of the water at high speeds.',
    questions: [
      {
        text: 'Marlin are known for their:',
        variants: [
          'Round bodies',
          'Long, spear-like snouts',
          'Short fins',
          'Color-changing scales',
        ],
        correctAnswer: 'Long, spear-like snouts',
      },
      {
        text: 'Marlin are primarily found in which type of water?',
        variants: ['Freshwater', 'Saltwater', 'Both', 'Neither'],
        correctAnswer: 'Saltwater',
      },
      {
        text: 'What is a unique ability of marlin?',
        variants: [
          'Leaping out of the water',
          'Color-changing',
          'Electric shock',
          'Making sounds',
        ],
        correctAnswer: 'Leaping out of the water',
      },
      {
        text: 'Marlin can reach speeds up to:',
        variants: ['20 mph', '50 mph', '80 mph', '100 mph'],
        correctAnswer: '50 mph',
      },
      {
        text: 'The largest species of marlin is:',
        variants: [
          'Blue marlin',
          'Striped marlin',
          'White marlin',
          'Black marlin',
        ],
        correctAnswer: 'Blue marlin',
      },
    ],
  },
  {
    id: 10,
    title: 'Level 10: Swordfish',
    image: require('./shared/assets/images/i.jpg'),
    fact: 'Swordfish have long, flat bills and are one of the few fish that can heat their eyes and brain for better vision.',
    questions: [
      {
        text: 'Swordfish have which distinctive feature?',
        variants: [
          'Long, flat bill',
          'Bright colors',
          'Multiple fins',
          'Round bodies',
        ],
        correctAnswer: 'Long, flat bill',
      },
      {
        text: 'Swordfish can heat their:',
        variants: ['Eyes and brain', 'Tail', 'Fins', 'Entire body'],
        correctAnswer: 'Eyes and brain',
      },
      {
        text: 'Swordfish are found in which oceans?',
        variants: [
          'Atlantic and Pacific',
          'Indian and Arctic',
          'All oceans',
          'Mediterranean only',
        ],
        correctAnswer: 'Atlantic and Pacific',
      },
      {
        text: 'Swordfish can reach speeds up to:',
        variants: ['10 mph', '20 mph', '60 mph', '100 mph'],
        correctAnswer: '60 mph',
      },
      {
        text: 'What type of diet do swordfish follow?',
        variants: ['Herbivorous', 'Carnivorous', 'Omnivorous', 'Detritivorous'],
        correctAnswer: 'Carnivorous',
      },
    ],
  },
];

export interface User {
  score: number;
  nickname: string;
  avatar: string;
  dailyTaskLastPlayedAt: number;
  lastGiftClaim: number;
  dailyEarnedScore: number;
  isOnboarded: boolean;
  boughtFishes: Fish[];
  boughtStories: string[];
}

interface Fish {
  id: string;
  count: number;
}

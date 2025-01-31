import {createContext, useContext} from 'react';
import {User} from './types.ts';

interface UserContextProps {
  userData: User | null;
  updateUserData: (newState: User) => Promise<void>;
  resetUserData: () => void;
  resetUserProgress: () => void;
  loading: boolean;
}
export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  return context;
};

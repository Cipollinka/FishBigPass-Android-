import React, {ReactNode, useEffect} from 'react';
import {ScreenName, useNavigation} from '../../shared/lib/use-navigation.ts';
import {useUser} from '../../entities/user';

export const NavigationProvider = ({children}: {children: ReactNode}) => {
  const {navigate} = useNavigation();

  const {userData, loading} = useUser();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (userData?.isOnboarded) {
      const lastGiftClaim = userData.lastGiftClaim;
      const currentTime = Date.now();
      const day = 24 * 60 * 60 * 1000;
      if (currentTime - lastGiftClaim < day) {
        navigate(ScreenName.Home);
      } else {
        navigate(ScreenName.Reward);
      }
    } else {
      navigate(ScreenName.Register);
    }
  }, [userData?.avatar, userData?.nickname, loading]);

  return <>{children}</>;
};

import React, {ReactNode} from 'react';
import {UserContext, useUserData} from '../../entities/user';

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {userData, loading, updateUserData, resetUserData, resetUserProgress} =
    useUserData();

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        updateUserData,
        resetUserData,
        resetUserProgress,
      }}>
      {children}
    </UserContext.Provider>
  );
};

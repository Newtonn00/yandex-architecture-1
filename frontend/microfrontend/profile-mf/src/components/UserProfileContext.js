// UserProfileContext.js в МФ profile
import React, { createContext, useEffect, useState } from 'react';
import api from '../utils/api'
export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    _id: '',
    name: '',
    avatar: '',
  });
  const [isLoading, setIsLoading] = useState(false)



    // Загрузка данных профиля
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setIsLoading(true);
      api
        .getUserProfile(token)
        .then((data) => {
          setUserProfile({
            _id: data.id,
            name: data.name,
            about: data.about,
            avatar: data.avatar,
          });
        })
        .catch((err) => console.error('Ошибка загрузки профиля:', err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

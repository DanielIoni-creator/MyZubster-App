import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    loadLocale();
  }, []);

  const loadLocale = async () => {
    try {
      const saved = await AsyncStorage.getItem('@MyZubster:locale');
      if (saved) {
        setLocale(saved);
        i18n.locale = saved;
      } else {
        const deviceLocale = Localization.locale.split('-')[0];
        const supported = ['en', 'it', 'es', 'fr'];
        const defaultLocale = supported.includes(deviceLocale) ? deviceLocale : 'en';
        setLocale(defaultLocale);
        i18n.locale = defaultLocale;
      }
    } catch (error) {
      console.error('Errore caricamento lingua:', error);
    }
  };

  const changeLanguage = async (lang) => {
    if (['en', 'it', 'es', 'fr'].includes(lang)) {
      setLocale(lang);
      i18n.locale = lang;
      await AsyncStorage.setItem('@MyZubster:locale', lang);
    }
  };

  const t = (key, params = {}) => {
    return i18n.t(key, params);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
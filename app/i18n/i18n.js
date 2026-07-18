import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './locales/en';
import it from './locales/it';
import es from './locales/es';
import fr from './locales/fr';

const i18n = new I18n({
  en,
  it,
  es,
  fr,
});

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
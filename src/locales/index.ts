// messages: {
//   en: {
//     pages: {
//       login: {
//         appRestriction: "App is restricted for now",
//         loginButtonDiscord: "Log in with Discord",
//       },
//     },
//   },

import { createI18n } from "vue-i18n";
import en from "./en";
import Message from "~/locales/interfaces/message.interface";

const messages: Message = {
  en,
};

const i18n = createI18n({
  allowComposition: true,
  availableLocales: Object.keys(messages),
  locale: "en",
  fallbackLocale: "en",
  messages: messages as any,
});

export default i18n;

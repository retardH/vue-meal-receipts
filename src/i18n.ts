// @ts-ignore
import en from "./locales/en";
// @ts-ignore
import zh from "./locales/zh";
// @ts-ignore
import { createI18n } from "vue-i18n";
import type { App, InjectionKey, Plugin } from "vue";
export const i18nKey: InjectionKey<Plugin> = Symbol("i18n");

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, zh },
});
export function setUpi18n(app: App) {
  app.use(i18n);
  app.provide(i18nKey, i18n);
}

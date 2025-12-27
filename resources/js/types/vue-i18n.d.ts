import 'vue-i18n'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    en: object
    prs: object
    ps: object
  }

  export interface LocaleMessages {
    en: object
    prs: object
    ps: object
  }

  // Extend locale Ref type to include 'ps'
  export interface Composer {
    locale: import('vue').Ref<'en' | 'prs' | 'ps'>
  }
}

import { createI18n } from 'vue-i18n'

export const messages = {
  en: {
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome to your Arman MIS Dashboard',
      description:
        'This is your dashboard where you can manage your application and view important metrics.',
    },
    menu: {
      repository: 'Repository',
      documentation: 'Documentation',
    },
  },

  prs: {
    dashboard: {
      title: 'داشبورد',
      welcome: 'به داشبورد سیستم آرمان خوش آمدید',
      description:
        'این داشبورد شما است که در آن می‌توانید سیستم خود را مدیریت کرده و اطلاعات مهم را مشاهده نمایید.',
    },
    menu: {
      repository: 'مخزن',
      documentation: 'مستندات',
    },
  },
   ps: {
    dashboard: {
      title: 'ډشبورډ',
      welcome: 'ستاسو د آرمان MIS ډشبورډ ته ښه راغلاست',
      description:
        'دا ستاسو ډشبورډ دی چیرې چې تاسو کولی شئ خپل غوښتنلیک اداره کړئ او مهم میټرکسونه وګورئ.',
    },
    menu: {
      repository: 'ذخیره',
      documentation: 'مستندات',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})


import './assets/main.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          background: '#F5F5F5',
          surface: '#FFFFFF',
          primary: '#4F46E5',
          secondary: '#0EA5E9',
          accent: '#F97316',
          error: '#DC2626',
          info: '#0284C7',
          success: '#16A34A',
          warning: '#F59E0B',
        },
      },
      customDark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#818CF8',
          secondary: '#38BDF8',
          accent: '#FB923C',
          error: '#F87171',
          info: '#38BDF8',
          success: '#4ADE80',
          warning: '#FCD34D',
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')

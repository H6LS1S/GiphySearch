import NuxtConfiguration from '@nuxt/config';

import { ConfigService } from './utils/config/config.service';
const configService = new ConfigService();

const config: NuxtConfiguration = {
  /*
   ** Server options
   */
  server: {
    port: configService.getSetting('APP_PORT'),
    timing: configService.getSetting('APP_TIMG'),
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${configService.getSetting('APP_NAME')}`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: configService.getSetting('APP_DESC'),
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [ '~/mixins' ],
  /*
   * Build configuration
   */

  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'http://127.0.0.1:8081/api',
  },

  build: {
    extractCSS: true,
    transpile: ['vuetify/lib'],
    plugins: [],
    typescript: {
      typeCheck: true,
    },
  },
};

export default config;

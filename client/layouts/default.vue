<template>
  <v-app>
    <v-app-bar
      app
      dark
      prominent
      shrink-on-scroll
      elevate-on-scroll
      fade-img-on-scroll
      color="primary"
    >
      <template v-slot:img>
        <v-img :src="getBackground()" :gradient="getGradient()" />
      </template>

      <v-app-bar-nav-icon @click="$router.go(-1)">
        <v-icon v-html="changeIcon()" />
      </v-app-bar-nav-icon>

      <v-toolbar-title>GiphySearch</v-toolbar-title>

      <v-spacer />

      <v-btn
        v-for="(page, i) in pages"
        :key="i"
        :to="page.path"
        exact
        dark
        icon
        class="mx-3"
      >
        <v-icon v-html="page.icon" />
      </v-btn>

      <v-btn
        href="https://github.com/HELSIS666/GiphySearch"
        target="_blank"
        dark
        icon
        class="mx-3 white--text"
      >
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer padless dark>
      <v-card flat tile width="100%" class="primary text-xs-center">
        <v-card-text>
          <v-btn
            v-for="(page, i) in pages"
            :key="i"
            :to="page.path"
            exact
            dark
            icon
            class="mx-3"
          >
            <v-icon v-html="page.icon" />
          </v-btn>

          <v-btn
            href="https://github.com/HELSIS666/GiphySearch"
            target="_blank"
            dark
            icon
            class="mx-3 white--text"
          >
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>GiphySearch</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  middleware: ['auth'],
})
export default class DefaultLayuot extends Vue {
  pages = [
    { path: '/', icon: 'mdi-magnify' },
    { path: '/history', icon: 'mdi-heart-outline' },
  ];

  window = {
    width: 0,
    height: 0,
  };

  mounted() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  getBackground() {
    const { width, height } = this.window;
    return `https://picsum.photos/${width}/${height}?random`;
  }

  changeIcon() {
    if (this.$route.path === '/') {
      return 'mdi-home';
    }
    return 'mdi-arrow-left';
  }

  getGradient() {
    return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
  }
}
</script>

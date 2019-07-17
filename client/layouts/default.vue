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

      <v-app-bar-nav-icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>GiphySearch</v-toolbar-title>

      <v-spacer />

      <PageLink v-for="(page, i) in getPages" :key="i" :page="page"/>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer padless dark>
      <v-card flat tile width="100%" class="primary text-xs-center">
        <v-card-text>
          <PageLink v-for="(page, i) in getPages" :key="i" :page="page"/>
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
import { mapGetters} from 'vuex';

@Component({
  middleware: ['auth'],
  components: {
    PageLink: () => import('~/components/PageLink')
  },
  computed: {
    ...mapGetters(['getPages']),
  },
})
export default class DefaultLayuot extends Vue {
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

  getGradient() {
    return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
  }

  logout() {
    return this.$auth.logout();
  }
}
</script>

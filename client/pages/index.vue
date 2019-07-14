<template>
  <v-container grid-list-lg fill-height>
    <v-layout align-center justify-cente row wrap>
      <v-flex v-for="(item, i) in data" :key="i" xs12 sm6 md4 lg3 xl2>
        <v-card>
          <v-img
            :src="item.src"
            :lazy-src="item.lazy"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout align-center justify-center fill-height>
                <v-progress-circular indeterminate color="primary" />
              </v-layout>
            </template>
          </v-img>

          <v-card-actions>
            <span class="text-truncate">Tag</span>
            <v-spacer />
            <span>{{ item.likes }}</span>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  head: {
    title: 'Home',
  },
})
export default class HomePage extends Vue {
  data = new Array(Math.floor(Math.random() * 10)).fill('').map((item, i) => ({
    src: `https://picsum.photos/1366/728?image${i}.jpg`,
    lazy: `https://picsum.photos/25/10?image${i}.jpg`,
    likes: Math.floor(Math.random() * 10),
  }));
}
</script>

<template>
  <v-container py-0>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item
        v-for="(item, i) in data"
        :key="i"
        fill-dot
        icon="mdi-pound"
      >
        <v-layout align-center justify-start wrap pt-1>
          <span v-html="item.phrase" class="title" />
          <v-spacer />
          <span v-html="toFormatDate(item.createAt)" class="grey--text" />
          <v-flex v-if="item.favorites.length" xs12>
            <v-container grid-list-md pa-0>
              <span class="caption mb-2 grey--text">Favorites:</span>
              <v-layout align-center justify-start row wrap>
                <v-flex
                  v-for="(favorite, j) in item.favorites"
                  :key="j"
                  xs4
                  sm3
                  md3
                >
                  <v-img :src="favorite.src" aspect-ratio="1" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  head: {
    title: 'History',
  },
})
export default class HistoryPage extends Vue {
  data = new Array(Math.floor(Math.random() * 10)).fill('').map((item, i) => ({
    phrase: i,
    createAt: new Date(),
    favorites: new Array(Math.floor(Math.random() * 10))
      .fill('')
      .map((item, i) => ({
        src: `https://picsum.photos/600/600?image${i}.jpg`,
      })),
  }));

  toFormatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
</script>

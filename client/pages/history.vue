<template>
  <v-container py-0>
    <v-timeline :dense="denseTimeline">
      <v-timeline-item
        v-for="(item, i) in getHistory" :key="i"
        fill-dot icon="mdi-pound"
      >
        <v-layout align-center justify-start wrap pt-1>
          <span v-html="item.tag" class="title" />
          <v-spacer />
          <span v-html="toFormatDate(item.createAt)" class="grey--text" />
          <v-flex v-if="item.favorites" xs12>
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
import { mapGetters } from 'vuex';

@Component({
  head: {
    title: 'History',
  },
  computed: {
    ...mapGetters(['getHistory']),

    denseTimeline() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  async fetch({ store }) {
    return await store.dispatch('selectHistory')
  }
})
export default class HistoryPage extends Vue {}
</script>

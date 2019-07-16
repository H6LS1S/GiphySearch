<template>
  <v-container grid-list-lg fill-height>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12>
        <v-text-field
          :value="getCurrentTag"
          shaped
          rounded
          outlined
          clearable
          label="Search"
          @change="searchByTag"
        />
      </v-flex>
      <v-flex
        v-for="(item, i) in getGallety" :key="i"
        xs12 sm6 md4 lg3 xl2
      >
        <v-card>
          <v-img
            :src="item.images['480w_still'].url"
            :lazy-src="item.images['480w_still'].url"
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
            <span class="text-truncate">{{ item.title }}</span>
            <v-spacer />
            <span>{{ item.likes }}</span>
            <v-btn icon @click="toogleLike(item.id)">
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
import { mapGetters, mapActions } from 'vuex';

@Component({
  head: {
    title: 'Home',
  },
  computed: {
    ...mapGetters(['getGallety', 'getCurrentTag']),
  },
  methods: {
    ...mapActions(['searchByTag']),
  },
  async fetch({ store }) {
    return await store.dispatch('selectGallery')
  }
})
export default class HomePage extends Vue {}
</script>

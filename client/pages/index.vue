<template>
  <v-container grid-list-lg fill-height>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12>
        <v-autocomplete
          :items="getHistory"
          :loading="isLoading"
          :search-input.sync="tag"
          hide-selected
          autofocus
          outlined
          shaped
          clearable
          item-text="tag"
          item-value="createAt"
          label="Search"
          placeholder="Start typing to funny"
          return-object
          @blur="search = tag"
        />
      </v-flex>
      <v-flex v-for="(item, i) in getGallety" :key="i" xs12 sm6 md4 lg3 xl2>
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
            <span v-if="item.likes.length">{{ item.likes.length }}</span>
            <v-btn v-bind="toggleColor(item)" icon @click="switchLike(item)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';

@Component({
  head: {
    title: 'Home',
  },
  computed: {
    ...mapGetters(['getGallety', 'getCurrentTag', 'getHistory']),
  },
  methods: {
    ...mapActions(['searchByTag', 'selectHistory', 'toggleLike']),
  },
})
export default class HomePage extends Vue {
  isLoading: boolean = false;
  search: string = null;
  tag: string = null;

  @Watch('search', { immediate: true, deep: true })
  async onChangeSearch(tag, oldtag) {
    if (!tag || tag === oldtag) return;
    if (this.isLoading) return;

    this.isLoading = true;
    await this.searchByTag(tag);
    this.isLoading = false;
  }

  async switchLike(item) {
    const user = item.likes.indexOf(this.$store.state.auth.user);
    const like = await this.toggleLike(item.id);

    if (like.raw || ~user) {
      return (item.likes = item.likes.splice(user, 0));
    }
    return item.likes.push(like);
  }

  toggleColor(item) {
    const user = item.likes.every(({ user }) => {
      user.id === this.$store.state.auth.user.id;
    });
    return {
      color: !user ? 'red' : null,
    };
  }
}
</script>

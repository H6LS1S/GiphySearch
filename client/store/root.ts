import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}
export const state = (): State => ({
  gallery: [],
  history: [],
  currentTag: '',
  pages: [
    { icon: 'mdi-magnify', attr: { to: '/', exact: true } },
    { icon: 'mdi-history', attr: { to: '/history', exact: true } },
    {
      icon: 'mdi-github-circle',
      attr: {
        href: 'https://github.com/HELSIS666/GiphySearch',
        target: '_blank',
      },
    },
  ],
});

export const getters: GetterTree<RootState, RootState> = {

  getPages(state) {
    return state.pages;
  },

  getGallety(state) {
    return state.gallery;
  },

  getHistory(state) {
    return state.history;
  },

  getCurrentTag(state) {
    return state.currentTag;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async selectGallery({ commit }) {
    const data = await this.$axios.$get(`search/`);
    return commit('setGallety', data);
  },

  async searchByTag({ commit, dispatch }, tag) {
    if (tag) {
      commit('setCurrentTag', tag);
      const data = await this.$axios.$get(`search/${tag}`);
      commit('setGallety', data);
      return await dispatch('selectHistory');
    }
    return await dispatch('selectGallery');
  },

  async selectHistory({ commit }) {
    const data = await this.$axios.$get(`history/`);
    for await (let item of data) {
      if(item.likes.length) {
        let likesId = item.likes.map((like) => like.image)
        item.likes = await this.$axios.$post('search/', likesId);
      }
    }
    return commit('setHistory', data);
  },

  async toggleLike({ getters }, image) {
    const history = getters.getHistory;
    return await this.$axios.$post(`likes/`, {
      image: image,
      history: history[history.length - 1],
    });
  },
};

export const mutations: MutationTree<RootState> = {
  setGallety(state: RootState, data): void {
    state.gallery = data;
  },

  setHistory(state: RootState, data): void {
    state.history = data;
  },

  setCurrentTag(state: RootState, data): void {
    state.currentTag = data;
  },
};

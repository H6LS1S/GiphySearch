import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}
export const state = (): State => ({});

export const getters: GetterTree<RootState, RootState> = {
  getGallety(state) {
    return state.gallery
  },

  getHistory(state) {
    return state.history
  },

  getCurrentTag(state) {
    return state.currentTag
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async selectGallery({ commit }) {
    const { data } = await this.$axios.$get(`search/`);
    return commit('setGallety', data)
  },

  async searchByTag({ commit, dispatch }, tag) {
    if (tag) {
      commit('setCurrentTag', tag)
      const { data } = await this.$axios.$get(`search/${tag}`);
      return commit('setGallety', data)
    }
    return await dispatch('selectGallery')
  },

  async selectHistory({ commit }) {
    const data = await this.$axios.$get(`history/`);
    return commit('setHistory', data)
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

import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}
export const state = (): State => ({});

export const getters: GetterTree<RootState, RootState> = {
  getGallety(state) {
    return state.gallery
  }
  getCurrentTag(state) {
    return state.currentTag
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ state, dispatch }, { $axios, redirect }) {
    if(!state.auth.loggedIn) return;

    await dispatch('selectByTag');
  },

  async selectByTag({ commit }, tag = '') {
    const { data } = await this.$axios.$get(`search/${tag}`);
    commit('setCurrentTag', tag)
    commit('setGallety', Array.isArray(data) ? data : [data])
  },
    return commit('setGallety', [data])
  }
};

export const mutations: MutationTree<RootState> = {
  setGallety(state: RootState, data): void {
    state.gallery = data;
  },

  setCurrentTag(state: RootState, data): void {
    state.currentTag = data;
  },
};

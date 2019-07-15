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
};

export const actions: ActionTree<RootState, RootState> = {
  async selectByTag({ commit }, tag = '') {
    const { data } = await this.$axios.$get(`search/${tag}`);
    if(Array.isArray(data)) {
      return commit('setGallety', data)
    }
    return commit('setGallety', [data])
  }
};

export const mutations: MutationTree<RootState> = {
  setGallety(state: RootState, data): void {
    state.gallery = data;
  },
};

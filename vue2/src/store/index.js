import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cachedComponents: ['Home', 'About']
  },
  mutations: {
    addCachedComponent(state, name) {
      if (!state.cachedComponents.includes(name)) {
        state.cachedComponents.push(name);
      }
    },
    removeCachedComponent(state, name) {
      if (state.cachedComponents.includes(name)) {
        const index = state.cachedComponents.indexOf(name);
        state.cachedComponents.splice(index, 1);
      }
    }
  }
})

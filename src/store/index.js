import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    sortedProducts: [],
    loading: false,
  },
  getters: {},
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setSortedProducts(state, payload) {
      state.sortedProducts = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    sortByPrice(state, price) {
      state.sortedProducts = state.sortedProducts.filter(
        (i) => i.price <= price
      )
    },
    sortByCategory(state, category) {
      state.sortedProducts = state.products.filter(
        (i) => i.category === category
      )
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      let dataList = null
      commit("setLoading", true)
      try {
        await fetch("https://dummyjson.com/products")
          .then((res) => res.json())
          .then((data) => (dataList = data.products))
      } catch (err) {
        console.log("error from fetching", err.message)
      } finally {
        commit("setProducts", dataList)
        commit("setLoading", false)
      }
    },
  },
})

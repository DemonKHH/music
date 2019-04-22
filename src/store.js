import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
      id:'',
      playingName:'',
      historylists:[]
  },
  getters:{
    getSongId(state){
        return state.id;
    },
    getPlaylistTitle(state){
      return state.playingName;
    }
},
actions:{
  setSongId({commit,state}, id){
      commit("getSongId", id);
  },
  setPlaylistTitle({commit,state}, playingName){
    commit("getPlaylistTitle", playingName);
}

},
mutations:{
  getSongId(state, playLoad){
      state.id = playLoad;
  },
  getPlaylistTitle(state, playLoad){
    state.playingName = playLoad;
}
}
})

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
      loginstatus:'未登录',
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
    },
    getLoginstatus(state){
      return state.loginstatus;
    }
},
actions:{
  setSongId({commit,state}, id){
      commit("getSongId", id);
  },
  setPlaylistTitle({commit,state}, playingName){
    commit("getPlaylistTitle", playingName);
},
setLoginstatus({commit,state},loginstatus){
  commit("getLoginstatus", loginstatus);  
}

},
mutations:{
  getSongId(state, playLoad){
      state.id = playLoad;
  },
  getPlaylistTitle(state, playLoad){
    state.playingName = playLoad;
}
,    
getLoginstatus(state,playLoad){
  state.loginstatus = playLoad;
}
}
})

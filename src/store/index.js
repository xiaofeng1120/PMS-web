import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room:{},//房间信息
    Status:0,//扫描证件自动还是手动
    roomList:[//综合房态选中的房间信息
    ],
  },
  mutations: {
    setRoomInfo(state,room){
      console.log(room)
      state.room = room;
    },
    setStatus(state,data){
      state.Status = data;
    },
    setroomListInfo(state,data){
      console.log(data)
      state.roomList = data;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getRoom(state){
      return state.room
    }
  }
})

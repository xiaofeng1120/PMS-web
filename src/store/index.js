import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room:{},//房间信息
    Status:0,//扫描证件自动还是手动
    roomList:[],//综合房态选中的房间信息
    dateList:[],//储存综合房态的时间范围
    date:new Date(),//全局的时间
    dialogVisible:false,//全局的弹窗
    rooms:{},//综合房态除空房之外的房间信息
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
      for(let i=0;i<data.length;i++){
        data[i].value2=0;
        for(let j=0;j<data[i].list.length;j++){
          data[i].value2+=Number(data[i].list[j].price);
        }
      }
      console.log(data);
      state.roomList = data;
    },
    setDateList(state,data){
        state.dateList=data;
    },
    setDialog(state,data){
      state.dialogVisible=data
    },
    setrooms(state,data){
      state.rooms=data
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})

<template>
  <div>
    <!-- 房间状态 -->
      <div class="text" @click="handleIsall" :class="hoursStatusActive==-1?'is_all':''">
            <img src="../assets/imgs/all.png" />
            <span>全部</span>
            <span></span>
      </div>
    <ul>
      <li
        v-for="(item,index) in hoursStatusList"
        :key="index"
        :class="hoursStatusActive==index?'active':''"
        @click="handleClick(index)"
      >
        <span>{{item.name}}</span>
        <span>({{item.count}})</span>
      </li>
    </ul>
    <!-- 房型 -->
    <div class="text" @click="handleCheckall" :class="hoursTypeActive==-1?'is_all':''">
            <img src="../assets/imgs/all.png" />
            <span>全部</span>
            <span></span>
      </div>
    <ul>
      <li
        v-for="(item,index) in hoursTypeList"
        :key="index"
        :class="hoursTypeActive==index?'active':''"
        @click="handleClick2(index)"
      >
        <span>{{item.name}}</span>
        <span>({{item.count}})</span>
      </li>
    </ul>
    <!-- 楼层 -->
    <h3 class="floor">
      <el-select v-model="floorId" size="small">
        <el-option :label="item.name" :value="item.id" v-for="(item,index) in floorList" :key="index"></el-option>
      </el-select>
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoursStatusActive: -1,
      hoursStatusList: [
        { id: 1, name: "脏房", count: "1" },
        { id: 2, name: "空房", count: "34" },
        { id: 3, name: "预定", count: "1" },
        { id: 4, name: "预离", count: "0" },
        { id: 5, name: "在住", count: "2" },
        { id: 6, name: "锁定", count: "0" }
      ],
      hoursTypeActive:-1,
      hoursTypeList:[
            { id: 1, name: "单人间", count: "8" },
            { id: 2, name: "标准间", count: "36" },
            { id: 3, name: "豪华房", count: "12" },
            { id: 4, name: "商务房", count: "8" },
            { id: 5, name: "总统套房", count: "3" }
      ],
      floorId:0,
      floorList:[
        {id:0,name:'所有楼层'},
        {id:1,name:'一楼'},
        {id:2,name:'二楼'},
        {id:3,name:'三楼'},
        {id:4,name:'四楼'},
        {id:5,name:'五楼'},
        {id:6,name:'六楼'},
      ]
    };
  },
  methods: {
    handleClick(i) {
        if (this.hoursStatusActive != i) this.hoursStatusActive = i;
    },
    handleClick2(i){
        if (this.hoursTypeActive != i) this.hoursTypeActive = i;
    },
    handleIsall(){
        if (this.hoursStatusActive != -1) this.hoursStatusActive = -1;
    },
    handleCheckall(){
        if (this.hoursTypeActive != -1) this.hoursTypeActive = -1;
    },
  }
};
</script>

<style scoped lang="scss">
  .text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 40px;
        padding: 0px 15px;
        cursor: pointer;
        border-radius: 4px;
    img {
      width: 26px;
    }
    span{
        color:#333;
    }
  }
  .is_all{
      background:#f8f8f8;
      span{
          color:#5ea3ff
      }
  }
  li {
    cursor: pointer;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    &:hover,
    &.active {
      background: #5ea3ff;
      color: #fff;
    }
  }
  .floor{
    margin:10px 0px;
    text-align:center;
    padding:20px 0px;
    border-top:1px solid #eee;
    .el-select{
      width:80%;
    }
  }
</style>
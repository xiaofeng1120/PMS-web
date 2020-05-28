<template>
  <div class="con">
    <div class="add">
      <el-button type="warning" icon="el-icon-plus" size="mini" @click="addIncome">新增收入项目</el-button>
    </div>

    <div class="add_item">
      <ul>
        <li v-for="(item,index) in incomtList" :key="index">
          <div>
            <el-input v-model="item.name" ></el-input>
          </div>

          <i class="el-icon-minus item_delete" @click="deleteIncomeBtn(index)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      incomtList: [
        {
          name: "房费"
        },
        {
          name: "押金"
        },
        {
          name: "杂费"
        }
      ],
    };
  },
  methods: {
    addIncome() {
      this.incomtList.push({
        name: "虚拟"
      });
    },
    deleteIncomeBtn(index) {
      this.incomtList.splice(index, 1);
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped lang="scss">
.con {
  height: 100%;
}

.add {
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.add_item ul {
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 10px;
    position: relative;

    .item_delete {
      position: absolute;
      top: 5px;
      right: 2px;
      background: #bc6f5c;
      border-radius: 50%;
      font-size: 25px;
      color: white;
    }
  }
}
</style>
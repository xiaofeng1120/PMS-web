<template>
  <div class="con">
    <div class="add">
      <el-button type="warning" icon="el-icon-plus" size="mini" @click="addSpending">新增支出项目</el-button>
    </div>

    <div class="add_item">
      <ul>
        <li v-for="(item,index) in spendingList" :key="index">
          <div>
            <el-input v-model="item.name" ></el-input>
          </div>

          <i class="el-icon-minus item_delete" @click="deleteSpendingBtn(index)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spendingList: [
        {
          name: "虚拟出账"
        },
        {
          name: "房费转出"
        },
        {
          name: "退房"
        }
      ],
    };
  },
  methods: {
    addSpending() {
      this.spendingList.push({
        name: "退房A"
      });
    },
    deleteSpendingBtn(index) {
      this.spendingList.splice(index, 1);
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
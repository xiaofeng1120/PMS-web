<template>
  <div class="orderPage">
    <div>
      <div class="fromBox1">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="房间号:">
            <el-input v-model="form.roomInput" placeholder="请输入房间号"></el-input>
          </el-form-item>
          <el-form-item label="操作类型:">
            <el-select v-model="form.value">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.state"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">清空</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table_div">
        <el-table :data="tableData" border>
          <el-table-column prop="czlx" label="操作类型" align="center"></el-table-column>
          <el-table-column prop="cznr" label="操作类容" align="center"></el-table-column>
          <el-table-column prop="name" label="操作人" align="center"></el-table-column>
          <el-table-column prop="time" label="时间" align="center"></el-table-column>
        </el-table>
      </div>

      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pageNum: 1,
      isDialog: false,
      form: {
        value: "操作类型",
        roomInput: "",
        date: ''
      },
      options: [
        {
          code: "0",
          state: "操作类型"
        },
        {
          code: "1",
          state: "增加用户"
        },
        {
          code: "2",
          state: "修改用户"
        },
        {
          code: "3",
          state: "启用用户"
        }
      ],
      tableData: [
        {
          czlx: "恢复房间",
          cznr: "还原房间 502",
          name: "张三",
          time: "2020-5-23 12:50:22"
        },
        {
         czlx: "夜审",
          cznr: "还原房间 602",
          name: "李四",
          time: "2020-5-24 12:50:22"
        }
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang="scss">
.fromBox1 {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;

  .el-form-item {
    display: inline-block;
  }
}

.table_div {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.page {
  margin-top: 10px;
  padding-right: 50px;
  text-align: right;
}

</style>
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
          <el-form-item label="日志类型:">
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
          <el-table-column prop="czxx" label="操作信息" align="center"></el-table-column>
          <el-table-column prop="czlx" label="操作类型" align="center"></el-table-column>
          <el-table-column prop="zcscsj" label="最初上传时间" align="center"></el-table-column>
          <el-table-column prop="zhscsj" label="最后上传时间" align="center"></el-table-column>
          <el-table-column prop="cwxx" label="错误信息" align="center"></el-table-column>
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
        value: "正确日志",
        roomInput: "",
        date: ''
      },
      options: [
        {
          code: "0",
          state: "正确日志"
        },
        {
          code: "1",
          state: "错误日志"
        }
      ],
      tableData: [
        {
          czxx: "操作1",
          czlx: "正确操作",
          zcscsj: "2020-5-23 12:52:55",
          zhscsj: "2020-5-24 12:50:22",
          cwxx: '错误1'
        },
        {
         czxx: "操作2",
          czlx: "错误操作",
          zcscsj: "2020-5-23 12:52:55",
          zhscsj: "2020-5-24 12:50:22",
          cwxx: '错误2'
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

.view_detail {
  display: flex;
  flex-direction: column;
  li {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    & > span {
      display: inline-block;
    }
    & > span:nth-child(1) {
      margin-right: 20px;
      min-width: 70px;
    }
  }
}
.orderPage .dialog-footer {
  text-align: center;
  margin-top: 25px;
}

.change_div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .change_foot {
    margin-top: 40px;

    .el-button {
      width: 150px;
    }
  }
}
</style>
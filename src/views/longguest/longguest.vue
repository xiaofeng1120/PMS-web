<template>
  <div class="orderPage">
    <div>
      <div class="fromBox1">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="证件类型:">
            <el-select v-model="form.value">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.state"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号:">
            <el-input v-model="form.cardInput" placeholder="请输入证件号"></el-input>
          </el-form-item>
          <el-form-item label="姓  名:">
            <el-input v-model="form.nameInput" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">清空</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table_div">
        <el-table :data="tableData" border>
          <el-table-column prop="zjlx" label="证件类型" align="center"></el-table-column>
          <el-table-column prop="zjh" label="证件号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="deleteBtn(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
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

    <el-dialog title="删除" :visible.sync="isDelete" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>你确认要删除吗?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="deleteSure">确 定</el-button>
          <el-button type="info" @click="isDelete = false">取消</el-button>
        </span>
      </div>
    </el-dialog>
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
        value: "全部",
        cardInput: "",
        nameInput: "",
      },
      options: [
        {
          code: "0",
          state: "全部"
        },
        {
          code: "1",
          state: "居民身份证"
        },
        {
          code: "2",
          state: "居民户口簿"
        },
        {
          code: "3",
          state: "护照"
        }
      ],
      tableData: [
        {
          zjlx: "身份证",
          zjh: "123456789",
          name: "张三"
        },
        {
          zjlx: "户口簿",
          zjh: "234567890",
          name: "李四"
        }
      ],
      row: "",
      isDelete: false
    };
  },
  methods: {
    deleteBtn(row) {
      this.row = row;
      this.isDelete = !this.isDelete;
    },
    deleteSure() {
      this.isDelete = !this.isDelete;
    },
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
<template>
  <div class="orderPage">
    <div>
      <div class="add">
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="addBlcakListBtn(1)">新增黑名单</el-button>
      </div>

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
          <el-form-item label="姓名:">
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="changeBlackListBtn(scope.row, 2)" type="warning" size="small">修改</el-button>
              <el-button @click="deteleBtn(scope.row)" type="danger" size="small">删除</el-button>
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

    <el-dialog title="新增黑名单" :visible.sync="isBlackList" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="row">
          <el-form-item label="证件类型">
            <el-select v-model="form.value">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.state"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="row.zjh" placeholder="1-18位数字字母组合"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="row.name" placeholder="1-15位中文"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="blackListSure">保 存</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="删除" :visible.sync="isDeteleBlackList" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要删除吗?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="deleteSure">确 定</el-button>
          <el-button type="info" @click="isDeteleBlackList = false">取消</el-button>
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
      isBlackList: false,
      isDeteleBlackList: false,
      form: {
        value: "全部",
        cardInput: "",
        nameInput: "",
        date: ""
      },
      options: [
        {
          code: "0",
          state: "身份证"
        },
        {
          code: "1",
          state: "户口簿"
        },
        {
          code: "2",
          state: "护照"
        }
      ],
      tableData: [
        {
          zjlx: "身份证",
          zjh: "12312313123",
          name: "张三"
        },
        {
          zjlx: "户口簿",
          zjh: "6756756",
          name: "李四"
        }
      ],
      row: "",
      index: ""
    };
  },
  methods: {
    addBlcakListBtn(index) {
      this.index = index;
      this.isBlackList = !this.isBlackList;
    },
    blackListSure() {
      if (this.index == 1) {
        this.tableData.push({
          zjlx: "户口簿",
          zjh: "6756756",
          name: "李四"
        });
      }

      this.row = "";
      this.isBlackList = !this.isBlackList;
    },
    changeBlackListBtn(row, index) {
      this.index = index;
      this.isBlackList = !this.isBlackList;

      this.row = row;
    },
    deteleBtn(row) {
      console.log(row);
      this.isDeteleBlackList = !this.isDeteleBlackList;
    },
    deleteSure() {
      this.tableData.splice(this.row, 1);
      this.isDeteleBlackList = !this.isDeteleBlackList;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang="scss">
.add {
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

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

.dialog-footer {
  text-align: center;
  margin-top: 25px;
  width: 100%;

  .el-button {
    width: 100%;
  }
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
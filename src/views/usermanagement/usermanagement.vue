<template>
  <div class="con">
    <div class="add">
      <el-button type="warning" icon="el-icon-plus" size="mini" @click="addUserBtn(1)">新增员工</el-button>
    </div>

    <div class="table_div">
      <el-table :data="tableData" border>
        <el-table-column prop="zh" label="账号" align="center"></el-table-column>
        <el-table-column prop="name" label="昵称" align="center"></el-table-column>
        <el-table-column label="权限" align="center">
          <template slot-scope="scope">
            <el-button @click="qxBtn(scope.row)" type="warning" size="small">权限</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="changeUserBtn(scope.row,2)" type="warning" size="small">修改</el-button>
            <el-button @click="disableUserBtn(scope.row)" type="danger" size="small">禁用</el-button>
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

    <el-dialog title="新增员工" :visible.sync="isAddUser" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="row">
          <el-form-item label="账号">
            <el-input v-model="row.zh" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="row.pwd" placeholder="6-20位数字字母组合"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="row.newPwd" placeholder="6-20位数字字母组合"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="row.name" placeholder="1-20位字符"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addUserSure">保 存</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="禁用员工" :visible.sync="isDisableUser" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要禁用员工吗?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="disableUserSure">确 定</el-button>
          <el-button type="info" @click="isDisableUser = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="权限设置" :visible.sync="isQx" width="30%" center>
      <div class="addroom_div" :model="row">
        <el-form label-width="80px">
          <el-form-item label="选择权限">
            <el-radio v-model="row.qxCode" label="1">店长</el-radio>
            <el-radio v-model="row.qxCode" label="2">员工</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="qxSure">保 存</el-button>
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
      isAddUser: false,
      isDisableUser: false,
      isQx: false,
      pageNum: 1,

      tableData: [
        {
          zh: "1231412",
          name: "李四",
          pwd: "",
          newPwd: "",
          qxCode: "1"
        },
        {
          zh: "123142342312",
          name: "张三",
          pwd: "",
          newPwd: "",
          qxCode: "2"
        }
      ],
      row: "",
      index: ""
    };
  },
  methods: {
    addUserBtn(index) {
      this.index = index;
      this.isAddUser = !this.isAddUser;
    },
    addUserSure() {
      if (this.index == 1) {
        this.tableData.push({
          zh: "123142342312",
          name: "张三",
          pwd: "",
          newPwd: ""
        });
      }
      this.isAddUser = !this.isAddUser;
      this.row = "";
    },
    changeUserBtn(row, index) {
      this.index = index;
      this.row = row;
      this.isAddUser = !this.isAddUser;
    },
    disableUserBtn(row) {
      console.log(row);
      this.isDisableUser = !this.isDisableUser;
    },
    disableUserSure() {
      this.isDisableUser = !this.isDisableUser;
    },
    qxBtn(row) {
      console.log(row);
      this.row = row;
      this.isQx = !this.isQx;
    },
    qxSure() {
      this.isQx = !this.isQx;
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
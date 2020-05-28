<template>
  <div class="orderPage">
    <div>
      <div class="fromBox1">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="日 期:">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="联系人:">
            <el-input v-model="form.input" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="电 话:">
            <el-input v-model="form.input" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="fromBox2">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="房间号:">
            <el-input v-model="form.input" placeholder="请输入房间号"></el-input>
          </el-form-item>
          <el-form-item label="入住人:">
            <el-input v-model="form.input" placeholder="请输入入住人"></el-input>
          </el-form-item>
          <el-form-item label="状 态:">
            <el-select v-model="form.value" placeholder="订单状态">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.state"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input v-model="form.input" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">清空</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table_div">
        <el-table :data="tableData" border>
          <el-table-column prop="roomNum" label="房间号" width="100" align="center"></el-table-column>
          <el-table-column prop="customers" label="客源" width="80" align="center"></el-table-column>
          <el-table-column prop="checkInTime" label="入住时间" align="center"></el-table-column>
          <el-table-column prop="checkOutTime" label="退房时间" align="center"></el-table-column>
          <el-table-column prop="contact" label="联系人" align="center"></el-table-column>
          <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="checkInUser" label="入住人" width="400" align="center"></el-table-column>
          <el-table-column prop="orderStatu" label="订单状态" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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

    <reserve :show="showDrawe" @closeReserve="closeDrawe"></reserve>>
  </div>
</template>

<script>

import reserve from "./../../components/reserve";
export default {
  components: {
    reserve
  },
  data() {
    return {
      showDrawe: false, //右边弹窗
      pageNum: 1,
      form: {
        date: "",
        value: "",
        input: ""
      },
      options: [
        {
          code: "0",
          state: "状态1"
        },
        {
          code: "1",
          state: "状态2"
        },
        {
          code: "3",
          state: "状态3"
        }
      ],
      tableData: [
        {
          roomNum: "101",
          customers: "散客",
          checkInTime: "2020-05-22",
          checkOutTime: "2020-05-23",
          contact: "admin",
          phone: "13600000000",
          checkInUser: "admin",
          orderStatu: "在住"
        },
        {
          roomNum: "101",
          customers: "散客",
          checkInTime: "2020-05-22",
          checkOutTime: "2020-05-23",
          contact: "admin",
          phone: "13600000000",
          checkInUser: "admin",
          orderStatu: "在住"
        }
      ],
      row: ""
    };
  },
  methods: {
    handleClick(row) {
      this.row = row;
      this.showDrawe=true;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    closeDrawe() {
      this.showDrawe = false;
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

.fromBox2 {
  display: flex;
  flex-direction: row;
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
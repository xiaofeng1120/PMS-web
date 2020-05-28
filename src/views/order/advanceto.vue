<template>
  <div class="advancetoPage">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
      <el-table-column label="房间号" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.roomNum }}</template>
      </el-table-column>
      <el-table-column prop="customers" label="客源" width="80" align="center"></el-table-column>
      <el-table-column prop="checkInTime" label="入住时间" align="center"></el-table-column>
      <el-table-column prop="checkOutTime" label="退房时间" align="center"></el-table-column>
      <el-table-column prop="orderMoney" label="订单金额" align="center"></el-table-column>
      <el-table-column prop="receivedMoeny" label="已收金额" align="center"></el-table-column>
      <el-table-column prop="reservationUser" label="预订人" width="150" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
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
      tableData: [
        {
          roomNum: "101",
          customers: "散客",
          checkInTime: "2020-05-22",
          checkOutTime: "2020-05-23",
          orderMoney: "12000",
          receivedMoeny: "1200",
          reservationUser: "admin",
          phone: "13600000000",
          createTime: "2020-05-23"
        },
        {
          roomNum: "101",
          customers: "散客",
          checkInTime: "2020-05-22",
          checkOutTime: "2020-05-23",
          orderMoney: "12000",
          receivedMoeny: "1200",
          reservationUser: "admin",
          phone: "13600000000",
          createTime: "2020-05-23"
        }
      ],
      multipleSelection: [],
      pageNum: 1,
     showDrawe: false, //右边弹窗
      row: ""
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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

.advancetoPage .dialog-footer {
  text-align: center;
  margin-top: 25px;
}
</style>
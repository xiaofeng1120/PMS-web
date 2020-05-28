<template>
  <div class="con">
    <div class="titel">
      <div class="book">
        <ul>
          <li>
            <span>酒店账本</span>
          </li>
          <li>
            <span>总计:</span>
            <el-button type="success" size="mini">收</el-button>
            <span>340</span>
          </li>
        </ul>
      </div>

      <div class="picker">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column
          prop="xm"
          label="项目"
          :filters="[{ text: '退房', value: '退房' }, { text: '房费', value: '房费' }]"
          :filter-method="xmTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.xm === '房费' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.xm}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="总金额">
          <template slot-scope="scope">
            <el-button type="success" size="mini">收</el-button>
            {{ scope.row.zje }}
          </template>
        </el-table-column>
        <el-table-column
          prop="zffs"
          label="支付方式"
          :filters="[{ text: '现金', value: '现金' }, { text: '支付宝', value: '支付宝' }]"
          :filter-method="zffsTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.zffs === '现金' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.zffs}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="czr"
          label="操作人"
          :filters="[{ text: '店长', value: '店长' }, { text: '员工', value: '员工' }]"
          :filter-method="czrTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.czr === '店长' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.czr}}</el-tag>
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
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pageNum: 1,
      date: "",
      tableData: [
        {
          time: "2020-5-20",
          xm: "房费",
          zje: "1000",
          zffs: "现金",
          czr: "店长"
        },
        {
          time: "2020-5-20",
          xm: "退房",
          zje: "1000",
          zffs: "支付宝",
          czr: "员工"
        }
      ]
    };
  },
  methods: {
    zffsTag(value, row) {
      return row.zffs === value;
    },
    xmTag(value, row) {
      return row.xm === value;
    },
    czrTag(value, row) {
      return row.czr === value;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.titel {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: #5eaeff;

  .book {
    width: 80%;
    color: #ffffff;

    ul {
      display: flex;
      align-items: center;
      height: 100%;

      li {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0px 25px;
        cursor: pointer;
        color: #ffffff;

        .el-button {
          margin: 5px;
        }
      }
    }
  }
}

.page {
  margin-top: 10px;
  padding-right: 50px;
  text-align: right;
}
</style>
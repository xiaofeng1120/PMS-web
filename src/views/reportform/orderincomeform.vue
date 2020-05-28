<template>
  <div class="formPage">
    <div>
      <div class="table">
        <h1>收支汇总表</h1>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="szlx" label="收支类型"></el-table-column>
          <el-table-column prop="szxm" label="收支项目"></el-table-column>
          <el-table-column prop="je" label="金额"></el-table-column>
          <el-table-column prop="zffs" label="支付方式"></el-table-column>
        </el-table>

        <div class="row">
          <ul>
            <li>
              <span>收支汇总: 总进账:</span>
              <span class="span_red">350000</span>
            </li>
            <li>
              <span class="span_margin">总出账:</span>
              <span class="span_red">5000</span>
            </li>
            <li>
              <span class="span_margin">结余:</span>
              <span class="span_red">345000</span>
            </li>
          </ul>
        </div>

        <div class="table">
          <h1>收支明细表</h1>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="szlx"
              label="收支类型"
              :filters="[{ text: '收入', value: '收入' }, { text: '支出', value: '支出' }]"
              :filter-method="szlxTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.szlx === '收入' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.szlx}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="szxm"
              label="收支项目"
              :filters="[{ text: '退房', value: '退房' }, { text: '房费', value: '房费' }]"
              :filter-method="szxmTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.szxm === '房费' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.szxm}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="je" label="金额" sortable column-key="je"></el-table-column>
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
            <el-table-column prop="time" label="时间" sortable column-key="time"></el-table-column>
            <el-table-column prop="fjh" label="房间号" sortable column-key="fjh"></el-table-column>
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

        <div class="row">
          <ul>
            <li>
              <span>合计总汇: 进账:</span>
              <span class="span_red">350000</span>
            </li>
            <li>
              <span class="span_margin">出账:</span>
              <span class="span_red">5000</span>
            </li>
          </ul>
        </div>
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
  components: {
  },
  data() {
    return {
      pageNum: 1,
      tableData: [
        {
          szlx: "收入",
          szxm: "房费",
          je: "10000",
          zffs: "现金",
          time: "2020-5-10",
          fjh: "101",
          czr: "店长"
        },
        {
          szlx: "支出",
          szxm: "退房",
          je: "11000",
          zffs: "支付宝",
          time: "2020-5-20",
          fjh: "202",
          czr: "员工"
        }
      ]
    };
  },
  methods: {
    zffsTag(value, row) {
      return row.zffs === value;
    },
    szlxTag(value, row) {
      return row.szlx === value;
    },
    szxmTag(value, row) {
      return row.szxm === value;
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
.table {
  padding: 10px;
  h1 {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
  }
}

.row {
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span {
    color: #000000;
    font-weight: bold;
  }
  .span_red {
    color: #dd001b;
  }
  .span_margin {
    margin-left: 30px;
  }
}

.page {
  margin-top: 10px;
  padding-right: 50px;
  text-align: right;
}
</style>
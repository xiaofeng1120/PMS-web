<template>
  <div class="formPage">
    <div>
      <div class="row1">
        <ul class="ul1">
          <li>
            <span>当前营业日:</span>
            <span>2020-5-25</span>
          </li>
          <li>
            <span class="span1">今日以住房间数:</span>
            <span>1</span>
          </li>
          <li>
            <span class="span1">今日预到房间数:</span>
            <span>0</span>
          </li>
          <li>
            <span class="span1">今日预离房间数:</span>
            <span>1</span>
          </li>
          <li>
            <span class="span1">今日入住率:</span>
            <span>100%</span>
          </li>
          <li>
            <span class="span1">今日收入:</span>
            <span>¥ 1000</span>
          </li>
          <li>
            <span class="span1">今日支出:</span>
            <span>¥ 100</span>
          </li>
        </ul>
      </div>

      <div class="row2">
        <ul>
          <li>
            <span>房费收入:</span>
            <span>¥ 1000</span>
          </li>
          <li>
            <span class="span2">其他收入:</span>
            <span>¥ 1000</span>
          </li>
          <li>
            <span class="span2">合计:</span>
            <span>¥ 1000</span>
          </li>
        </ul>

        <ul>
          <li>
            <span class="span2">平均成交房价:</span>
            <span>¥ 1000</span>
          </li>
          <li>
            <span class="span2">平均出租率:</span>
            <span>80%</span>
          </li>
        </ul>

        <ul>
          <li>
            <span class="span2">渠道来源</span>
          </li>
        </ul>
      </div>

      <div class="chart">
        <div id="pieChart1" :style="{width: '30%', height: '400px'}"></div>
        <div id="pieChart2" :style="{width: '30%', height: '400px'}"></div>
        <div id="pieChart3" :style="{width: '30%', height: '400px'}"></div>
      </div>

      <div class="chart">
        <div class="table">
          <el-table :data="tableData" border style="width: 90%">
            <el-table-column prop="srlx" label="收入类型"></el-table-column>
            <el-table-column prop="je" label="金额"></el-table-column>
            <el-table-column prop="zzb" label="总占比"></el-table-column>
          </el-table>

          <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 90%"
          >
            <el-table-column prop="srlx" label="收入类型"></el-table-column>
            <el-table-column prop="xm" label="项目"></el-table-column>
            <el-table-column prop="je" label="金额"></el-table-column>
            <el-table-column prop="bl" label="比例"></el-table-column>
            <el-table-column prop="zzb" label="总占比"></el-table-column>
          </el-table>
        </div>

        <div class="table">
          <el-table :data="tableData" border style="width: 90%">
            <el-table-column prop="kfs" label="空房数"></el-table-column>
            <el-table-column prop="czl" label="出租率"></el-table-column>
          </el-table>

          <el-table :data="tableData" border style="width: 90%">
            <el-table-column prop="srlx" label="类型"></el-table-column>
            <el-table-column prop="kf" label="空房"></el-table-column>
            <el-table-column prop="bl" label="比例"></el-table-column>
            <el-table-column prop="zzb" label="总占比"></el-table-column>
          </el-table>
        </div>

        <div class="table">
          <el-table :data="tableData" border style="width: 90%">
            <el-table-column prop="dds" label="订单数"></el-table-column>
          </el-table>

          <el-table :data="tableData" border style="width: 90%">
            <el-table-column prop="ky" label="客源"></el-table-column>
            <el-table-column prop="dds" label="订单数"></el-table-column>
            <el-table-column prop="bl" label="比例"></el-table-column>
          </el-table>
        </div>
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
        tableData: [{
          srlx: '房间收入',
          je: '1000',
          zzb: '50%',
          xm: '汽水',
          bl: '30%',
          dds: '289',
          kfs: '590',
          czl: '49%',
          kf: '300',
          ky: '线下'
        }, {
          srlx: '其他收入',
          je: '165',
          zzb: '50%',
          xm: '方便面',
          bl: '30%',
          dds: '289',
           kfs: '590',
          czl: '49%',
          kf: '300',
          ky: '线上'
        }]
    };
  },
  methods: {
    pieChart1() {
      var pieChart = this.$echarts.init(document.getElementById("pieChart1"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "提示",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 100, name: "房费收入" },
              { value: 200, name: "其他收入" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        color: ["rgb(254,67,101)", "rgb(252,157,154)"]
      };
      pieChart.setOption(option);
    },
    pieChart2() {
      var pieChart = this.$echarts.init(document.getElementById("pieChart2"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "提示",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 50, name: "空房" },
              { value: 200, name: "出租率" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        color: ["rgb(200,200,169)", "rgb(131,175,155)"]
      };
      pieChart.setOption(option);
    },
    pieChart3() {
      var pieChart = this.$echarts.init(document.getElementById("pieChart3"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "提示",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 150, name: "散客" },
              { value: 200, name: "线上" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      pieChart.setOption(option);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row)
        console.log(column)
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }  
  },
  mounted() {
    this.pieChart1();
    this.pieChart2();
    this.pieChart3();
  }
};
</script>

<style scoped lang="scss">
.row1 {
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  ul {
    display: flex;
    flex-direction: row;
  }
  span {
    color: #000000;
  }
  .span1 {
    margin-left: 40px;
  }
}

.row2 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
   padding: 10px;
  box-sizing: border-box;
  ul {
    display: flex;
    flex-direction: row;
    width: 30%;
  }
  span {
    color: #000000;
  }
  .span2 {
    margin-left: 40px;
  }
}

.chart {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .table {
    width: 30%;

    .el-table {
      margin-top: 10px;
    }
  }
}
</style>
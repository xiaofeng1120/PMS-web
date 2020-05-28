<template>
  <div class="formPage">
    <div>
      <div id="chart" :style="{width: '100%', height: '400px'}"></div>

      <div class="row">
        <ul>
          <li>
            <span>各房间收入统计:</span>
            <span>2020-5-10 至 2020-5-21</span>
          </li>
          <li>
            <el-button type="primary" icon="el-icon-arrow-left">上半个月</el-button>
            <el-button type="primary">
              下半个月
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <el-button type="primary">查看明细</el-button>
          </li>
        </ul>
      </div>

      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="lx" label="类型"></el-table-column>
          <el-table-column v-for="(item,index) in formDate" prop="test" :label="item" :key="index"></el-table-column>
          <el-table-column prop="hj" label="合计"></el-table-column>
        </el-table>
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
      formDate: ["05-10", "05-11", "05-12", "05-13", "05-14", "05-15"],
      tableData: [
        {
          lx: "房间收入",
          test: '100',
          hj: '10000'
        },
         {
          lx: "其他收入",
          test: '200',
          hj: '20000'
        },
         {
          lx: "综合收入",
          test: '300',
          hj: '30000'
        }
      ]
    };
  },
  methods: {
    chart() {
      var chart = this.$echarts.init(document.getElementById("chart"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["其他收入", "实际收入", "出租率"]
        },
        xAxis: [
          {
            type: "category",
            data: this.formDate,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "入住率",
            min: -0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: "{value} %"
            }
          },
          {
            type: "value",
            name: "总收入",
            min: 0,
            max: 20000,
            interval: 5000,
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "出租率",
            type: "line",
            data: [10, 13, 24, 50, 80, 95, 34, 45, 78, 50, 34, 90]
          },
          {
            name: "实际收入",
            type: "bar",
            yAxisIndex: 1,
            data: [
              1107,
              11500,
              1200,
              6000,
              8000,
              13200,
              14500,
              16700,
              12800,
              1200,
              1100,
              11200
            ]
          },
          {
            name: "其他收入",
            type: "bar",
            yAxisIndex: 1,
            data: [
              11007,
              2000,
              13000,
              4000,
              6000,
              11200,
              12300,
              12900,
              2800,
              1600,
              11200,
              16200
            ]
          }
        ]
      };
      chart.setOption(option);
    }
  },
  mounted() {
    this.chart();
  }
};
</script>

<style scoped lang="scss">
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
  }
  .el-button {
    margin-left: 40px;
  }
  .span {
    margin-left: 40px;
  }
}

.table {
    padding: 10px;
}
</style>
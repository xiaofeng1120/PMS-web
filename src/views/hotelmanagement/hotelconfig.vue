<template>
  <div>
    <div class="hotel">
      <div class="hotel_set">
        <span>酒店设置</span>

        <div class="switch">
          <el-switch v-model="value1" active-text="夜审后自动设置为脏房"></el-switch>
          <el-switch v-model="value2" active-text="退房自动设置为脏房"></el-switch>
          <el-switch v-model="value3" active-text="退房提示打印账单"></el-switch>
          <el-switch v-model="value4" active-text="打开报表与收支明细"></el-switch>
        </div>

        <span>默认离店时间:</span>
        <el-select v-model="timeValue" placeholder="请选择">
          <el-option
            v-for="item in timeList"
            :key="item.time"
            :label="item.time"
            :value="item.time"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="hotel">
      <div class="hotel_set">
        <span>打印机设置</span>
        <div class="print">
          <div class="print_div">
            <span>打印宽度:</span>
            <input class="input" v-model="timeValue" placeholder="请输入" />
            <span>mm</span>
          </div>

          <div class="print_div">
            <span>左边距:</span>
            <input class="input" v-model="timeValue" placeholder="请输入" />
            <span>mm</span>
          </div>

          <div class="print_div">
            <span>右边距:</span>
            <input class="input" v-model="timeValue" placeholder="请输入" />
            <span>mm</span>
          </div>

          <div class="print_div">
            <span>字号:</span>
            <input class="input" v-model="timeValue" placeholder="请输入" />
            <span>px</span>
          </div>

          <div class="print_div">
            <span>字体:</span>
            <el-select v-model="fontValue" placeholder="请选择">
              <el-option
                v-for="item in fontList"
                :key="item.font"
                :label="item.font"
                :value="item.font"
              ></el-option>
            </el-select>
          </div>
          <div class="print_div">
            <el-button type="primary">保存</el-button>
          </div>
        </div>

        <div class="input_div">
          <span>高级设置:</span>
          <el-input type="textarea" :rows="2" placeholder="高级设置" v-model="timeValue"></el-input>
        </div>

        <div class="input_div">
          <span>打印注明:</span>
          <el-input type="textarea" :rows="2" placeholder="用于宾客打印凭证" v-model="timeValue"></el-input>
        </div>
      </div>
    </div>

    <div class="hotel">
      <div class="hotel_set">
        <span>门锁设置</span>
        <div class="print">
          <div class="door_div">
            <span>门锁品牌:</span>
            <el-select v-model="timeValue" placeholder="请选择">
              <el-option
                v-for="item in timeList"
                :key="item.time"
                :label="item.time"
                :value="item.time"
              ></el-option>
            </el-select>

            <span>房卡型号:</span>
            <el-select v-model="timeValue" placeholder="请选择">
              <el-option
                v-for="item in timeList"
                :key="item.time"
                :label="item.time"
                :value="item.time"
              ></el-option>
            </el-select>

            <span>门锁授权码:</span>
            <input class="input" v-model="timeValue" placeholder="请输入" />

            <el-button type="primary">获取授权码</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="hotel">
      <div class="hotel_set">
        <span>证件读卡器/扫描仪设置</span>
        <div class="print">
          <div class="door_div">
            <span>品牌:</span>
            <el-select v-model="brandValue" placeholder="请选择">
              <el-option
                v-for="item in brandList"
                :key="item.brand"
                :label="item.brand"
                :value="item.brand"
              ></el-option>
            </el-select>

            <span>型号:</span>
            <el-select v-model="brandValue" placeholder="请选择">
              <el-option
                v-for="item in brandList"
                :key="item.brand"
                :label="item.brand"
                :value="item.brand"
              ></el-option>
            </el-select>

            <el-button type="danger">删除</el-button>
          </div>
        </div>
        <el-button type="primary">新增品牌</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </div>

    <div class="hotel">
      <div class="hotel_set">
        <span>其他设置</span>

        <div class="switch">
          <el-switch v-model="value5" active-text="最小化时隐藏PMS任务栏图标"></el-switch>

          <span>PSB登录密码:</span>
          <input class="input" v-model="timeValue" placeholder="请输入" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,

      timeValue: "12",
      timeList: [
        {
          time: "12"
        },
        {
          time: "13"
        },
        {
          time: "14"
        }
      ],
      fontValue: "黑体",
      fontList: [
        {
          font: "黑体"
        },
        {
          font: "宋体"
        },
        {
          font: "正楷"
        }
      ],
      brandValue: "通用读卡器1",
      brandList: [
        {
          brand: "通用读卡器1"
        },
        {
          brand: "通用读卡器2"
        },
        {
          brand: "通用读卡器3"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss" >
.hotel {
  display: flex;
  justify-content: center;

  .hotel_set {
    width: 95%;
    border: 1px solid #cccccc;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px;

    span {
      font-size: 16px;
      color: #6d6e79;
      text-align: center;
    }

    .el-button {
      width: 100px;
    }
  }
}

.switch {
  padding: 10px;

  .el-switch {
    margin-right: 50px;
  }

  .input {
    width: 100px;
    height: 20px;
    margin-left: 10px;
  }
}

.print {
  display: flex;
  align-items: center;

  .print_div {
    display: flex;
    padding: 10px;
    align-items: center;

    .input {
      width: 50px;
      height: 20px;
      margin-left: 10px;
    }
  }
}

.input_div {
  display: flex;
  align-items: center;
  padding: 10px;

  .el-textarea {
    width: 400px;
    margin-left: 10px;
  }
}

.door_div {
  display: flex;
  padding: 10px;
  align-items: center;

  .input {
    width: 100px;
    height: 25px;
    margin-left: 10px;
    margin-right: 20px;
  }

  .el-select {
    margin-left: 10px;
    margin-right: 20px;
  }
}
</style>
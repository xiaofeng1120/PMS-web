<template>
  <div class="con">
    <div class="row">
      <ul>
        <li>
          <span class="span1">房型列表</span>
        </li>
        <li>
          <el-button type="warning" icon="el-icon-plus" size="mini" @click="addRoom">新增房型</el-button>
        </li>
      </ul>

      <div class="btn_div">
        <el-button type="primary" icon="el-icon-delete" size="mini" @click="recycleBtn">回收站</el-button>
      </div>
    </div>

    <section>
      <ul class="roomBox">
        <ul class="room">
          <li
            :class="activeIndex == index ? 'active' : ''"
            :key="index"
            v-for="(item,index) in hoursList"
            @click="roomInfo(index, item)"
          >
            <div>{{item.roomStatus}}</div>
            <div>{{item.emptyRoom + "个房间"}}</div>
            <div class="is_locking">
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                size="mini"
                @click="deleteRoomBtn(index)"
              ></el-button>
              <span>{{"¥" + item.roomPrice}}</span>
            </div>
          </li>
        </ul>
      </ul>
    </section>

    <div class="row">
      <ul>
        <li>
          <span class="span1">{{changeRoomName}}</span>
        </li>
        <li>
          <el-button type="warning" icon="el-icon-edit-outline" size="mini" @click="changeRoom">修改房型</el-button>
        </li>
      </ul>
    </div>

    <div class="roomDate">
      <div class="block">
        <i class="el-icon-arrow-left"></i>
        <el-date-picker v-model="date" type="date"></el-date-picker>
        <i class="el-icon-arrow-right"></i>

        <div class="btn_div">
          <el-button type="primary" @click="atTimePriceBtn">设置平时价格</el-button>
          <el-button type="primary" @click="weekPriceBtn">设置周末价格</el-button>
          <el-button type="primary" @click="specialPriceBtn">设置特殊价格</el-button>
        </div>
      </div>

      <div class="date_div">
        <ul>
          <li
            v-for="(item,index) in dateForm"
            :key="index"
            :class="item.status ? 'btn_active' : ''"
          >
            <div class="item_date">
              <span>{{item.date}}</span>
              <span>{{item.week}}</span>
            </div>
            <div class="item_date">
              <el-input v-model="item.price" @change="changeInput(index,item)"></el-input>
              <span @click="deletePrice(index,item)" v-show="item.status">删除特殊价格</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="rule_div">
      <div class="rule_block">
        <i class="add_room_div el-icon-circle-plus-outline" @click="addRuleRoomBtn"></i>

        <ul>
          <li v-for="(item,index) in ruleRoomList" :key="index">
            <div class="fjh_div">
              <span>{{item.fjh}}</span>
            </div>
            <div class="lc_div">
              <span>楼层: {{item.lc}}</span>
            </div>
            <div class="lc_div">
              <span>{{item.fx}}</span>
            </div>

            <el-button type="primary" @click="ruleChangeRoomBtn(index, item)">修改</el-button>

            <div class="is_locking">
              <i class="el-icon-minus rule_delete" @click="deleteRuleRoomBtn(index)"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog title="增加房型" :visible.sync="isAddRoom" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px">
          <el-form-item label="房间名称">
            <el-input v-model="roomName" placeholder="请输房间名称"></el-input>
          </el-form-item>
          <el-form-item label="默认价格">
            <el-input v-model="roomPrice" placeholder="请输入默认价格"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addRoomSureBtn">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="修改房型" :visible.sync="isChangeRoom" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="changeRoomList">
          <el-form-item label="房间名称">
            <el-input v-model="changeRoomList.roomStatus" placeholder="请输房间名称"></el-input>
          </el-form-item>
          <el-form-item label="默认价格">
            <el-input v-model="changeRoomList.roomPrice" placeholder="请输入默认价格"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeRoom">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="修改价格" :visible.sync="isChangePrice" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要修改当前价格吗?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="changePriceSure">确 定</el-button>
          <el-button type="info" @click="isChangePrice = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="删除特殊价格" :visible.sync="isDeletePrice" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要删除当前特殊价格吗?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="deletePriceSure">确 定</el-button>
          <el-button type="info" @click="isDeletePrice = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="设置平时价格" :visible.sync="isAtTimePrice" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="changeRoomList">
          <el-form-item label="默认价格">
            <el-input v-model="changeRoomList.roomPrice" placeholder="请输入默认价格"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="atTimePriceSure">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="设置周末价格" :visible.sync="isWeekPrice" width="50%" center>
      <div class="addroom_div">
        <div class="week_div">
          <ul>
            <li
              v-for="(item,index) in dateForm"
              :key="index"
              :class="item.checked ? 'btn_active' : ''"
            >
              <div class="item_date">
                <el-checkbox v-model="item.checked">{{item.week}}</el-checkbox>
              </div>
              <div class="item_date">
                <el-input v-model="item.price" @change="changeInput(index,item)"></el-input>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="weekPriceSure">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="设置特殊价格" :visible.sync="isSpecialPrice" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="changeRoomList">
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="changeRoomList.resource" size="medium">
              <el-radio border label="每天"></el-radio>
              <el-radio border label="自定义"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="changeRoomList.resource == '自定义'">
            <el-checkbox-group v-model="weekCheckList">
              <el-checkbox label="0">星期一</el-checkbox>
              <el-checkbox label="1">星期二</el-checkbox>
              <el-checkbox label="2">星期三</el-checkbox>
              <el-checkbox label="3">星期四</el-checkbox>
              <el-checkbox label="4">星期五</el-checkbox>
              <el-checkbox label="5">星期六</el-checkbox>
              <el-checkbox label="6">星期日</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="修改价格">
            <el-input v-model="changeRoomList.roomPrice" placeholder="请输入修改价格"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="specialPriceSure">确认修改</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="新增规则房间" :visible.sync="isRuleRoom" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="changeRoomList">
          <el-form-item label="是否连号">
            <el-radio-group v-model="changeRoomList.resource" size="medium">
              <el-radio border label="是"></el-radio>
              <el-radio border label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-show="changeRoomList.resource == '是'">
            <el-form-item>
              <el-radio-group v-model="changeRoomList.resource1" size="medium">
                <el-radio border label="连号"></el-radio>
                <el-radio border label="单号"></el-radio>
                <el-radio border label="双号"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <div class="input_div">
                <el-input v-model="roomName" placeholder="请输入"></el-input>
                <p>一</p>
                <el-input v-model="roomName" placeholder="请输入"></el-input>
              </div>
            </el-form-item>
          </div>
          <el-form-item label="请输入" v-show="changeRoomList.resource == '否'">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="roomName"></el-input>
          </el-form-item>
          <el-form-item label="楼层">
            <el-input placeholder="请输入楼层" v-model="roomName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ruleRoomSure">确认新增</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="修改房间" :visible.sync="ruleChangeRoom" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <el-form-item label="房间号:">
            <el-input placeholder="请输入房间号" v-model="ruleRoomList[0].fjh"></el-input>
          </el-form-item>
          <el-form-item label="房型:">
            <el-select v-model="ruleChangeValue" placeholder="请选择">
              <el-option
                v-for="item in ruleRoomList"
                :key="item.fxCode"
                :label="item.fx"
                :value="item.fxCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="楼层:">
            <el-input placeholder="请输入楼层" v-model="ruleRoomList[0].lc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ruleChangeRoomSure">确认修改</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="删除规则房间" :visible.sync="isDeleteRuleRoom" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要删除当前房间?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="deleteRuleRoomSure">确 定</el-button>
          <el-button type="info" @click="isDeleteRuleRoom = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="房间回收站" :visible.sync="isRecycle" width="50%" center>
      <div class="rule_div">
        <div class="rule_block">
          <ul>
            <li v-for="(item,index) in ruleRoomList" :key="index">
              <div class="fjh_div">
                <span>{{item.fjh}}</span>
              </div>
              <div class="lc_div">
                <span>楼层: {{item.lc}}</span>
              </div>
              <div class="lc_div">
                <div>创建时间:</div>
                <div>2020-5-23 08:53</div>
                <div>删除时间:</div>
                <div>2020-5-23 08:53</div>
              </div>

              <el-button type="primary" @click="reductionRoomBtn(index, item)">还原房间</el-button>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      isAddRoom: false,
      roomName: "",
      roomPrice: "",
      //房间信息list
      hoursList: [
        { id: 1, roomStatus: "标间", emptyRoom: "6", roomPrice: "100" }
      ],
      //修改房型
      changeRoomName: "",
      changeRoomPrice: "",
      //修改房间信息list
      changeRoomList: "",
      isChangeRoom: false,

      date: "2020-05-26",

      //设置价格list
      dateForm: [
        {
          date: "05-21",
          week: "星期一",
          price: "100",
          status: false,
          checked: false
        },
        {
          date: "05-22",
          week: "星期二",
          price: "100",
          status: false,
          checked: false
        },
        {
          date: "05-23",
          week: "星期三",
          price: "100",
          status: false,
          checked: false
        },
        {
          date: "05-24",
          week: "星期四",
          price: "100",
          status: false,
          checked: false
        },
        {
          date: "05-25",
          week: "星期五",
          price: "100",
          status: false,
          checked: false
        },
        {
          date: "05-26",
          week: "星期六",
          price: "100",
          status: false,
          checked: true
        },
        {
          date: "05-27",
          week: "星期日",
          price: "100",
          status: false,
          checked: true
        }
      ],
      isChangePrice: false,

      //记录输入框下标
      changIndex: 0,

      //删除特殊价格
      isDeletePrice: false,

      //修改平时价格
      isAtTimePrice: false,

      //修改周末价格
      isWeekPrice: false,

      //修改特殊价格
      isSpecialPrice: false,

      //新增规则房间
      isRuleRoom: false,

      //星期list
      weekCheckList: [],

      //规则房间list
      ruleRoomList: [
        {
          fjh: 5001,
          lc: 5,
          fx: "标准间",
          fxCode: "0"
        },
        {
          fjh: 5002,
          lc: 5,
          fx: "豪华间",
          fxCode: "1"
        },
        {
          fjh: 5003,
          lc: 5,
          fx: "总统套间",
          fxCode: "2"
        }
      ],

      //修改规则房间
      ruleChangeRoom: false,
      ruleChangeValue: "标准间",
      //删除规则房间
      isDeleteRuleRoom: false,
      deleteRuleRoomIndex: 0,

      //是否回收站
      isRecycle: false
    };
  },
  methods: {
    addRoom() {
      this.isAddRoom = !this.isAddRoom;

      this.roomName = this.roomPrice = "";
    },
    //新增房型
    addRoomSureBtn() {
      if (this.roomName == "" || this.roomPrice == "") {
        this.$message.error("请输入房间或者价格");
        return;
      }

      this.hoursList.push({
        id: 1,
        roomStatus: this.roomName,
        emptyRoom: "6",
        roomPrice: this.roomPrice
      });

      this.isAddRoom = !this.isAddRoom;
    },

    //删除房型
    deleteRoomBtn(index) {
      this.hoursList.splice(index, 1);
    },

    //点击房型展示下方信息
    roomInfo(index, item) {
      this.activeIndex = index;
      this.changeRoomName = item.roomStatus;
      this.changeRoomList = item;
    },

    //修改房型
    changeRoom() {
      this.isChangeRoom = !this.isChangeRoom;
      this.changeRoomName = this.changeRoomList.roomStatus;
      this.changeRoomPrice = this.changeRoomList.roomPrice;

      for (var i = 0; i < 7; i++) {
        this.dateForm[i].price = this.changeRoomPrice;
        this.dateForm[i].status = true;
      }
    },
    //修改房间价格
    changeInput(index, item) {
      this.isChangePrice = !this.isChangePrice;

      this.dateForm.price = item.price;

      this.changIndex = index;
    },
    //修改价格确定
    changePriceSure() {
      this.isChangePrice = !this.isChangePrice;

      this.dateForm[this.changIndex].status = true;
    },
    //删除特殊价格
    deletePrice(index, item) {
      this.isDeletePrice = !this.isDeletePrice;

      console.log(item);

      this.deletePeiceIndex = index;
    },
    //删除特殊价格确定
    deletePriceSure() {
      this.isDeletePrice = !this.isDeletePrice;
      this.dateForm[this.deletePeiceIndex].status = false;
    },

    //设置平时价格
    atTimePriceBtn() {
      this.isAtTimePrice = !this.isAtTimePrice;
    },

    //设置平时价格确定
    atTimePriceSure() {
      this.isAtTimePrice = !this.isAtTimePrice;
      for (var i = 0; i < 7; i++) {
        this.dateForm[i].price = this.changeRoomList.roomPrice;
      }
    },

    //设置周末价格
    weekPriceBtn() {
      this.isWeekPrice = !this.isWeekPrice;
    },

    //设置周末价格确定
    weekPriceSure() {
      this.isWeekPrice = !this.isWeekPrice;
    },

    //修改特殊价格
    specialPriceBtn() {
      this.isSpecialPrice = !this.isSpecialPrice;
    },

    //修改特殊价格确定
    specialPriceSure() {
      this.isSpecialPrice = !this.isSpecialPrice;
    },

    //新增规则房间
    addRuleRoomBtn() {
      this.isRuleRoom = !this.isRuleRoom;
    },

    //新增规则房间确认
    ruleRoomSure() {
      this.isRuleRoom = !this.isRuleRoom;

      this.ruleRoomList.push({
        fjh: "5004",
        lc: "5",
        fx: "test"
      });
    },

    //删除规则房间
    deleteRuleRoomBtn(index) {
      this.deleteRuleRoomIndex = index;
      this.isDeleteRuleRoom = !this.isDeleteRuleRoom;
    },

    //删除规则房间确认
    deleteRuleRoomSure() {
      this.ruleRoomList.splice(this.deleteRuleRoomIndex, 1);
      this.isDeleteRuleRoom = !this.isDeleteRuleRoom;
    },

    //修改规则房间
    ruleChangeRoomBtn(index, item) {
      console.log(index + item);
      this.ruleChangeRoom = !this.ruleChangeRoom;
    },

    //修改规则房间确定
    ruleChangeRoomSure() {
      this.ruleChangeRoom = !this.ruleChangeRoom;
    },

    //回收站
    recycleBtn() {
      this.isRecycle = !this.isRecycle;
    },

    //还原房间
    reductionRoomBtn(index,item){
      console.log(item + index)
       this.isRecycle = !this.isRecycle;
    }
  },
  mounted() {
    if (this.hoursList.length == 0) return;
    this.changeRoomName = this.hoursList[0].roomStatus;
    this.changeRoomList = this.hoursList[0];

    this.dateForm.price = this.hoursList[0].roomPrice;
  }
};
</script>

<style scoped lang="scss">
.con {
  background: #f2f2f2;
}

.row {
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .span1 {
    color: #000000;
    margin-left: 40px;
    font-weight: bold;
  }
  span {
    color: #a2bfc4;
    margin-left: 10px;
  }
  .el-button {
    margin-left: 40px;
  }
}

.btn_div {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

section {
  text-align: left;
  //   height: calc(100% - 56px);
  overflow-y: auto;
  padding: 10px 0px;
  .roomBox > li {
    margin-bottom: 50px;
  }
  .room {
    height: 200px;
    overflow-x: auto;
    white-space: nowrap;
    li {
      display: inline-block;
      border-radius: 4px;
      border: 3px solid #fff;
      background: #fff;
      cursor: pointer;
      height: 90px;
      width: 14%;
      margin-right: 2.5%;
      margin-top: 25px;
      position: relative;
      margin-left: 10px;
      padding: 10px;

      &.active {
        border: 3px solid #97cffe;
      }

      .is_locking {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        text-align: right;
        padding: 5px 5px 0px 0px;
        box-sizing: border-box;

        span {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 30px;
          z-index: 2;
          text-align: right;
          padding: 5px 5px 0px 0px;
          box-sizing: border-box;
        }
      }
    }
  }
}

.dialog-footer {
  text-align: center;
  margin-top: 25px;
  width: 100%;

  .el-button {
    width: 100%;
  }
}

.roomDate {
  width: 94%;
  height: 300px;
  background: #fff;
  margin-left: 3%;
  margin-top: 10px;
}

.block {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;

  i {
    padding: 10px;
  }

  .btn_div {
    width: 100%;
    text-align: end;
    margin-right: 60px;
  }
}

.date_div {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
    background: #5ea3ff;
    color: #fff;

    li {
      width: 100%;
      height: 200px;
      border: 1px solid #cccccc;

      .el-input {
        width: 100px;
      }
    }
  }
}

.item_date {
  height: 100px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  display: flex;
  flex-direction: column;

  span {
    padding: 5px;
  }
}

.change_div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .el-select {
    width: 100%;
  }

  .change_foot {
    margin-top: 40px;

    .el-button {
      width: 150px;
    }
  }
}
.changePriceDialog {
  text-align: center;
  margin-top: 25px;
  width: 100%;
}

.btn_active {
  background: coral;
}

.week_div {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
    background: #fff;

    li {
      width: 100%;
      height: 200px;
      border: 1px solid #cccccc;

      .el-input {
        width: 100px;
      }
    }
  }
}

.input_div {
  display: flex;
  flex-direction: row;

  .el-input {
    width: 200px;
  }
}

.rule_div {
  width: 94%;
  height: 300px;
  background: #fff;
  margin-left: 3%;
  margin-top: 10px;
}

.rule_block {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;

  .add_room_div {
    width: 150px;
    height: 150px;
    background: #cccccc;
    text-align: center;
    line-height: 150px;
    color: #fff;
    font-size: 50px;
  }

  ul {
    height: 150px;
    display: flex;
    margin-left: 10px;
    flex-wrap: wrap;

    li {
      margin-right: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border: 1px solid #5ea3ff;
      text-align: center;
      position: relative;

      .rule_delete {
        position: absolute;
        top: 5px;
        right: 2px;
        background: #bc6f5c;
        border-radius: 50%;
        font-size: 25px;
        color: white;
      }

      .el-button {
        width: 130px;
      }
    }
  }

  .fjh_div {
    width: 150px;
    border-bottom: 1px solid #5ea3ff;
    padding: 5px;
    color: #5ea3ff;
    font-size: 20px;
    text-align: center;
  }

  .lc_div {
    width: 150px;
    padding: 5px;
    color: #5ea3ff;
    font-size: 14px;
    text-align: center;
  }
}
</style>
<template>
  <div class="inPage">
    <el-drawer :visible="show" :append-to-body="true" :with-header="false" @close="handleClose">
      <div class="inhouse">
        <header>
          <div>
            <i class="el-icon-arrow-left" @click="cancel"></i>
            <span>办理入住</span>
          </div>
          <el-button size="small">查看预订单</el-button>
        </header>
        <section>
          <el-collapse v-model="activeName2">
            <el-collapse-item name="0" v-for="(item,index) in indexPage.room" :key="index">
              <template slot="title">
                <div class="slotTitle">
                  <span>{{item.roomNumber}} {{item.name}}</span>
                  <span v-if="!is_hour">{{item.list.length}}晚</span>
                  <span>￥{{item.value2}}</span>
                </div>
              </template>
              <div class="roomFotm">
                <div v-for="(v,i) in item.list" :key="i" class="roomlist">
                  <span>{{v.date}}</span>
                  <span v-if="is_hour">1小时</span>
                  <div>
                    <el-input size="small" v-model="v.price"></el-input>
                    <i
                      class="el-icon-remove"
                      v-show="i==item.list.length-1"
                      @click="delRoom(index,i,item.id,v.id)"
                    ></i>
                  </div>
                </div>
                <div class="add">
                  <i class="el-icon-circle-plus" @click="handleAdd(index)"></i>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="入驻信息" name="1">
              <div class="secondSlide">
                <h3>
                  <span>来源：</span>
                  <el-select size="small" v-model="inhoursForm.userInfo.from">
                    <el-option label="散客" value="0"></el-option>
                    <el-option label="常住客" value="1"></el-option>
                  </el-select>
                </h3>
                <ul class="userTabs">
                  <h5>入住人</h5>
                  <li class="radioBtn">
                    <el-radio-group v-model="inhoursForm.userInfo.radio">
                      <el-radio :label="1">境内</el-radio>
                      <el-radio :label="2">境外</el-radio>
                    </el-radio-group>
                    <div>
                      <el-button size="small" type="primary">常住客</el-button>
                      <el-button size="small" type="primary">手工录入</el-button>
                      <el-button size="small" type="primary">扫描证件</el-button>
                    </div>
                  </li>
                  <li class="userInput">
                    <div>
                      <el-form :model="inhoursForm.userInfo" label-width="100px">
                        <el-form-item label="中文姓名：" required>
                          <el-input size="small" v-model="inhoursForm.userInfo.chineseName"></el-input>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                          <el-input size="small" value="居民身份证" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码：" required>
                          <el-input size="small" v-model="inhoursForm.userInfo.valueNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="手 机 号" required>
                          <el-input size="small" v-model="inhoursForm.userInfo.phone"></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div>
                      <img src="./../../assets/imgs/ren.png" />
                    </div>
                  </li>
                </ul>
                <!-- 同住人列表 -->
                <ul class="userTabs" v-for="(v,i) in inhoursForm.userInfo.addUser" :key="i">
                  <i class="delUser el-icon-remove" @click="delUser(i)"></i>
                  <h5>同住人</h5>
                  <li class="radioBtn">
                    <el-radio-group v-model="v.radio">
                      <el-radio :label="1">境内</el-radio>
                      <el-radio :label="2">境外</el-radio>
                    </el-radio-group>
                    <div>
                      <el-button size="small" type="primary">常住客</el-button>
                      <el-button size="small" type="primary">宾客修改</el-button>
                      <el-button size="small" type="primary">扫描证件</el-button>
                    </div>
                  </li>
                  <li class="userInput">
                    <div>
                      <el-form :model="v" label-width="100px">
                        <el-form-item label="中文姓名：" required>
                          <el-input size="small" v-model="v.chineseName"></el-input>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                          <el-input size="small" value="居民身份证" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码：" required>
                          <el-input size="small" v-model="v.valueNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="手 机 号" required>
                          <el-input size="small" v-model="v.phone"></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div>
                      <img src="./../../assets/imgs/ren.png" />
                    </div>
                  </li>
                </ul>
                <p>
                  <span>增加同住人</span>
                  <i class="el-icon-circle-plus" @click="handleAdduser"></i>
                </p>
              </div>
            </el-collapse-item>
            <el-collapse-item title="财务记录" name="2">
              <ul class="thirdSlide">
                <li v-for="(v,i) in inhoursForm.finance" :key="i">
                  <div>
                    <el-select size="small" v-model="v.value1">
                      <el-option label="手工房费" :value="0"></el-option>
                      <el-option label="维修费" :value="1"></el-option>
                      <el-option label="零食" :value="2"></el-option>
                    </el-select>
                    <el-select size="small" v-model="v.value2">
                      <el-option label="现金" :value="0"></el-option>
                      <el-option label="支付宝" :value="1"></el-option>
                      <el-option label="微信" :value="2"></el-option>
                    </el-select>
                    <el-input size="small" v-model="v.price"></el-input>
                    <i class="el-icon-remove" @click="delFinance(i)"></i>
                  </div>
                  <el-input size="small" v-model="v.mark"></el-input>
                </li>
                <li>
                  <span></span>
                  <i class="el-icon-circle-plus" @click="addFinance"></i>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="财务合计" name="3">
              <ul class="finance">
                <li>
                  <span>订单金额：</span>
                  <span>￥200</span>
                </li>
                <li>
                  <span>已收金额：</span>
                  <span>￥0</span>
                </li>
                <li>
                  <span>已收押金：</span>
                  <span>￥0</span>
                </li>
                <li class="extra">
                  <span>需补房费(不算押金)：</span>
                  <span>￥200</span>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="备注" name="4">
              <el-input type="textarea" row="5"></el-input>
            </el-collapse-item>
          </el-collapse>
          <footer class="footer2">
            <span @click="submit">完 成</span>
            <span @click="cancel">返 回</span>
          </footer>
        </section>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    is_hour:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    "$store.state.roomList"(val) {
      this.indexPage.room = val;
    }
  },
  data() {
    return {
      activeName2: ["0", "1", "2", "3", "4"],
      indexPage: {
        room: this.$store.state.roomList
      },
      inhoursForm: {
        oldarr: [{ date: "2020-05-23", value: "" }],
        newarr: [],
        userInfo: {
          from: "1", //来源
          radio: "",
          chineseName: "",
          valueNumber: "",
          phone: "",
          addUser: []
        },
        finance: [
          //财务信息
          { value1: 0, value2: 0, price: "0", mark: "" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    addFinance() {
      this.inhoursForm.finance.push({
        value1: 0,
        value2: 0,
        price: "0",
        mark: ""
      });
    },
    handleClose() {
      this.$emit("closeIn");
    },
    submit() {
      this.$message.success("入住成功");
      this.handleClose();
    },
    cancel() {
      this.handleClose();
    },
    delFinance(i) {
      this.inhoursForm.finance.splice(i, 1);
    },
    handleAdduser() {
      //增加同住人
      this.inhoursForm.userInfo.addUser.push({
        from: "1", //来源
        radio: "",
        chineseName: "",
        valueNumber: "",
        phone: ""
      });
    },
    delUser(i) {
      this.inhoursForm.userInfo.addUser.splice(i, 1);
    },
    handleAdd(i) {
      console.log(this.indexPage.room,'1111111')
      var dateTime =
        this.indexPage.room[i].list.length == 0
          ? new Date()
          : new Date(
             '2020-'+this.indexPage.room[i].list[this.indexPage.room[i].list.length - 1].date
            ); //取住房最后一天时间
      dateTime = dateTime.setDate(dateTime.getDate() + 1); //再最后一天基础上加一天
      dateTime = this.$moment(new Date(dateTime)).format("YYYY-MM-DD"); //转化为毫秒
      this.indexPage.room[i].list.push({ price: "100",id:5, date: dateTime.slice(5) })
      console.log(this.indexPage.room)
      this.$store.commit("setroomListInfo", this.indexPage.room);
      //this.inhoursForm.newarr.push({ price: "10000", time: dateTime });
    },
    delRoom(index, i, id, idx) {
      //id表示日历的第几横列，idx表示第几列
      this.indexPage.room[index].list.splice(i, 1);
      if (this.indexPage.room[index].list.length == 0) {
        this.indexPage.room.splice(index, 1);
      }
      var data = {
        list: this.indexPage.room,
        index: id,
        i: idx
      };
      this.$emit("changeData", data);
      this.$store.commit("setroomListInfo", this.indexPage.room);
    }
  }
};
</script>

<style scoped lang="scss">
.inhouse {
  height: 100%;
  header {
    display: flex;
    font-size: 18px;
    & > div {
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
        font-size: 24px;
        cursor: pointer;
      }
    }
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background: #5ea3ff;
    color: #fff;
    padding: 0px 15px;
  }
  section {
    padding: 20px 15px;
    height: calc(100% - 120px);
    overflow-y: auto;
    .slotTitle {
      flex: 1;
      padding-right: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .roomFotm {
      margin-top: 15px;
      & > .add {
        display: flex;
        justify-content: flex-end;
        padding-right: 28px;
        i {
          font-size: 28px;
          cursor: pointer;
        }
      }
      .roomlist {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 0px 10px;
        height: 40px;
        font-size: 16px;
        .el-input {
          width: 80px;
          margin: 0px 8%;
        }
        .el-select {
          width: 120px;
        }
        i {
          cursor: pointer;
          font-size: 28px;
        }
        & > div {
          width: 150px;
          align-items: center;
          display: flex;
          justify-content: flex-start;
        }
      }
    }
    .secondSlide {
      h3 {
        margin: 10px 0px;
      }
      .userTabs {
        border: 1px solid #ccc;
        margin: 18px 0px;
        padding: 10px;
        position: relative;
        &:hover .delUser {
          display: inline-block;
        }
        .delUser {
          position: absolute;
          top: 1px;
          right: 1px;
          font-size: 28px;
          color: #e41241;
          cursor: pointer;
          display: none;
        }
        li {
          &.radioBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          &.userInput {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 15px;
            padding-bottom: 15px;
            box-sizing: border-box;
            & > div:nth-child(1) {
              width: 65%;
            }
            & > div:nth-child(2) {
              width: 30%;
              img {
                width: 100%;
              }
            }
          }
        }
      }
      p {
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
        i {
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
    .thirdSlide {
      padding-right: 15px;
      .mark {
        cursor: pointer;
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-select {
          width: 150px;
        }
        .el-input {
          width: 100px;
        }
      }
      i {
        font-size: 30px;
        cursor: pointer;
      }
      & > li > div.el-input {
        margin-top: 15px;
      }
      li {
        margin-top: 15px;
      }
      li:last-child {
        text-align: right;
      }
    }
    .finance {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
      }
    }
    .el-textarea {
      margin: 15px 0px;
    }
  }
  footer {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    background: #fff;
    align-items: center;
    padding: 0px 10px;
    padding-bottom: 10px;
    span {
      width: 45%;
      height: 40px;
      background: #5ea3ff;
      text-align: center;
      color: #fff;
      cursor: pointer;
      line-height: 40px;
      border-radius: 6px;
      &:hover {
        background: #3a89f0;
      }
    }
    & span:nth-child(2) {
          background: #c58383;
          &:hover {
            background: rgb(238, 157, 157);
          }
        }
  }
}
</style>
<style>
.inhouse .el-drawer__body {
  padding: 0px 15px;
}
.inhouse .el-collapse-item__header {
  color: #333;
  font-size: 16px;
  background: #f5f5f5;
  padding-left: 10px;
}
.inhouse .el-drawer__body {
  height: 100%;
}
.el-drawer__body {
  position: relative;
  height: 100%;
}
</style>

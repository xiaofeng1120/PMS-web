<template>
  <div class="reservePage">
    <el-drawer :visible="show" :with-header="false" @close="handleClose">
      <div v-show="type==0" class="fristPage">
        <header>
          <div class="left">
            <h2>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</h2>
            <el-button type="primary">换房</el-button>
          </div>
          <div class="right">
            <i class="el-icon-s-flag"></i>
            <i class="el-icon-mobile-phone"></i>
          </div>
        </header>
        <section>
          <div class="content">
            <h5>
              {{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}
              <span
                v-if="$store.state.room.roomStatus!='脏房'"
              >为净房</span>
              <span v-else>为脏房</span>
            </h5>
            <div>
              <el-button
                size="small"
                :type="$store.state.room.roomStatus!='脏房'?'primary':''"
                :disabled="$store.state.room.roomStatus=='脏房'"
              >设为脏</el-button>
              <el-button
                size="small"
                :type="$store.state.room.roomStatus=='脏房'?'primary':''"
                :disabled="$store.state.room.roomStatus!='脏房'"
              >设为净</el-button>
            </div>
          </div>
          <ul class="orderNumber">
            <li>
              <span>订单号：</span>
              <span>201603090953470000186</span>
            </li>
            <li>
              <span>订单类型：</span>
              <span>到付订单</span>
            </li>
          </ul>
          <ul class="orderNumber">
            <li>
              <span>入住时间：</span>
              <span>2016-03-09 09:53</span>
            </li>
            <li>
              <span>预离时间：</span>
              <span>2016-03-14 14:30</span>
            </li>
          </ul>
          <el-collapse v-model="activeName">
            <el-collapse-item title="联系人" name="0">
              <ul class="user">
                <li>
                  <span>姓名：</span>
                  <span>小白</span>
                </li>
                <li>
                  <span>电话：</span>
                  <span>15012345678</span>
                </li>
                <li>
                  <span>渠道：</span>
                  <span>散客</span>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="房费信息" name="1">
              <ul class="cost">
                <li>
                  <span>05月27日</span>
                  <span>￥200</span>
                </li>
                <div class="price">
                  共计：￥
                  <span>200</span>
                </div>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="财务记录" name="2">
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
            <el-collapse-item title="备注" name="3">
              <el-input type="textarea" row="5"></el-input>
            </el-collapse-item>
          </el-collapse>
          <footer>
            <span @click="handleInhours">办理入住</span>
            <span @click="Edit">修改</span>
            <span @click="handleCancel">取消预定</span>
          </footer>
        </section>
      </div>
      <div v-show="type==1" class="inhours">
        <header>
          <div>
            <i class="el-icon-arrow-left" @click="type=0"></i>
            <span>办理入住</span>
          </div>
          <el-button>查看预订单</el-button>
        </header>
        <section>
          <el-collapse v-model="activeName2">
            <el-collapse-item name="0">
              <template slot="title">
                <div class="slotTitle">
                  <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
                  <span>1晚</span>
                  <span>￥200</span>
                </div>
              </template>
              <ul class="fristSlide">
                <li v-for="(v,i) in inhoursForm.oldarr" :key="i" class="oldlist">
                  <span>{{v.date}}</span>
                  <el-input size="small" v-model="v.value"></el-input>
                </li>
                <li v-for="(item,index) in inhoursForm.newarr" :key="item.time" class="addlist">
                  <span>{{item.time}}</span>
                  <div>
                    <el-input size="small" v-model="item.price"></el-input>
                    <i class="el-icon-remove" @click="handleRemove(index)"></i>
                  </div>
                </li>
                <li class="add">
                  <i class="el-icon-circle-plus" @click="handleAdd"></i>
                </li>
              </ul>
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
                      <el-button size="small" type="primary">宾客修改</el-button>
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
                      <img src="../assets/imgs/ren.png" />
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
                      <img src="../assets/imgs/ren.png" />
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
      <div v-show="type==2" class="Edit inhours">
        <header>
          <div>
            <i class="el-icon-arrow-left" @click="type=0"></i>
            <span>修改订单</span>
          </div>
        </header>
        <section>
          <el-collapse v-model="activeName2">
            <el-collapse-item name="0" title="联系人">
              <el-form v-model="edit.user" label-width="80px">
                <el-form-item label="姓名：">
                  <el-input size="small" v-model="edit.user.uname"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                  <el-input size="small" v-model="edit.user.uphone"></el-input>
                </el-form-item>
                <el-form-item label="来源：">
                  <el-select size="small" v-model="edit.user.from">
                    <el-option label="手工房费" :value="0"></el-option>
                    <el-option label="维修费" :value="1"></el-option>
                    <el-option label="零食" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <h1>房间信息</h1>
            <el-collapse-item name="1">
              <template slot="title">
                <div class="slotTitle">
                  <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
                  <span>1晚</span>
                  <span>￥200</span>
                </div>
              </template>
              <ul class="fristSlide">
                <li class="oldlist">
                  <span></span>
                  <span></span>
                  <span>05月26日</span>
                  <el-input size="small" v-model="edit.hours.value"></el-input>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="消费信息" name="2">
              <ul class="thirdSlide">
                <li v-for="(item,index) in edit.consume" :key="index">
                  <div>
                    <el-select size="small" v-model="item.value1">
                      <el-option label="手工房费" :value="0"></el-option>
                      <el-option label="维修费" :value="1"></el-option>
                      <el-option label="零食" :value="2"></el-option>
                    </el-select>
                    <div>
                      <span>消费金额 ：</span>
                      <el-input size="small" v-model="item.price"></el-input>
                    </div>
                    <i class="el-icon-remove" @click="delConsume(index)"></i>
                  </div>
                  <el-input size="small" v-model="item.mark" placeholder="备注"></el-input>
                </li>
                <li>
                  <span></span>
                  <i class="el-icon-circle-plus" @click="addConsume"></i>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="财务记录" name="3">
              <ul class="thirdSlide line">
                <li v-for="(v,i) in edit.finance" :key="i">
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
                    <i class="el-icon-remove" @click="EditdelFinance(i)"></i>
                  </div>
                  <el-input size="small" v-model="v.mark"></el-input>
                </li>
                <li>
                  <span></span>
                  <i class="el-icon-circle-plus" @click="EditaddFinance"></i>
                </li>
              </ul>
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
    <!-- 提示弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <div>确定取消预定吗?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(newValue) {
      if (newValue) {
        //每次打开弹窗都初始化data
        Object.assign(this.$data, this.$options.data());
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      type: 0,
      activeName: ["0", "1", "2", "3", "4"],
      activeName2: ["0", "1", "2", "3", "4"],
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
      },
      edit: {
        user: {
          uname: "",
          uphone: "",
          from: ""
        },
        hours: {
          value: ""
        },
        consume: [
          {
            value1: "",
            price: "",
            mark: ""
          }
        ],
        finance: [{ value1: 0, value2: 0, price: "0", mark: "" }]
      }
    };
  },
  methods: {
    handleCancel() {
      this.dialogVisible = true;
    },
    confirm(){
        this.dialogVisible = false;
       this.handleClose();
    },
    handleClose() {
      this.$emit("closeReserve");
    },
    handleInhours() {
      this.type = 1;
    },
    Edit() {
      this.type = 2;
    },
    handleAdd() {
      var dateTime =
        this.inhoursForm.newarr.length == 0
          ? new Date()
          : new Date(
              this.inhoursForm.newarr[this.inhoursForm.newarr.length - 1].time
            ); //取住房最后一天时间
      dateTime = dateTime.setDate(dateTime.getDate() + 1); //再最后一天基础上加一天
      dateTime = this.$moment(new Date(dateTime)).format("YYYY-MM-DD"); //转化为毫秒
      this.inhoursForm.newarr.push({ price: "10000", time: dateTime });
    },
    handleRemove(i) {
      this.inhoursForm.newarr.splice(i, 1);
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
    delFinance(i) {
      this.inhoursForm.finance.splice(i, 1);
    },
    EditdelFinance(i) {
      this.edit.finance.splice(i, 1);
    },
    EditaddFinance() {
      this.edit.finance.push({
        value1: 0,
        value2: 0,
        price: "0",
        mark: ""
      });
    },
    addFinance() {
      this.inhoursForm.finance.push({
        value1: 0,
        value2: 0,
        price: "0",
        mark: ""
      });
    },
    submit() {
      this.$message.success("入住成功");
      this.handleClose();
    },
    cancel() {
      this.type = 0;
    },
    delConsume(i) {
      //删除消费记录
      this.edit.consume.splice(i, 1);
    },
    addConsume() {
      this.edit.consume.push({
        value1: "",
        price: "",
        mark: ""
      });
    }
  }
};
</script>

<style scoped lang="scss">
.reservePage {
  font-size: 16px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    .right {
      display: flex;
      align-items: center;
      span,
      i {
        margin-left: 10px;
      }
      i {
        font-size: 22px;
        color: #5ea3ff;
        cursor: pointer;
        margin-left: 15px;
      }
    }
    .left {
      display: flex;
      align-items: center;
      h2 {
        font-size: 18px;
        margin-right: 15px;
      }
    }
  }
  .fristPage {
    height: 100%;
    section {
      height: calc(100% - 120px);
      overflow-y: auto;
      padding-right: 15px;
    }
  }
  .content,
  .orderNumber {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
  }
  .user {
    padding: 0px 10px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
    }
  }
  .cost {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 15px 0px;
      border-bottom: 1px solid #ccc;
    }
    .price {
      text-align: right;
      span {
        color: #e41241;
        line-height: 40px;
      }
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
    width: 98%;
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
      width: 30%;
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
  }
  .footer2 span {
    width: 45%;
  }
  //   入驻页面样式
  .inhours {
    height: 100%;
    header {
      font-size: 20px;
      i {
        font-size: 22px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
    section {
      height: calc(100% - 120px);
      overflow-y: auto;
      padding-right: 15px;
      .slotTitle {
        flex: 1;
        padding-right: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .fristSlide {
        margin: 10px 0px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          .el-input {
            width: 100px;
            margin-right: 15px;
          }
          &.add {
            justify-content: flex-end;
            i {
              font-size: 28px;
              cursor: pointer;
            }
          }
        }
        .oldlist {
          padding-right: 28px;
        }
        .addlist {
          div {
            display: flex;
            align-items: center;
          }
          i {
            font-size: 28px;
            cursor: pointer;
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
      .line {
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
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
    }
  }
  //修改页面样式
  .Edit {
    .el-form {
      width: 80%;
      margin-top: 20px;
    }
    h1 {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
<style lang="scss">
.reservePage .el-drawer__body {
  padding: 0px 15px;
}
.reservePage .el-collapse-item__header {
  color: #333;
  font-size: 18px;
  background: #f5f5f5;
  padding-left: 10px;
}
.reservePage .el-drawer__body {
  height: 100%;
}
</style>
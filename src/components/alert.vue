<template>
  <div class="alertPage">
    <el-drawer :visible="is_show" :with-header="false" @close="handleClose">
      <div v-show="reserve==1">
        <header>
          <div>
            <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
          </div>
          <div>
            <el-button size="small" type="primary" @click="handleReserve">预定</el-button>
            <el-button size="small" type="primary" @click="Locking">锁房</el-button>
            <el-button size="small" type="primary" @click="setDirty" v-if="!($store.state.room.roomStatus=='脏房')">设为脏</el-button>
            <el-button size="small" type="primary" @clic="setClean" v-else>设为净</el-button>
          </div>
        </header>
        <ul class="tabs">
          <li v-for="(item,index) of form" :key="index" :class="formIndex==index?'active':''">
            <div @click="changeInfo(index)">宾客{{index+1}}</div>
            <i class="el-icon-close" @click="delUser(index)"></i>
          </li>
          <li class="add" @click="addUser">
            <img src="../assets/imgs/add.png" />
          </li>
        </ul>
        <div class="main">
          <div class="btnList">
            <div>
              <el-radio-group v-model="form[formIndex].radio">
                <el-radio :label="1">境内</el-radio>
                <el-radio :label="2">境外</el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-button size="small" type="primary" @click="showDialog">扫描证件</el-button>
              <el-button size="small" type="primary" @click="Manual">手工录入</el-button>
              <el-button size="small" type="primary">常住客</el-button>
            </div>
          </div>
          <!-- 用户姓名手机号等信息 -->
          <div class="userInfo">
            <div>
              <el-form :model="form[formIndex]" label-width="100px">
                <el-form-item label="中文姓名：" required>
                  <el-input size="small" v-model="form[formIndex].userName"></el-input>
                </el-form-item>
                <el-form-item label="证件类型：">
                  <el-input size="small" value="居民身份证" readonly></el-input>
                </el-form-item>
                <el-form-item label="证件号码：" required>
                  <el-input size="small" v-model="form[formIndex].userNumber"></el-input>
                </el-form-item>
                <el-form-item label="手 机 号" required>
                  <el-input size="small" v-model="form[formIndex].userPhone"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <img src="../assets/imgs/ren.png" />
            </div>
          </div>
          <!-- 房间信息 -->
          <div class="hoursInfo">
            <el-form :model="formRoom" label-width="100px">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="入住天数：" required>
                    <el-select
                      v-model="formRoom.day"
                      placeholder="请选择入住天数"
                      filterable
                      size="small"
                      @blur="selectBlur"
                    >
                      <el-option label="1天" value="1"></el-option>
                      <el-option label="2天" value="2"></el-option>
                      <el-option label="3天" value="3"></el-option>
                      <el-option label="4天" value="4"></el-option>
                      <el-option label="5天" value="5"></el-option>
                      <el-option label="6天" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2" class="date">
                  <el-form-item label="预离日期：">
                    <!-- <el-input size="small" v-model="formRoom.date"></el-input> -->
                    <el-date-picker
                      size="small"
                      v-model="formRoom.date"
                      type="date"
                      placeholder="请选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="房  费：">
                    <el-input size="small" v-model="formRoom.cost"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="3">
                  <el-checkbox v-model="formRoom.checked">时租房</el-checkbox>
                </el-col>
              </el-row>
              <!-- 第三行 -->
              <el-row>
                <el-col :span="11">
                  <el-form-item label="收  款：">
                    <el-input size="small" v-model="formRoom.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="付款方式">
                    <el-select v-model="formRoom.payType" size="small" placeholder="请选择付款方式">
                      <el-option label="现金" value="xianjin"></el-option>
                      <el-option label="微信" value="weixin"></el-option>
                      <el-option label="支付宝" value="zhifubao"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="渠道：">
                    <el-select v-model="formRoom.channel" size="small" placeholder="请选择客户渠道">
                      <el-option label="散客" value="0"></el-option>
                      <el-option label="常住客" value="1"></el-option>
                      <el-option label="网上客户" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注：">
                    <el-input type="textarea" v-model="formRoom.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="alertFooter">
          <ul>
            <li>快速入住</li>
            <li>取消</li>
          </ul>
          <!-- <el-button type="primary">快速入住</el-button>
          <el-button type="primary">取消</el-button>-->
        </div>
      </div>
      <!-- 预定房间 -->
      <div v-show="reserve==2" class="reserve">
        <h2>
          <i class="el-icon-arrow-left" @click="handleBack"></i>
          <div>预定房间</div>
        </h2>
        <div>
          <el-collapse v-model="activeName">
            <el-collapse-item title="联系人" name="1">
              <el-form label-width="80px">
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="姓名：">
                      <el-input v-model="form2.userName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="手机号：">
                      <el-input v-model="form2.userNumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="渠道：">
                      <el-select v-model="form2.channel" size="small" placeholder="请选择渠道">
                        <el-option label="散客" value="1"></el-option>
                        <el-option label="团队" value="2"></el-option>
                        <el-option label="常住客" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <h3>
              房间信息
              <hr />
            </h3>
            <el-collapse-item name="0">
              <template slot="title">
                <div class="hoursTitle">
                  <span>609 商务房</span>
                  <span>1晚</span>
                  <span>￥ {{form2.price}}</span>
                </div>
              </template>
              <el-row>
                <el-col :span="6" :offset="10">
                  <el-select size="small" v-model="form2.date">
                    <el-option label="05月25号" value="525"></el-option>
                    <el-option label="05月26号" value="526"></el-option>
                    <el-option label="05月27号" value="527"></el-option>
                    <el-option label="05月28号" value="528"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="3" :offset="1">
                  <el-input size="small" v-model="form2.price"></el-input>
                </el-col>
                <el-col :span="2" :offset="2">
                  <i class="el-icon-remove-outline remove" @click="delRoom"></i>
                </el-col>
              </el-row>
              <el-row class="total">
                <el-col :span="6" :offset="18">
                  <span>合计：￥ {{form2.price}}</span>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="备注" name="2">
              <el-row>
                <el-col :span="22" :offset="1">
                  <el-input type="textarea" :rows="2" v-model="form2.textarea"></el-input>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="alertFooter">
          <ul>
            <li @click="reserveSubmit">完成</li>
            <li>取消</li>
          </ul>
        </div>
      </div>
      <!--锁房  -->
      <div v-show="reserve==3" class="locking">
        <h2>锁定房间</h2>
        <div class="header">
          <div class="roomInfo">
            <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
          </div>
          <div>
            <el-date-picker
              v-model="lockingForm.value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div>
          <h3>锁房原因</h3>
          <el-radio-group v-model="lockingForm.radio">
            <div>
              <el-radio :label="1">维修</el-radio>
            </div>
            <div>
              <el-radio :label="2">装修</el-radio>
            </div>
            <div>
              <el-radio :label="3">其他</el-radio>
            </div>
          </el-radio-group>
          <h3>备注</h3>
          <el-input type="textarea" v-model="lockingForm.textarea" :rows="5"></el-input>
        </div>
        <div class="alertFooter">
          <ul>
            <li @click="lockingSubmit">完 成</li>
            <li @click="Cancel">取 消</li>
          </ul>
        </div>
      </div>
    </el-drawer>
    <!-- 证件自动扫描 -->
    <Scan :show="dialogFormVisible" :Status="Status" @closeScan="closeScan"></Scan>
  </div>
</template>

<script>
import Scan from "./../components/scan";
export default {
  props: {
    is_show: {
      type: Boolean,
      default: false
    }
  },
  components:{
    Scan
  },
  watch: {
    is_show(newValue) {
      if (newValue) {
        //每次打开弹窗都初始化data
        Object.assign(this.$data, this.$options.data());
      }
    }
  },
  data() {
    return {
      formIndex: 0, //当前用户的下标（第几个用户）
      dialogFormVisible: false, //证件扫描弹窗
      form: [
        {
          radio: 1, //境内 外
          userName: "小白", // 中文姓名
          userNumber: "3251514654489851", //证件号码
          userPhone: "15312345678" //手机号
        },
        {
          radio: 1, //境内 外
          userName: "小黑", // 中文姓名
          userNumber: "6564515114451212", //证件号码
          userPhone: "18012345678" //手机号
        }
      ],
      formRoom: {
        day: "", //入住天数
        date: "", //预离日期
        cost: "", //费用
        checked: false, //是否是时租房
        price: "", //收款
        payType: "", //付费方式
        channel: "", //渠道
        remarks: "" //备注
      },
      form2: {
        //预定的信息
        userName: "",
        userNumber: "",
        channel: "", //渠道
        date: "",
        price: "200",
        textarea: ""
      },
      reserve: 1, //快速入住，如果为false，显示房间预定
      Status:-1,// 2 是自动扫描  1是手动录入
      activeName: ["0", "1", "2"],
      lockingForm: {
        value1: "",
        radio:'',
        textarea:''
      }
    };
  },
  created() {},
  methods: {
    Cancel(){//锁房取消
      this.reserve=1;
    },
    lockingSubmit(){//锁房提交
      if(this.lockingForm.value1==''){
        return this.$message.error("请选择时间!")
      }else if(this.lockingForm.radio==''){
        return this.$message.error("请选择锁房原因!")
      }else{
        this.$message.success("锁定房间成功");
        this.$emit("closeAlert");
      }
    },
    closeScan(){
      this.dialogFormVisible = false;
    },
    setDirty(){
      this.$confirm('确认设置为脏房?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$emit("closeAlert");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.$emit("closeAlert");         
        });
    },
    setClean(){
      this.$confirm('确认设置为净房?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$emit("closeAlert");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.$emit("closeAlert");         
        });
    },
    handleClose() {
      this.$emit("closeAlert");
    },
    selectBlur(e) {
      //失去焦点
      this.formRoom.day = e.target.value;
    },
    Locking() {
      //锁定房间
      this.reserve = 3;
    },
    Manual() {
      //手动录入
      this.Status=1;
      this.dialogFormVisible = true;
    },
    showDialog() {
      const loading = this.$loading({
        lock: true,
        text: "扫描中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        //模拟请求接口
        this.Status=2;
        this.dialogFormVisible = true;
      }, 1000);
    },
    addUser() {
      //增加房客
      if (this.form.length < 4) {
        this.form.push({
          radio: 1, //境内 外
          userName: "", // 中文姓名
          userNumber: "", //证件号码
          userPhone: "" //手机号
        });
      } else {
        this.$message.error("一个房间最多只能住4人");
      }
    },
    delUser(i) {
      if (this.form.length > 1) {
        this.formIndex = this.form.length - 2;
        this.form.splice(i, 1);
      } else {
        return this.$message.error("一个房间最少住一个客户");
      }
    },
    changeInfo(i) {
      this.formIndex = i;
    },
    handleReserve() {
      //点击预定的时候
      this.reserve = 2;
    },
    handleBack() {
      this.reserve = 1; //返回上一级
    },
    delRoom() {},
    reserveSubmit() {
      if (this.form2.userName == "") {
        return this.$message.error("请输入姓名");
      } else if (this.form2.userNumber == "") {
        return this.$message.error("请输入手机号");
      } else if (this.form2.channel == "") {
        return this.$message.error("请选择渠道");
      } else if (this.form2.date == "") {
        return this.$message.error("请选择日期");
      } else if (this.form2.price == "") {
        return this.$message.error("请输入价格");
      } else {
        this.$emit("closeAlert");
        return this.$message.success("提交成功!");
      }
    }
  }
};
</script>

<style scoped lang="scss">
header {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  div {
    span {
      font-size: 20px;
    }
  }
}
.tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #888;
  li {
    border: 1px solid #888;
    border-left: none;
    height: 100%;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 0px solid transparent;
    border-radius: 4px 4px 0px 0px;
    cursor: pointer;
    position: relative;
    &.active {
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      top: 1px;
      z-index: 1;
      color: #f00;
    }
    div {
      width: 80px;
      text-align: center;
    }
    &.add {
      border: none;
      line-height: 20px;
      padding: 0px 10px;
    }
    i.el-icon-close {
      display: none;
      position: absolute;
      right: 2px;
      top: 2px;
    }
    &:hover i.el-icon-close {
      display: inline-block;
      color: #5ea3ff;
    }
  }
}
h3 {
  padding: 0px 15px;
  line-height: 40px;
}
.main {
  padding: 0px 15px;
  .btnList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;
  }
  .userInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
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
  .hoursInfo {
    margin: 15px 0px;
  }
}
.alertFooter {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  padding: 0px 15px;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      line-height: 40px;
      width: 48%;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      &:nth-child(1) {
        background: #6da0aa;
        &:hover {
          background: rgb(32, 158, 184);
        }
      }
      &:nth-child(2) {
        background: #c98380;
        &:hover {
          background: rgb(243, 129, 125);
        }
      }
    }
  }
}
//预定样式
.reserve {
  height: 100%;
  position: relative;
  h2 {
    display: flex;
    align-items: center;
    height: 50px;
    i {
      cursor: pointer;
      margin-right: 5px;
      font-size: 20px;
    }
  }
  .hoursTitle {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }
  .remove {
    font-size: 30px;
    cursor: pointer;
  }
  .total {
    line-height: 30px;
    margin-top: 15px;
    font-size: 16px;
  }
}
//解锁 锁定样式
.locking{
  padding:0px 15px;
  height:100%;
  h2{
    height: 50px;
    line-height:50px;
  }
  .header{
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .el-radio-group>div{
    line-height:30px;
  }
  h3{
    padding:0px;
    line-height:40px;
  }
}
</style>
<style lang="scss">
.alertPage .el-drawer__body {
  background: #f5f5f5;
  position: relative;
}
.alertPage .el-collapse-item__header {
  background: #eee;
  padding: 0px 10px;
  border-bottom: 1px solid #ccc;
}
.alertPage .el-collapse-item__wrap {
  background-color: #f5f5f5;
  margin: 15px 0px;
}
.alertPage .el-collapse {
  border: none;
}
// .alertPage .el-form{
//   width:90%;
// }
.alertPage .el-date-editor.el-input,
.alertPage .el-date-editor.el-input__inner {
  width: 150px;
}
.alertPage .locking .el-date-editor.el-input,
.alertPage .locking .el-date-editor.el-input__inner {
  width: 280px;
}
.alertPage .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.alertPage .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.alertPage .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.alertPage .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.alertPage .avatar-uploader {
  text-align: center;
  margin-bottom: 25px;
}
.alertPage .el-dialog__body {
  padding: 5px 20px;
}
.alertPage .dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
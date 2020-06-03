<template>
  <div class="inhousePage">
    <el-drawer :visible="show" :with-header="false" @close="handleClose">
      <div v-show="type==0" class="index">
        <Head></Head>
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
          <div class="orderTime">
            <span>入住时间：</span>
            <span>2016-03-09 09:53</span>
            <span>预离时间：</span>
            <span>2016-03-14 14:30</span>
          </div>
          <!-- 入住信息 -->
          <h3>入住信息</h3>
          <ul class="userInfo">
            <li>
              <span>姓名</span>
              <div>
                <span>小黑</span>
                <el-button size="small">单人换房</el-button>
                <el-button size="small">单人退房</el-button>
                <el-button size="small">详情</el-button>
              </div>
            </li>
            <li>
              <span>证件类型</span>
              <span>居民身份证</span>
            </li>
            <li>
              <span>证件号</span>
              <span>120104198107225475</span>
            </li>
            <li>
              <span>手机号</span>
              <span>15012345678</span>
            </li>
            <li>
              <span>入住时间</span>
              <span>2016-03-09 09:53</span>
            </li>
            <li>
              <span>渠道</span>
              <span>散客</span>
            </li>
          </ul>
          <hr />
          <!-- 同住人信息 -->
          <ul class="userInfo">
            <li>
              <span>同住姓名</span>
              <div>
                <span>小黑</span>
                <el-button size="small">单人换房</el-button>
                <el-button size="small">单人退房</el-button>
                <el-button size="small">详情</el-button>
              </div>
            </li>
            <li>
              <span>证件类型</span>
              <span>居民身份证</span>
            </li>
            <li>
              <span>证件号</span>
              <span>120104198107225475</span>
            </li>
            <li>
              <span>手机号</span>
              <span>15012345678</span>
            </li>
            <li>
              <span>入住时间</span>
              <span>2016-03-09 09:53</span>
            </li>
            <li>
              <span>渠道</span>
              <span>散客</span>
            </li>
          </ul>
          <hr />
          <ul class="btnList">
            <li>
              <span>制卡</span>
              <span @click="Continue">续住</span>
              <span @click="roomChange">换房</span>
              <span>退房</span>
            </li>
            <li>
              <span @click="handleEdit">修改订单</span>
              <span>转全天房</span>
              <span @click="handleTransfer">转账</span>
              <span @click="handleMerge">在住单合并</span>
            </li>
          </ul>
        </section>
      </div>
      <div v-show="type==3" class="box">
        <Head></Head>
        <section class="Continue">
          <ul>
            <li>
              <span>证件号</span>
              <span>120104198107225475</span>
            </li>
            <li>
              <span>手机号</span>
              <span>15012345678</span>
            </li>
            <li>
              <span>入住时间</span>
              <span>2016-03-09 09:53</span>
            </li>
          </ul>
          <el-collapse v-model="activeName">
            <el-collapse-item title="房费信息" name="0">
              <ul class="priceInfo">
                <li>
                  <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
                  <span>2020-03-04</span>
                  <span>￥10000</span>
                </li>
                <li v-for="(item,index) in form" :key="index">
                  <span>{{item.roomName}}</span>
                  <span>{{item.time}}</span>
                  <div>
                    ￥
                    {{item.price}}
                  </div>
                </li>
                <li v-for="(item,index) in add" :key="item.time">
                  <div>
                    <el-select size="small" v-model="item.roomId">
                      <el-option label="105 单人间" :value="105"></el-option>
                      <el-option label="106 单人间" :value="106"></el-option>
                      <el-option label="107 单人间" :value="107"></el-option>
                    </el-select>
                  </div>
                  <span>{{item.time}}</span>
                  <div>
                    ￥
                    <el-input size="small" v-model="item.price"></el-input>
                  </div>
                  <i class="el-icon-remove" @click="handleRemove(index)"></i>
                </li>
                <li class="add">
                  <i class="el-icon-circle-plus" @click="handleAdd"></i>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="消费信息" name="1">
              <ul>
                <div v-for="(item,index) in consume" :key="index">
                  <li>
                    <span>{{item.roomName}}</span>
                    <span>{{item.time}}</span>
                    <span>￥{{item.price}}</span>
                    <span class="mark" @click="ShowMarks(index)">备注</span>
                  </li>
                  <li v-show="item.ShowMark">
                    <el-input size="small" v-model="item.mark"></el-input>
                  </li>
                </div>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="财务信息" name="2">
              <ul class="Finance">
                <li v-for="(item,index) in Finance" :key="index">
                  <div>
                    <span>{{item.FinanceName}}</span>
                    <span>{{item.time}}</span>
                    <span>￥{{item.price}}</span>
                    <span>备注</span>
                  </div>
                  <ul>
                    <li>
                      <span>订单金额：</span>
                      <span>￥{{item.orderPrice}}</span>
                    </li>
                    <li>
                      <span>已收金额：</span>
                      <span>￥{{item.prices}}</span>
                    </li>
                    <li>
                      <span>已收押金：</span>
                      <span>￥{{item.deposit}}</span>
                    </li>
                    <li class="total">
                      <span>需补房费(不算押金)：</span>
                      <span>￥{{item.replenish}}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item title="备注" name="3">
              <el-input type="textarea" row="5"></el-input>
            </el-collapse-item>
          </el-collapse>
          <div class="btn">
            <span @click="handleSubmit">确定</span>
            <span @click="handleClose">取消续住</span>
          </div>
        </section>
      </div>
      <!-- 换房 -->
      <div v-show="type==4" class="roomChange">
        <h4>
          <i class="el-icon-arrow-left" @click="type=0"></i>
          <span>换房</span>
        </h4>
        <h3>房间信息</h3>
        <ul class="roomInfo">
          <li>
            <span>{{Change.date}}</span>
            <el-select size="small" v-model="Change.roomType">
              <el-option label="单人房" value="0"></el-option>
              <el-option label="标准间" value="1"></el-option>
              <el-option label="豪华套房" value="2"></el-option>
            </el-select>
            <el-select size="small" v-model="Change.roomNumber">
              <el-option label="103" value="0"></el-option>
              <el-option label="105" value="1"></el-option>
              <el-option label="106" value="2"></el-option>
            </el-select>
          </li>
          <hr />
          <p>
            <span>合计需补：</span>
            <span class="money">￥{{Change.total}}</span>
          </p>
        </ul>
        <!-- 按钮 -->
        <footer>
          <span @click="roomChangeSubmit">确定换房</span>
          <span @click="type=0">取消</span>
        </footer>
      </div>
      <!-- 修改订单 -->
      <div v-show="type==5" class="editOrder">
        <h4>
          <i class="el-icon-arrow-left" @click="type=0"></i>
          <span>修改</span>
        </h4>
        <el-collapse v-model="activeName">
          <el-collapse-item title="入住信息" name="0">
            <div class="from">
              <span>来源：</span>
              <el-select size="small" v-model="orderFrom.orderEdit.value1">
                <el-option label="散客" value="0"></el-option>
                <el-option label="常住客" value="1"></el-option>
              </el-select>
            </div>
            <ul class="userTabs">
              <h5>入住人</h5>
              <li class="radioBtn">
                <el-radio-group v-model="orderFrom.orderEdit.radio">
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
                  <el-form :model="orderFrom.orderEdit" label-width="100px">
                    <el-form-item label="中文姓名：" required>
                      <el-input size="small" v-model="orderFrom.orderEdit.chineseName"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型：">
                      <el-input size="small" value="居民身份证" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码：" required>
                      <el-input size="small" v-model="orderFrom.orderEdit.valueNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="手 机 号" required>
                      <el-input size="small" v-model="orderFrom.orderEdit.phone"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <img src="./../../assets/imgs/ren.png" />
                </div>
              </li>
            </ul>
            <!-- 同住人列表 -->
            <ul class="userTabs" v-for="(v,i) in orderFrom.orderEdit.arr" :key="i">
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
          </el-collapse-item>
          <el-collapse-item title="房间信息" name="1">
            <p v-if="orderFrom.hoursInfo.show">
              <span></span>
              <i class="el-icon-circle-plus" @click="handleAdduser"></i>
            </p>
            <div class="hoursInfo" v-else>
              <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
              <span>{{orderFrom.hoursInfo.date}}</span>
              <el-input size="small" v-model="orderFrom.hoursInfo.price"></el-input>
              <i class="el-icon-remove"></i>
            </div>
          </el-collapse-item>
          <el-collapse-item title="消费记录" name="2">
            <ul class="consume">
              <li>
                <div>
                  <span>{{orderFrom.consumes.value1}}</span>
                  <span>{{orderFrom.consumes.date}}</span>
                  <span>￥{{orderFrom.consumes.price}}</span>
                  <span class="mark" @click="MarkShow">备注</span>
                </div>
                <el-input
                  v-show="orderFrom.consumes.ShowMark"
                  size="small"
                  v-model="orderFrom.consumes.mark"
                ></el-input>
              </li>
              <li v-for="(v,i) in orderFrom.consume" :key="i">
                <div>
                  <el-select size="small" v-model="v.value1">
                    <el-option label="手工房费" :value="0"></el-option>
                    <el-option label="维修费" :value="1"></el-option>
                    <el-option label="零食" :value="2"></el-option>
                  </el-select>
                  <span>消费金额</span>
                  <el-input size="small" v-model="v.price"></el-input>
                  <i class="el-icon-remove" @click="delConsume(i)"></i>
                </div>
                <el-input size="small" v-model="v.mark"></el-input>
              </li>
              <li>
                <span></span>
                <i class="el-icon-circle-plus" @click="addConsume"></i>
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="财务记录" name="3">
            <ul class="consume">
              <li>
                <div>
                  <span>{{orderFrom.Finances.value1}}</span>
                  <span>{{orderFrom.Finances.date}}</span>
                  <span>￥{{orderFrom.Finances.price}}</span>
                  <span class="mark" @click="FinancesMarkShow">备注</span>
                </div>
                <el-input
                  v-show="orderFrom.Finances.ShowMark"
                  size="small"
                  v-model="orderFrom.Finances.mark"
                ></el-input>
              </li>
              <li v-for="(v,i) in orderFrom.Finance" :key="i">
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
          <el-collapse-item title="备注" name="4">
            <el-input type="textarea" row="5"></el-input>
          </el-collapse-item>
        </el-collapse>
        <footer>
          <span @click="handleSubmit">完成</span>
          <span @click="handleClose">返回</span>
        </footer>
      </div>
    </el-drawer>
    <!-- 合并订单弹窗 -->
    <el-dialog
      :title="title +$store.state.room.roomNumber"
      :visible="dialogVisible"
      width="460px"
      :show-close="false"
      :modal="true"
    >
      <div class="contentBox">
        <el-select size="small" v-model="Merge">
          <el-option label="101" value="101"></el-option>
          <el-option label="102" value="102"></el-option>
          <el-option label="103" value="103"></el-option>
          <el-option label="105" value="105"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFinance">合 并</el-button>
      </span>
    </el-dialog>
    <!-- 转账弹窗 -->
    <el-dialog
      title="转账"
      :visible="dialogVisible2"
      class="Transfer"
      :show-close="false"
      width="500px"
      :modal="true"
    >
      <ul class="container">
        <li>
          <span class="name">转账：</span>
          <div>
            由
            <strong>{{$store.state.room.roomNumber}}</strong> 换至
            <el-select v-model="Transfer.roomNumber" size="mini">
              <el-option label="101" value="101"></el-option>
              <el-option label="102" value="102"></el-option>
              <el-option label="103" value="103"></el-option>
              <el-option label="105" value="105"></el-option>
            </el-select>
            <el-checkbox size="mini" v-model="Transfer.checked">只显示联房</el-checkbox>
          </div>
        </li>
        <li>
          <span class="name">消费记录：</span>
          <ul class="item">
            <li>
              <el-checkbox size="mini" v-model="Transfer.value1">消费项</el-checkbox>
              <span>日期</span>
              <span>金额</span>
              <span>备注</span>
            </li>
            <li>
              <el-checkbox size="mini" v-model="Transfer.value2">房费</el-checkbox>
              <span>05月25日</span>
              <span>￥100</span>
              <span>1111</span>
            </li>
          </ul>
        </li>
        <li>
          <span class="name">财务记录：</span>
          <ul class="item">
            <li>
              <el-checkbox size="mini" v-model="Transfer.value3">财务项</el-checkbox>
              <span>付费方式</span>
              <span>金额</span>
              <span>备注</span>
            </li>
            <li>
              <el-checkbox size="mini" v-model="Transfer.value4">房费</el-checkbox>
              <span>现金</span>
              <span>￥100</span>
              <span>1111</span>
            </li>
          </ul>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="TransferSubmit">确认转账</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Head from "./../alertHaeder";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Head
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
      type: 0, //类型控制显示
      Merge: "", //要合并的单元格
      title: "请选择要合并的房间号 原房间号:", //账单合并弹窗标题
      dialogVisible: false,
      dialogVisible2: false,
      activeName: ["0", "1", "2", "3","4"],
      form: [
        { roomName: "105 单人房", price: "10000", time: "2020-05-23" },
        { roomName: "105 单人房", price: "10000", time: "2020-05-24" },
        { roomName: "105 单人房", price: "10000", time: "2020-05-25" }
      ],
      add: [{ roomId: 105, price: "10000", time: "2020-05-26" }],
      consume: [
        //消费记录
        {
          roomName: "105 单人房",
          price: "200",
          time: "05月12日",
          mark: "",
          ShowMark: false
        },
        {
          roomName: "105 单人房",
          price: "200",
          time: "05月13日",
          mark: "",
          ShowMark: false
        },
        {
          roomName: "105 单人房",
          price: "200",
          time: "05月14日",
          mark: "",
          ShowMark: false
        },
        {
          roomName: "105 单人房",
          price: "200",
          time: "05月15日",
          mark: "",
          ShowMark: false
        }
      ],
      Finance: [
        {
          FinanceName: "房费(现金)",
          time: "05月15",
          price: "400",
          mark: "",
          ShowMark: false,
          orderPrice: "254400",
          prices: "400",
          deposit: "0",
          replenish: "254400"
        }
      ],
      Transfer: {
        //转账列表
        roomNumber: "",
        checked: false,
        value1: "",
        value2: "",
        value3: "",
        value4: ""
      },
      Change: {
        //换房数据
        date: "05月26日",
        roomType: "0",
        roomNumber: 103,
        total: "0"
      },
      orderFrom: {
        orderEdit: {
          value1: "0",
          radio: 0,
          chineseName: "", //中文姓名
          valueType: "", //证件类型
          valueNumber: "", //证件号码
          phone: "", //手机号
          arr: [
            //同住人信息
          ]
        },
        hoursInfo: {
          date: "05月26日",
          price: "200",
          show: false
        },
        consumes: {
          value1: "手工费",
          date: "05月26日",
          price: 0,
          mark: "",
          ShowMark: false
        },
        consume: [
          //消费记录
        ],
        Finances: {
          value1: "房费(现金)",
          date: "05月26日",
          price:400,
          mark: "",
          ShowMark: false
        },
        Finance: [
          //财务记录
          {
            value1: 0,
            value2: 0,
            price: 0,
            mark: ""
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("closeInhouse");
    },
    handleSubmit() {
      this.$message.success("提交成功!");
      this.handleClose();
    },
    MarkShow() {
      //显示消费备注
      this.orderFrom.consumes.ShowMark = !this.orderFrom.consumes.ShowMark;
    },
    FinancesMarkShow(){
      //显示财务记录备注
      this.orderFrom.Finances.ShowMark = !this.orderFrom.Finances.ShowMark;
    },
    Continue() {
      //续住事件
      this.type = 3;
    },
    handleAdd() {
      //增加续住
      //var dateTime = new Date(time); //取住房最后一天时间
      var dateTime =
        this.add.length == 0
          ? new Date()
          : new Date(this.add[this.add.length - 1].time); //取住房最后一天时间
      dateTime = dateTime.setDate(dateTime.getDate() + 1); //再最后一天基础上加一天
      dateTime = this.$moment(new Date(dateTime)).format("YYYY-MM-DD"); //转化为毫秒
      this.add.push({ roomId: 105, price: "10000", time: dateTime });
    },
    handleAdduser() {
      //修改订单，增加同住人
      this.orderFrom.orderEdit.arr.push({
        value1: "0",
        radio: 0,
        chineseName: "", //中文姓名
        valueType: "", //证件类型
        valueNumber: "", //证件号码
        phone: "" //手机号
      });
    },
    addConsume() {
      //增加消费记录
      this.orderFrom.consume.push({
        value1: 0,
        price: 0,
        mark: ""
      });
    },
    delConsume(i) {
      //删除消费记录
      this.orderFrom.consume.splice(i, 1);
    },
    addFinance() {
      //增加消费记录
      this.orderFrom.Finance.push({
        value1: 0,
        value2: 0,
        price: 0,
        mark: ""
      });
    },
    delFinance(i){
      this.orderFrom.Finance.splice(i, 1);
    },
    handleRemove(i) {
      this.add.splice(i, 1);
    },
    ShowMarks(i) {
      this.consume[i].ShowMark = !this.consume[i].ShowMark;
    },
    handleMerge() {
      //打开合并在住单
      this.dialogVisible = true;
    },
    handleFinance() {
      //合并在住单提交
      if (this.Merge == "") {
        return this.$message.error("请选择要合并的房间!");
      }
      this.$message.success("合并成功!");
      this.dialogVisible = false;
      this.$emit("closeInhouse");
    },
    handleTransfer() {
      //打开转账弹窗
      this.dialogVisible2 = true;
    },
    TransferSubmit() {
      //转账
      this.$message.success("转账成功!");
      this.dialogVisible2 = false;
      this.$emit("closeInhouse");
    },
    roomChange() {
      //切换换房
      this.type = 4;
    },
    roomChangeSubmit() {
      this.$message.success("换房成功!");
      this.$emit("closeInhouse");
    },
    handleEdit() {
      //打开修改订单
      this.type = 5;
    }
  }
};
</script>
<style scoped lang="scss">
.inhousePage {
  .content,
  .orderNumber {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
  }
  .orderTime {
    color: #666;
    span:nth-child(even) {
      margin-right: 20px;
    }
  }
  h3 {
    background: #5ea3ff;
    color: #fff;
    line-height: 45px;
    height: 45px;
    margin: 15px 0px;
    border-radius: 4px;
    padding-left: 10px;
  }
  .userInfo,
  .Continue {
    margin: 10px 0px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      div {
        span {
          margin-right: 10px;
        }
      }
    }
  }
  .priceInfo li {
    height: 50px;
    &:last-child {
      justify-content: flex-end;
    }
    i {
      font-size: 35px;
      cursor: pointer;
    }
  }
  .btnList {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 10px;
    background: #fff;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      span {
        width: 23%;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        background: #bec7f0;
        color: #fff;
        &:hover {
          background: #9095ac;
        }
      }
      span:nth-child(1),
      span:nth-child(2) {
        background: #5ea3ff;
        &:hover {
          background: #2a7fee;
        }
      }
      span:nth-child(3) {
        background: #f1b205;
        &:hover {
          background: #fa8704;
        }
      }
      span:nth-child(4) {
        background: #e7c66a;
        &:hover {
          background: #c2833b;
        }
      }
    }
  }
  .btn {
    position: absolute;
    bottom: 10px;
    left: 0px;
    right: 0px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 45%;
      background: #5ea3ff;
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: #3a89f0;
      }
    }
  }
  //合并订单的样式
  .Finance {
    height: 180px;
    margin-top: 10px;
    & > li {
      display: block;
      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:last-child {
          cursor: pointer;
        }
      }
      li,
      ul {
        height: auto;
      }
    }
  }
  //修改订单页面样式
  .editOrder {
    padding-bottom: 50px;
    height: 100%;
    padding-right: 15px;
    .el-collapse {
      height: calc(100% - 80px);
      overflow-y: auto;
    }
    h4 {
      display: flex;
      align-items: center;
      height: 50px;
      i {
        margin-right: 10px;
        font-size: 24px;
        cursor: pointer;
      }
    }
    .userTabs {
      border: 1px solid #ccc;
      margin: 18px 0px;
      padding: 10px;
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
    .hoursInfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      padding-right: 15px;
      .el-input {
        width: 120px;
      }
      i {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .consume {
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
  //换房样式
  .roomChange {
    padding-bottom: 50px;
    height: 100%;
    h4 {
      display: flex;
      align-items: center;
      height: 50px;
      i {
        margin-right: 10px;
        font-size: 24px;
        cursor: pointer;
      }
    }
    .roomInfo {
      margin: 10px 0px;
      font-size: 14px;
      li {
        height: 40px;
        display: flex;
        align-items: center;
        & > span {
          margin-right: 15px;
        }
        .el-select {
          width: 100px;
          margin-left: 10px;
        }
      }
      hr {
        margin: 20px 0px;
      }
      p {
        text-align: right;
        padding-right: 15px;
        .money {
          color: #e40011;
          font-weight: 700;
        }
      }
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
      align-items: center;
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
    }
  //转账的样式
  .Transfer {
    .container {
      font-size: 14px;
      height: 220px;
      overflow: auto;
      padding-right: 10px;
      .el-select {
        width: 90px;
        margin-right: 12px;
      }
      & > li {
        display: flex;
        align-items: center;
        margin: 15px 0px;
        .name {
          width: 80px;
        }
        .item {
          flex: 1;
          padding: 5px 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            color: #000;
          }
        }
      }
    }
  }
  .box {
    height: 100%;
    section {
      height: calc(100% - 160px);
      overflow: auto;
      .mark {
        cursor: pointer;
      }
    }
  }
  .index{
     height: 100%;
  }
  .contentBox {
    text-align: center;
    .el-select {
      width: 80%;
    }
  }
}
</style>
<style lang="scss">
.inhousePage .el-drawer {
  padding: 0px 0px 0px 15px;
}
.inhousePage .el-drawer__body {
  height: 100%;
  position: relative;
  &>section>div{
    height:100%;
  }
  section {
    height: calc(100% - 160px);
    overflow: auto;
    padding-right: 10px;
  }
}
.inhousePage .el-collapse {
  margin: 10px 0px;

  .el-collapse-item__header {
    color: #666;
    font-size: 16px;
  }
}
.inhousePage .priceInfo .el-input {
  width: 75px;
}
.inhousePage .priceInfo .el-select .el-input {
  width: 180px;
}
.inhousePage .el-dialog__footer {
  text-align: center;
}
</style>
<template>
  <div class="con">
    <div class="add">
      <el-button type="warning" icon="el-icon-plus" size="mini" @click="addRentRoom">添加时租房</el-button>
    </div>

    <div class="add_item">
      <ul>
        <li v-for="(item,index) in rentRoomList" :key="index">
          <ul class="add_ul2">
            <div>
              <span>{{item.time}}</span>
              <i class="el-icon-minus item_delete" @click="deleterentRoomBtn(index)"></i>
            </div>
            <li v-for="(v,i) in item.list" :key="i">
              <div class="item_div">
                <el-switch
                  v-model="v.status"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                  @change="changeRentRoomCheck(v,i)"
                ></el-switch>
                <div :class="v.status ? 'fx_div_green' : 'fx_div_gray'">
                  <span>{{v.fx}}</span>
                  <input v-model="v.price" @change="changeRentRoomInput(v,i)"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <el-dialog title="添加时租房" :visible.sync="isRentRoom" width="30%" center>
      <div class="addroom_div">
        <el-form label-width="80px" :model="roomList">
          <el-form-item label="时长">
            <el-select v-model="timeValue" placeholder="请选择">
              <el-option
                v-for="item in rentRoomList"
                :key="item.time"
                :label="item.time"
                :value="item.time"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房型">
            <el-checkbox-group v-model="roomList">
              <el-checkbox label="0">标准间</el-checkbox>
              <el-checkbox label="1">豪华间</el-checkbox>
              <el-checkbox label="2">单人房</el-checkbox>
              <el-checkbox label="3">双人房</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="rentRoomSure">确认修改</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="删除时租房" :visible.sync="isDeleteRentRoom" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要删除时租房?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="deleteRentRoomSure">确 定</el-button>
          <el-button type="info" @click="isDeleteRentRoom = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="修改时租房" :visible.sync="isChangeRentRoom" width="30%" center>
      <div class="change_div">
        <el-form label-width="80px">
          <span>确认要删除时租房?</span>
        </el-form>
        <span slot="footer" class="change_foot">
          <el-button type="primary" @click="changeRentRoomSure">确 定</el-button>
          <el-button type="info" @click="changeRentRoomCanel">取消</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rentRoomList: [
        {
          time: "1小时",
          list: [
            {
              fx: "单人房",
              price: "200",
              status: false
            },
            {
              fx: "双人房",
              price: "200",
              status: false
            },
            {
              fx: "标准间",
              price: "200",
              status: false
            }
          ]
        },
        {
          time: "2小时",
          list: [
            {
              fx: "单人房",
              price: "200",
              status: false
            },
            {
              fx: "双人房",
              price: "200",
              status: false
            },
            {
              fx: "标准间",
              price: "200",
              status: false
            }
          ]
        }
      ],
      isRentRoom: false,
      roomList: [],
      timeValue: "",

      //删除时租房
      isDeleteRentRoom: false,
      isDeleteRentRoomIndex: 0,

      //修改时租房
      isChangeRentRoom: false,
      changeRentRoomList: "",
    };
  },
  methods: {
    addRentRoom() {
      this.isRentRoom = !this.isRentRoom;
    },
    rentRoomSure() {
      this.isRentRoom = !this.isRentRoom;
      this.rentRoomList.push({
        time: "3小时",
        list: [
          {
            fx: "单人房",
            price: "200",
            status: false
          },
          {
            fx: "双人房",
            price: "200",
            status: false
          },
          {
            fx: "标准间",
            price: "200",
            status: false
          }
        ]
      });
    },
    //是否删除时租房
    deleterentRoomBtn(index) {
      this.isDeleteRentRoomIndex = index;
      this.isDeleteRentRoom = !this.isDeleteRentRoom;
    },
    //确认删除时租房
    deleteRentRoomSure() {
      this.rentRoomList.splice(this.isDeleteRentRoomIndex, 1);
      this.isDeleteRentRoom = !this.isDeleteRentRoom;
    },

    //是否修改时租房
    changeRentRoomCheck(item, index) {
      this.changeRentRoomIndex = index;
      this.changeRentRoomList = item;
      this.isChangeRentRoom = !this.isChangeRentRoom;
    },
    //确定修改时租房
    changeRentRoomSure() {
      this.isChangeRentRoom = !this.isChangeRentRoom;
      this.changeRentRoomList.status = true;
    },
    //取消修改时租房
    changeRentRoomCanel() {
      this.changeRentRoomList.status = false;
      this.changeRentRoomList.price = "200"
      this.isChangeRentRoom = !this.isChangeRentRoom;
    },
    //input修改时租房
    changeRentRoomInput(item,index){
        console.log(item + index)
        this.changeRentRoomList = item;
        this.isChangeRentRoom = !this.isChangeRentRoom;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.con {
  height: 100%;
}
.add {
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.add_item > ul {
  align-items: center;
  margin-left: 20px;

  li {
    margin: 10px;

    .item_div {
      display: flex;
      align-items: center;

      .fx_div_green {
        display: flex;
        width: 200px;
        height: 50px;
        background: #5ec1db;
        margin-left: 10px;
        align-items: center;

        span {
          color: #fff;
          padding: 10px;
        }
        input {
          width: 100px;
          height: 30px;
        }
      }
    }
  }
}

.fx_div_gray {
  display: flex;
  width: 200px;
  height: 50px;
  background: #cccccc;
  margin-left: 10px;
  align-items: center;

  span {
    color: #fff;
    padding: 10px;
  }
  input {
    width: 100px;
    height: 30px;
  }
}

.item_delete {
  width: 25px;
  height: 25px;
  background: #bc6f5c;
  border-radius: 50%;
  font-size: 25px;
  color: white;
  margin: 10px;
}
.add_ul2 {
  display: flex;
  align-items: center;
}

.dialog-footer {
  text-align: center;
  margin-top: 25px;
  width: 100%;

  .el-button {
    width: 100%;
  }
}

.change_div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .change_foot {
    margin-top: 40px;

    .el-button {
      width: 150px;
    }
  }
}
</style>
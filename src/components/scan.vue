<template>
  <div class="scanPage">
    <!-- 证件自动扫描 -->
    <el-dialog
      title="证件扫描"
      :visible.sync="show"
      :show-close="false"
      width="800px"
      :modal="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <h2 slot="title">证件扫描</h2>
      <button
        type="button"
        aria-label="Close"
        class="el-dialog__headerbtn"
        @click.stop="closeDialog"
      >
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
      <div>
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form :model="ZJinfo">
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件号码：" label-width="100px">
                <el-input v-model="ZJinfo.value1" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="证件类型：" label-width="100px">
                <el-select v-model="ZJinfo.value2" placeholder="请选择证件类型">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="户口薄" value="2"></el-option>
                  <el-option label="解放军士兵证" value="3"></el-option>
                  <el-option label="解放军军官证" value="4"></el-option>
                  <el-option label="临时居民身份证" value="5"></el-option>
                  <el-option label="护照" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名：" label-width="100px">
                <el-input v-model="ZJinfo.value3" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期：" label-width="100px">
                <el-date-picker
                  v-model="ZJinfo.value4"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：" label-width="100px">
                <el-select v-model="ZJinfo.value5" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="民族：" label-width="100px">
                <el-select v-model="ZJinfo.value6" placeholder="请选择民族">
                  <el-option label="汉族" value="1"></el-option>
                  <el-option label="满族" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="省市县：" label-width="100px">
                <el-input size="small" v-model="ZJinfo.value7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="详址：" label-width="100px">
                <el-input size="small" v-model="ZJinfo.value8"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addResident">添加为常住客</el-button>
        <div>
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    Status: {
      type: Number,
      default: 0
    }
  },
  watch: {
    Status(val) {
      if (val == 1) this.request("1");
      if (val == 2) this.request("2");
    }
  },
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      ZJinfo: {
        //证件扫描的表单
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
        value8: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    addResident() {
      this.$alert("添加常住客成功!", "提示", {
        confirmButtonText: "确定",
        callback: () => {}
      });
    },
    closeDialog() {
      this.$emit("closeScan");
    },
    handleAvatarSuccess() {
      //上传成功的回调
    },
    beforeAvatarUpload() {
      //上传之前的钩子函数
    },
    request(data) {
      if (data == 1) {
        this.ZJinfo = {
          value1: "",
          value2: "",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: ""
        };
      }else if(data==2){
          this.ZJinfo = {
          value1: "1511561541515215",
          value2: "1",
          value3: "小白",
          value4: "2020-05-25",
          value5: "1",
          value6: "1",
          value7: "上海市闵行区",
          value8: "沪闵路7001号A栋506"
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="index">
   <el-row>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          action="upp"
          :show-file-list="false"
          :http-request="UploadImage"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100px;height:100px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-col>
    </el-row>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click.native="zhu">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      imageUrl: ""
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
  },
  methods: {
    // 方法
    UploadImage(param) {
      // console.log(param) // file
      const uploadData = new FormData()
      uploadData.append('avatar', param.file)
      this.$http.post('/api/upload', uploadData).then(res => {
        console.log(res)
        this.imageUrl ="http://127.0.0.1:7777/"+ res.path
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    onSubmit(values) {
      console.log("submit", values);
    },
    zhu() {
        this.$http.post('/api/zhu',{
          img:this.imageUrl,
          username :this.username,
          password:this.password
        }).then(res=>{
          console.log(res)
          if(res.code ==200){
            Toast.success(res.msg);
             this.$router.push({
            path: "/login"
          });
          }else{
            Toast.fail("注册失败");
          }
        })
    }
  },
  mounted() {
    // 页面进入时加载内容
  },
  watch: {
    // 监测变化
  }
};
</script>
<style scoped lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
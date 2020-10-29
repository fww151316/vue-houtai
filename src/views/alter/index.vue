
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
        <van-button round block type="info" native-type="submit" @click.native="xui">修改</van-button>
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
      list:'',
      lis:'',
       imageUrl: ""
    };
  },
  created() {
    // 实例被创建之后执行代码
     console.log(this.$route.params.id)
    this.gai()
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
  },
  methods: {
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
    // 方法
    onSubmit(values) {
      console.log("submit", values);
    },
    gai(){
      this.$http.get('/api/gai',{
        id:this.$route.params.id
      }).then(res=>{
        console.log(res.msg)
        this.list=res.msg;
        for(var i =0 ;i <this.list.length;i++){
          if(this.list[i]._id == this.$route.params.id ){
              this.lis = this.list[i]
              this.username=this.lis.username
              this.password = this.lis.password
              this.imageUrl = this.lis.img
          }
        }
      })
    },


    xui(){
      this.$http.post('/api/xui',{
        username:this.username,
        password:this.password,
        id:this.$route.params.id,
        img:this.imageUrl
      }).then(res=>{
        console.log(res)
         if(res.code ==200){
            Toast.success(res.msg);
            this.$router.push({
              path:'/home'
            })
          }else{
            Toast.success("修改失败");
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
.van-uploader,.avatar-uploader{
  margin:30px 0px 20px 150px;
}
.el-col{
width: 100px;
height: 100px;
}
</style>
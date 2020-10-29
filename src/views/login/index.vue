
<template>
  <div class="index">
    <van-cell-group>
      <van-field class="na" v-model="username" label="用户名" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <div class="btn">
      <van-button type="warning" @click.native="goreg">注册</van-button>
      <van-button type="warning" @click="deng">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      fileList: []
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
    deng() {
      console.log(this.username);
      this.$http
        .post("/api/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if (res.msg != 1234)
            this.$router.push({
              path: "/home"
            });
        });
    },
    goreg() {
      this.$router.push({
        path: "/register"
      });
    }
    // gohome() {
    //   this.$router.push({
    //     path: "/home"
    //   });
    // }
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
.van-cell {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  border: 1px solid red;
}
.na {
  margin-top: 100px;
}
.btn {
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
}
.van-button {
  width: 80px;
  margin-left: 20px;
  margin-right: 40px;
}
</style>

<template>
  <div class="index">
    <van-row>
      <van-col class="yi" span="3">头像</van-col>
      <van-col class="yi" span="5">用户名</van-col>
      <van-col class="yi" span="5">密码</van-col>
      <van-col class="yi" span="11">操作</van-col>
    </van-row>
    <van-row v-for="item in list" :key="item._id">
      <van-col span="3">
        <img
          :src="item.img"
          alt
        />
      </van-col>
      <van-col span="5">{{item.username}}</van-col>
      <van-col span="5">{{item.password}}</van-col>
      <van-col span="11">
        <van-button type="info" @click.native="goalter(item._id)">修改</van-button>
        <van-button type="danger" @click.native="deta(item._id)">删除</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.15.1/axios.min.js"></script>
<script>
import { Toast } from 'vant';
export default {
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  data() {
    return {
      list:''
    };
  },
  created() {
    // 实例被创建之后执行代码
    this.qi()
  },
  computed: {
    // 计算属性
    
  },
  components: {
    // 组件的引用
  },
  methods: {
    // 方法
    goalter(id){
      this.$router.push({
        path:'/alter/'+id
      })
    },
    qi(){
      this.$http.post("/api/list").then(res =>{
        console.log(res.msg)
        this.list=res.msg
      })
    },
    deta(id){
        this.$http.post('/api/shan',{
          _id:id
        }).then(res=>{
          console.log(res)
          if(res.code ==200){
            Toast.success(res.msg);
            this.list.splice(id, 1);
          }else{
            Toast.success("删除失败");
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
.yi {
  border: 1px solid #333;
  background: rgb(101, 181, 247);
  font-size: 16px;
  color: #fff;
}
.van-col {
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-bottom: solid 1px #999;
  margin-bottom: 20px;
  img {
    width: 35px;
    height: 35px;
    margin-left: 5px;
    border-radius: 50%;
  }
  .van-button{
    width: 60px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>
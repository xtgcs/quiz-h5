<template>
  <div class="guess-record">
    <div class="guess-record-list" v-for="(item, index) in list" :key="index">
      <div class="time">{{item.end_time}}</div>
      <div class="title">{{item.title}}</div>
      <div class="points">本期投入积分: {{item.integral}}</div>
      <div class="record" v-show="0">竞猜结果: {{item.result}}</div>
      <div class="result">查看中奖公告</div>
      <div class="waiting">等待结果</div>
    </div>
    <div class="footer-line">- 我是有底线的 -</div>
  </div>
</template>

<script>
import { pastRecord } from "../api.js";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      pastRecord("focus/log", "").then(res => {
        let respones = res.data;
        if (respones.code == 0) {
          this.list = respones.data;
          console.log(this.list);
        }
      });
    },
    goGongGao() {
      this.$router.push({path:'prizeList',query:{}})
    }
  }
};
</script>

<style scoped>
.guess-record {
  padding: 10px;
}
.guess-record-list {
  position: relative;
  /* height: 135px; */
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 5px;
  background: linear-gradient(
    -35deg,
    rgba(228, 251, 255, 1),
    rgba(232, 245, 254, 1)
  );
  box-shadow: 0px 3px 8px 0px rgba(159, 201, 234, 0.65);
  border-radius: 5px;
}
.time {
  padding-left: 15px;
  height: 42px;
  text-align: left;
  line-height: 42px;
  font-size: 14px;
  color: #353535;
  border-bottom: 1px solid #c7e0f0;
}
.title {
  padding-left: 15px;
  font-size: 18px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(53, 53, 53, 1);
  line-height: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.points {
  padding-left: 15px;
  font-size: 12px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(62, 192, 254, 1);
  line-height: 17px;
}
.waiting {
  width: 140px;
  height: 29px;
  background: rgba(160, 160, 160, 1);
  box-shadow: 0px 1px 3px 0px rgba(183, 183, 183, 0.64);
  border-radius: 5px;
  font-size: 14px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #fff;
  line-height: 30px;
  text-align: center;
  margin-left: 15px;
  margin-top: 24px;
}
.result {
  width: 140px;
  height: 29px;
  background: rgba(62, 192, 254, 1);
  box-shadow: 0px 1px 3px 0px rgba(183, 183, 183, 0.64);
  border-radius: 5px;
  font-size: 14px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #fff;
  line-height: 30px;
  text-align: center;
  margin-left: 15px;
  margin-top: 12px;
}

.footer-line {
  margin-top: 56px;
  font-size:11px;
font-family:SourceHanSansCN-Normal;
font-weight:400;
color:#353535;
line-height:17px;
text-align: center;
}
</style>


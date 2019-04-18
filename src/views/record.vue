<template>
  <div class="guess-record">
    <div class="guess-record-list" v-for="(item, index) in gussDetail" :key="index">
      <div class="time">{{item.end_time}}</div>
      <div class="title">{{ item.title }}</div>
      <div class="points">本期投入积分: {{item.integral}}</div>
      <div class="record" v-show="item.status == 3">竞猜结果: {{item.status_str}}</div>
      <div class="btn-gray" v-if="item.status == 2">等待结果</div>
      <div class="btn" v-if="item.status == 3" @click="seeReport">查看中奖公告</div>
    </div>
  </div>
</template>

<script>
import { initPage } from "../api.js";
import { confirm } from "../api.js";

export default {
	data() {
		return {
			gussDetail: []
		}
	},
  created() {
		this.initPage()
	},
  methods: {
		initPage() {
			confirm("focus/log", "").then(res => {
        let respones = res.data;
        if (respones.code == 0) {
          this.gussDetail = respones.data;
					// this.gussDetail.memo = str
        }
      });
		},
    goGongGao() {
      this.$router.push({ path: "prizeList", query: {} });
    },
    seeReport() {
      this.$router.push({ path: "winning", query: {} });
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
  height: 180px;
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
.record {
  padding-left: 15px;
  font-size: 14px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(53, 53, 53, 1);
  line-height: 14px;
  margin-top: 10px;
}
.btn {
  position: absolute;
  bottom: 0px;
  left: 15px;
  width: 140px;
  height: 30px;
  background: rgba(62, 192, 254, 1);
  box-shadow: 0px 1px 3px 0px rgba(183, 183, 183, 0.64);
  border-radius: 5px;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 18px;
}
.btn-gray {
  position: absolute;
  bottom: 0px;
  left: 15px;
  width: 140px;
  height: 30px;
  background: #a0a0a0;
  box-shadow: 0px 1px 3px 0px rgba(183, 183, 183, 0.64);
  border-radius: 5px;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 18px;
}
</style>


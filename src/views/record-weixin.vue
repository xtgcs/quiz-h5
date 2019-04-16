<template>
  <div class="guess-record">
    <div class="guess-record-list" v-for="(item, index) in gussDetail" :key="index">
			<div class="btn-flex flex">
				<div class="time">{{item.end_time}}</div>
				<div class="btn-container" v-if="item.is_success">竞猜成功</div>
				<div class="btn-container btn-container-gray" v-else>竞猜失败</div>
			</div>
      
      <div class="title">{{ item.title }}</div>
      <div class="points">本期投入积分: {{item.integral}}</div>
      <div class="points points-resut">竞猜结果: {{item.result}}</div>
      <div class="points points-myself">您的竞猜: {{item.my_result}}</div>
    </div>
  </div>
</template>

<script>
import { initPage } from "../api.js";
import { projectDetail } from "../api.js";

export default {
  data() {
    return {
      gussDetail: []
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      projectDetail("focus/log", "").then(res => {
        let respones = res.data;
        if (respones.code == 0) {
          this.gussDetail = respones.data;
        }
      });
    },
    goGongGao() {
      this.$router.push({ path: "prizeList", query: {} });
    }
  }
};
</script>

<style scoped>
.flex {
	display: flex;
}
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
	padding-left: 13px;
  height: 42px;
  text-align: left;
  line-height: 42px;
  font-size: 14px;
  color: rgba(53, 53, 53, 1);
  border-bottom: 1px solid #c7e0f0;
}
.title {
  padding-left: 15px;
  font-size: 17px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(53, 53, 53, 1);
	height: 17px;
  line-height: 17px;
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

.points-myself {
	margin-top: 20px;
	height:17px;
	font-size:13px;
	font-family:SourceHanSansCN-Normal;
	font-weight:400;
	color:rgba(53,53,53,1);
	line-height:17px;
	opacity:0.8;
}

.btn-container {
	margin-left: 100px;
	width:103px;
	height:25px;
	line-height: 25px;
	text-align: center;
	background:rgba(62,192,254,1);
	box-shadow:0px 1px 3px 0px rgba(183,183,183,0.64);
	border-radius:5px;
	font-size:14px;
	color:rgba(255,255,255,1);
}

.btn-container-gray {
	background:rgba(62,192,254,1);
}

.btn-flex {
	align-items: center;
}
</style>


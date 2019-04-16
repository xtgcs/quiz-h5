<template>
    <div class="guess-record">
        <div class="guess-record-list">
            <div class="top">
                <div class="time">2019-02-21 15:54:45</div>
                <div class="btn"></div>
            </div>
            <div class="title">过节了是否要给女友买礼物?</div>
            <div class="points">本期投入积分: 9999999</div>
            <div class="record" v-show="0">竞猜结果: 不要</div>
            <div class="btn-gray" v-if="true">等待结果</div>
        </div>
        <div class="guess-record-list">
            <div class="time">2019-02-21 15:54:45</div>
            <div class="title">过节了是否要给女友买礼物?</div>
            <div class="points">本期投入积分: 9999999</div>
            <div class="record" v-show="1">竞猜结果: 不要</div>
            <div class="btn-gray" v-if="0">等待结果</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goGongGao() {
            this.$router.push({path:'prizeList',query:{}})
        }
    },
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
  border-bottom: 1px solid #C7E0F0;
}
.title {
  padding-left: 15px;
  font-size:18px;
  font-family:SourceHanSansCN-Bold;
  font-weight:bold;
  color:rgba(53,53,53,1);
  line-height:18px;  
  margin-top: 10px;
  margin-bottom: 10px;
}
.points {
  padding-left: 15px;
  font-size:12px;
  font-family:SourceHanSansCN-Normal;
  font-weight:400;
  color:rgba(62,192,254,1);
  line-height:17px;
}
.record {
  padding-left: 15px;
  font-size:14px;
  font-family:SourceHanSansCN-Normal;
  font-weight:400;
  color:rgba(53,53,53,1);
  line-height:14px;
  margin-top: 10px;
}
.btn {
  position: absolute;
  bottom: 0px;
  left: 15px;
  width: 140px;
  height:30px;
  background:rgba(62,192,254,1);
  box-shadow:0px 1px 3px 0px rgba(183,183,183,0.64);
  border-radius:5px;
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
  width:140px;
  height:30px;
  background:#A0A0A0;
  box-shadow:0px 1px 3px 0px rgba(183,183,183,0.64);
  border-radius:5px;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 18px;
}
</style>


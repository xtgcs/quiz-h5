<template>
  <div class="guess-record">
    <div class="guess-record-list">
      <div class="time">2019-02-21 15:54:45</div>
      <div class="title">你要不要给自己买一份养老保险？</div>
      <div class="points">本期投入积分: 10000</div>
    </div>
    <div class="phone_list">
      <div class="phone_title">中奖名单</div>
      <div class="list_box">
        <div class="list" v-for="(item, index) in phoneList" :key="index">
          <span class="number">{{index}}</span>
          <div class="name">手机号: {{item}}</div>
        </div>
      </div>
    </div>
    <div class="footer-line">- 我是有底线的 -</div>
  </div>
</template>

<script>
import { pastRecord } from "../api.js";
export default {
  data() {
    return {
      list: [],
      phones: [
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527,
        18501342527
      ]
    };
  },
  computed: {
    phoneList: function() {
      return this.formatting();
    }
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
    formatting() {
      let phoneArry = [];
      this.phones.map(function(item) {
        phoneArry.push(
          item.toString().replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
        );
      });
      return phoneArry;
    },
    goGongGao() {
      this.$router.push({ path: "prizeList", query: {} });
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
  font-size: 17px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(53, 53, 53, 1);
  line-height: 18px;
  padding: 18px 0 19px 15px;
}
.points {
  padding-left: 15px;
  font-size: 12px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(62, 192, 254, 1);
  line-height: 17px;
  padding-bottom: 28px;
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
.phone_list {
  border-radius: 5px;
  background: linear-gradient(
    -35deg,
    rgba(228, 251, 255, 1),
    rgba(232, 245, 254, 1)
  );
  box-shadow: 0px 3px 8px 0px rgba(159, 201, 234, 0.65);
  border-radius: 5px;
  box-sizing: border-box;
  max-height: 380px;
  overflow: scroll;
}
.phone_title {
  padding: 16px 16px 12px 16px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(65, 158, 254, 1);
  line-height: 17px;
  font-size: 18px;
  border-bottom: 1px solid #c7e0f0;
}
.list_box {
  padding: 17px;
  font-size: 13px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(65, 158, 254, 1);
  line-height: 17px;
}
.list {
  display: flex;
  padding-bottom: 18px;
}
.list .number {
  width: 15px;
  height: 15px;
  background: rgba(65, 158, 254, 1);
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  text-align: center;
  line-height: 15px;
}
.list .name {
  padding-left: 42px;
  flex: 1;
}
.footer-line {
  margin-top: 56px;
  font-size: 11px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #353535;
  line-height: 17px;
  text-align: center;
}
</style>


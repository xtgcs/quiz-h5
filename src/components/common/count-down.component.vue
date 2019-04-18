<template>
  <div class="time-out-line flex">
    <div class="text-left">距离结束还有:</div>
    <!-- time-box -->
    <div class="bounceLastTime flex">
      <div class="bounceLastTime__time">{{ timeCountDown.day }}</div>
      <div class="bounceLastTime__colon">天</div>
      <div class="bounceLastTime__time">{{timeCountDown.hour}}</div>
      <div class="bounceLastTime__colon">时</div>
      <div class="bounceLastTime__time">{{timeCountDown.min}}</div>
      <div class="bounceLastTime__colon">分</div>
      <div class="bounceLastTime__time">{{timeCountDown.second}}</div>
      <div class="bounceLastTime__colon">秒</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["end"], // hasBg这个props默认传递false
  data() {
    return {
      lastTime: this.end,
      timeCountDown: {
				day: '00',
        hour: "00",
        min: "00",
        second: "00",
      }
    };
  },
  created() {
		this.nowDate;
		console.log(this.end)
    if (this.end) {
			let dateStr = new Date(this.lastTime.replace(/-/g, "/"));
			this.lastTime = Date.parse(dateStr)-new Date().getTime();
      setInterval(() => {
        this.countDown();
      }, 100);
    }
  },
  methods: {
    countDown() {
      this.lastTime = this.lastTime - 100;
      if (this.lastTime <= 0) {
        this.$emit("endTime");
      }
      var t = this.lastTime;
      if (this.lastTime <= 0) {
        this.timeCountDown = {
					day: '00',
          hour: "00",
          min: "00",
          second: "00",
        };
        return;
			}
			
			var day =
        Math.floor(t / 1000 / (3600*24)) < 10
          ? "0" + Math.floor(t / 1000 / (3600*24))
          : Math.floor(t / 1000 / (3600*24));

      var hour =
        Math.floor((t / 1000 / 3600) % 24) < 10
          ? "0" + Math.floor((t / 1000 / 3600) % 24)
					: Math.floor((t / 1000 / 3600) % 24)
					
      var min =
        Math.floor((t / 1000 / 60) % 60) < 10
          ? "0" +  Math.floor((t / 1000 / 60) % 60)
					:  Math.floor((t / 1000 / 60) % 60)
					
      var second =
        Math.floor((t / 1000) % 60) < 10
          ? "0" + Math.floor((t / 1000) % 60)
					: Math.floor((t / 1000) % 60)
		
      this.timeCountDown = {
				day: day,
        hour: hour,
        min: min,
        second: second,
      };
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

.time-out-line {
  margin-top: 15px;
}

.text-left {
  width: 78px;
  height: 17px;
  font-size: 11px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(87, 177, 238, 1);
  line-height: 17px;
}

.bounceLastTime {
  height: 15px;
}

.bounceLastTime__time {
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  background: rgba(69, 155, 254, 1);
  border-radius: 3px;
  font-size: 12px;
  color: #ffffff;
}

.bounceLastTime__colon {
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  color: rgba(87, 177, 238, 1);
  font-size: 12px;
}
</style>


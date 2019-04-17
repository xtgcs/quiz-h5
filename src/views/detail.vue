<template>
  <div>
    <div class="container__box">
      <!-- list -->
      <div class="div__list">
        <!-- floor__top -->
        <div class="floor__top flex">
          <img class="close-icon" src="@/assets/project_1.png" alt>
        </div>
        <!-- floor_bottom -->
        <div class="floor_bottom">
          <div class="bottom_title">{{ gussDetail.title }}</div>
					<!-- time-out -->
          <div v-if="gussDetail.status == 1">
            <countDown :end="gussDetail.end_time"></countDown>
          </div>
					<div class="status_str" v-if="gussDetail.status != 1">{{ gussDetail.status_str }}</div>

					<div class="flex" style="margin-top: 10px">
						<div class="text-join">{{gussDetail.join_user}}人已参与</div>
						<div class="text">本期投入积分：{{gussDetail.integral}}</div>
					</div>
        </div>
        <!-- btn-group -->
        <div class="btn-group flex">
          <div class="btn btn-left" @click="click_left(gussDetail.option)">
            <div class="btn-text">{{ gussDetail.option.A }}</div>
						<img v-if="select_left" class="select-icon" src="@/assets/icon_select.png" alt>
          </div>
          <div class="btn btn-right" @click="click_right(gussDetail.option)">
             <div class="btn-text">{{ gussDetail.option.B }}</div>
						 <img v-if="select_right" class="select-icon" src="@/assets/icon_select.png" alt>
          </div>
        </div>
      </div>
    </div>

    <!-- description -->
    <div class="description">
      <p class="list-title">竞猜说明:</p>
      <div class="s-line"></div>
      <p v-html="gussDetail.memo"></p>
    </div>
    <!-- footer -->
    <div v-if="gussDetail.status == 1" class="confirm-btn" @click="confirmBtn">确认参与</div>
    <div v-else class="confirm-btn confirm-btn-al">{{ gussDetail.status_str }}</div>
    <!--  -->
    <!-- 弹窗 -->
    <Dialog :value="show__rule">
      <div class="modal__box">
        <div>
          <label for="phone__num">手机号</label>
          <input @focus="phone_blur" v-model="mobile_num" id="phone__num" class="phone__number__input" placeholder="请输入手机号" type="number">
        </div>
        <div v-show="phone_error" class="phone-error">手机号错误，请重新填写</div>
        <div class="phone-tip">请填写手机号，活动结束后，积分将通过线下方式发送到您的手机号</div>
        <!-- small-btn -->
        <div class="small__btn" @click.stop="confirmJoin">确定</div>
      </div>
      <img class="close-btn" src="@/assets/close-btn.png" @click="closeModal">
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/common/Dialog.vue";
import { projectDetail, confirm } from "../api.js";
import { parseUrl } from "../util/http.js";
import countDown from "@/components/common/count-down.component";
import { delimiter } from 'path';

export default {
  data() {
    return {
      show__rule: false,
			focus_id: '',
			gussDetail: {},
			select_left: false,
			select_right: false,
			select_value: '',
      mobile_num: '',
      res_options__key: "",
      res_options__value: "",
      phone_error: false
    };
  },
  components: {
    Dialog,
    countDown
  },
  created() {
    console.log(this.$route.query.focus_id);
		let param = parseUrl().params
		this.focus_id = param.focus_id
    this.initPage();
  },
  methods: {
    initPage() {
			console.log({'focus_id': parseInt(this.focus_id)})
      projectDetail("focus/detail", "", {'focus_id': parseInt(this.focus_id)}).then(res => {
        let respones = res.data;
        if (respones.code == 0) {
					let reg = new RegExp("\n","g")
					let str = respones.data.memo.replace(reg, "<br>");
          this.gussDetail = respones.data;
					this.gussDetail.memo = str
        }
      });
		},
		click_left(options) {
      const key = Object.keys(options)
      this.res_options__key = key[0]
      this.res_options__value = options[this.res_options__key]

			this.select_value = 'left'
			this.select_left = true
			this.select_right = false
		},
		click_right(options) {
      const key = Object.keys(options)
      this.res_options__key = key[0]
      this.res_options__value = options[this.res_options__key]

			this.select_value = 'right'
			this.select_right = true
			this.select_left = false
		},
    confirmBtn() {
			if (this.select_value == '') {
				alert("请选择你的观点")
			} else {
        this.phone_error = false
        this.mobile_num = ""
				this.show__rule = true;
			}
    },
    closeModal() {
      this.show__rule = false;
    },
    phone_blur() {
      this.phone_error = false
    },

    confirmJoin() {
      if (!this.mobile_num) {
        alert("请输入手机号")
        return
      } else {
        if (this.mobile_num.length != 11) {
          this.phone_error = true
          return
        }
      }
      // request ajax
      confirm("focus/save", "POST", {"focus_id": parseInt(this.focus_id), "mobile": this.mobile_num, "option_number": this.res_options__key, "my_result": this.res_options__value}).then(res => {
        if (res.code == 0) {
          this.initPage()
        } else {
          alert(res.data.msg || '网络错误，请稍后重试')
        }
      }).catch(rej => {
        alert('网络错误，请稍后重试')
      })
      this.show__rule = false;
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

.close-btn {
  width: 29px;
  height: 29px;
  margin-top: 22px;
  margin-left: 124px;
}

.container__box {
  padding-left: 11px;
}

.div__list {
  margin-top: 10px;
  width: 355px;
  height: 196px;
  background: linear-gradient(
    -35deg,
    rgba(228, 251, 255, 1),
    rgba(232, 245, 254, 1)
  );
  box-shadow: 0px 3px 8px 0px rgba(159, 201, 234, 0.65);
  border-radius: 5px;
}

.floor__top {
  align-items: center;
  height: 42px;
  border-bottom: 1px solid #c8dff0;
}

.close-icon {
  margin-left: 13px;
  width: 84px;
  height: 23px;
}

.text {
  margin-left: 40px;
  height: 17px;
  font-size: 12px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(69, 191, 254, 1);
  line-height: 17px;
}

.floor_bottom {
  padding-left: 14px;
}

.bottom_title {
  margin-top: 20px;
  height: 15px;
  font-size: 15px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(53, 53, 53, 1);
  line-height: 17px;
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

.btn {
  text-align: center;
	margin-top: 15px;
  width: 89px;
  height: 29px;
  line-height: 29px;
  background: rgba(246, 102, 54, 1);
  box-shadow: 0px 0px 13px 0px rgba(255, 172, 172, 0.79);
  border-radius: 15px;
}

.btn-left {
  margin-left: 13px;
  margin-right: 12px;
}

.btn-right {
  background: rgba(69, 155, 254, 1);
  box-shadow: 0px 0px 27px 0px rgba(141, 208, 255, 0.79);
}

.btn-left-img {
  width: 16px;
  height: 15px;
}

.btn-right-img {
  width: 33px;
  height: 15px;
}

.footer {
  align-items: center;
  width: 375px;
  height: 58px;
  background: linear-gradient(
    -35deg,
    rgba(228, 251, 255, 1),
    rgba(232, 245, 254, 1)
  );
  box-shadow: 0px 3px 8px 0px rgba(159, 201, 234, 0.65);
  border-radius: 5px;
}

.footer_text {
  width: 70px;
  height: 17px;
  font-size: 15px;
  font-family: Adobe Heiti Std R;
  font-weight: bold;
  color: rgba(53, 53, 53, 1);
  line-height: 17px;
}

.footer {
  position: fixed;
  bottom: 0;
}

.footer_text__left {
  margin-left: 65px;
}

.split-line {
  margin-left: 50px;
  margin-right: 50px;
  width: 1px;
  height: 28px;
  background: rgba(53, 53, 53, 1);
}

.description {
  margin: 0 auto;
  margin-top: 8px;
  width: 355px;
  height: 178px;
  background: linear-gradient(
    -35deg,
    rgba(227, 251, 255, 1),
    rgba(232, 245, 254, 1)
  );
  box-shadow: 0px 3px 8px 0px rgba(158, 202, 234, 0.65);
  border-radius: 5px;
}

.description p {
  padding-left: 15px;
  padding-top: 6px;
  /* height: 17px; */
  font-size: 13px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(53, 53, 53, 1);
  line-height: 17px;
}

.list-title {
  padding-top: 22px;
  padding-bottom: 5px;
  font-size: 15px;
}

.s-line {
  width: 355x;
  height: 1px;
  background: rgba(199, 224, 240, 1);
}

.confirm-btn {
  margin: 0 auto;
  margin-top: 150px;
  width: 354px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  background: rgba(62, 192, 254, 1);
  box-shadow: 0px 3px 8px 0px rgba(158, 202, 234, 0.7);
  border-radius: 5px;
  color: #ffffff;
  font-size: 18px;
}

.confirm-btn-al {
  background: #a0a0a0;
}

.modal__box {
  padding-top: 40px;
  width: 276px;
  height: 230px;
  background: linear-gradient(
    -35deg,
    rgba(227, 251, 255, 1),
    rgba(232, 245, 254, 1)
  );
  border-radius: 5px;
}

.modal__box label {
  width: 40px;
  height: 17px;
  font-size: 13px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(53, 53, 53, 1);
  line-height: 17px;
  margin-left: 20px;
}

.phone__number__input {
  margin-left: 18px;
  height: 30px;
}

.phone-tip {
  width: 226px;
  height: 33px;
  font-size: 13px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(69, 191, 254, 1);
  line-height: 20px;
  padding-left: 25px;
  text-align: center;
}

.small__btn {
  width: 250px;
  height: 43px;
  background: rgba(62, 192, 254, 1);
  box-shadow: 0px 3px 8px 0px rgba(158, 202, 234, 0.7);
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 43px;
  font-size: 15px;
  margin: 0 auto;
  margin-top: 40px;
}
.btn-text {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 16px;
}

.text-join {
	width: 85px;
	height: 17px;
	font-size: 12px;
	font-family:SourceHanSansCN-Normal;
	font-weight:400;
	color:rgba(53,53,53,1);
	line-height:17px;
	opacity:0.8;
}

.btn-left,.btn-right {
	position: relative;
}

.select-icon {
	position: absolute;
	width: 22px;
	height: 22px;
	right: -3px;
	top: -5px;
}

.status_str {
  margin-top: 15px;
  height: 17px;
  font-size: 11px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(53, 53, 53, 1);
  line-height: 17px;
}

.phone-error {
  font-size: 12px;
  color: #ab2d2d;
  text-indent: 80px;
}
</style>

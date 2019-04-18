<template>
<div>
    <div class="container__box">
    <!-- list -->
        <div class="div__list" v-for="(item, index) in listArr" :key="index">
            <!-- floor__top -->
            <div class="floor__top flex" @click="jumpDetail(item.focus_id)">
                <img class="close-icon" src="@/assets/project_1.png" alt="">
                <div class="text">本期投入积分：{{item.integral}}</div>
            </div>
            <!-- floor_bottom -->
            <div class="floor_bottom">
                <div class="bottom_title">{{ item.title }}</div>
                <!-- time-out -->
                <div v-if="item.status == 1">
                    <countDown :end="item.end_time"></countDown>
                </div>

                <div class="status_str" v-if="item.status != 1">{{ item.status_str }}</div>
            </div>
            <!-- btn-group -->
            <div class="btn-group flex" @click="jumpDetail(item.focus_id)">
                <div class="btn btn-left">
                    <div class="btn-text">{{item.option.A}}</div>
                </div>
                <div class="btn btn-right">
                    <div class="btn-text">{{item.option.B}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- footer -->
     <div class="footer flex">
        <div class="footer_text footer_text__left" @click="projectRule">活动规则</div>
        <div class="split-line"></div>
        <div class="footer_text" @click="guess_record">竞猜记录</div>
    </div>

    <!-- dialog -->
    <Dialog :value="show__rule">
        <div class="modal__box">
            <p class="list-1">游戏规则</p>
            <p class="title-1">一、活动时间</p>
            <p class="content-1">2019年3月22日～4月15日</p>
            <p class="title-1">二、活动规则</p>
            <p class="content-1">1、活动期间，仅登陆用户可参与活动；</p>
            <p class="content-1">2、每期题目持续时间为5天，在5天之内可参与选择问题；</p>
            <p class="content-1">3、题目仅为A、B两种选项，选择后题不可更改，5天之后选择人数较少答案的用户，将奖池积分平局分给该答案的用户</p>
            <p class="content-1">4、每期积分奖池为10万积分；</p>
            <p class="content-1">5、积分将在X个工作日内发至登陆参与活动用户的账户中，请登录掌上国寿积分页面查询；</p>
            <p class="content-1">6、活动期间，如果发现用户采用不正当的方式参与活动的，中国人寿电子商务有限公司取消其参与资格和中奖资格；</p>
            <p class="content-1">7、本活动由中国人寿电子商务有限公司负最终解释权</p>
            <p class="title-1">二、活动奖品</p>
            <p class="content-1">活动期间共计发布5道问题，其中每道题持续时间5天时间，每次积分奖池为10万积分，共计活动发放50万积分</p>
        </div>
        <img class="close-btn" src="@/assets/close-btn.png" @click="closeModal"/>
    </Dialog>
</div>
  
 
</template>

<script>
import Dialog from "@/components/common/Dialog.vue";
import { projectList } from '../api.js'
import { parseUrl, getPlatform } from "../util/http.js";
import countDown from "@/components/common/count-down.component";

export default {
    data() {
        return {
            show__rule: false,
            listArr: [],
            str_hour: '',
            str_min: '',
            str_sec: '',
        }
    },
    components: {
        Dialog,
        countDown
    },
    created() {
        this.initPage()
    },
    
    methods: {
        initPage() {
            projectList('focus', '').then((res) => {
                let respones = res.data
                if (respones.code == 0) {
                    this.listArr = respones.data
                    console.log(this.listArr)
                }
                console.log(respones)
            })
        },

        jumpDetail(option) {
            this.$router.push({path:'detail',query:{focus_id:option}})
        },
        guess_record() {
        //    this.$router.push({path:'record',query:{}})
            // 两种状态
            if (getPlatform() == 'weixin') {
                this.$router.push({path:'record-weixin',query:{}})
            } else {
                this.$router.push({path:'record',query:{}})
            }
        },
        projectRule() {
            this.show__rule = true
        },
        closeModal() {
            this.show__rule = false
        }
    }
};
</script>

<style scoped>
.flex {
    display: flex;
}

.btn-text {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 16px;
}

.container__box {
  padding-left: 11px;
  padding-bottom: 60px;
}

.div__list {
    margin-top: 10px;
    width: 355px;
    height: 178px;
    background: linear-gradient(
        -35deg,
        rgba(228, 251, 255, 1),
        rgba(232, 245, 254, 1)
    );
    box-shadow: 0px 3px 8px 0px rgba(159, 201, 234, 0.65);
    border-radius: 5px;
}

.floor__top {
    justify-content: space-between;
    align-items: center;
    height: 42px;
    border-bottom: 1px solid #C8DFF0;
}

.close-icon {
    margin-left: 13px;
    width: 84px;
    height: 23px;
}

.text {
    margin-right: 20px;
    height: 17px;
    font-size: 12px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(69,191,254,1);
    line-height: 17px;
    position: relative;
}


.text:after, .text:before {
  border: 6px solid transparent;
  border-left: 5px solid #E8F5FE;
  width: 0;
  height: 0;
  position: absolute;
  top: 2px;
  right: -20px;
  content: ' '
}

.text:before {
  border-left-color: #45BFFE;
  right: -21px;
}


.floor_bottom {
    padding-left: 14px;
}

.bottom_title {
    margin-top: 20px;
    height:15px;
    font-size:15px;
    font-family:SourceHanSansCN-Bold;
    font-weight:bold;
    color:rgba(53,53,53,1);
    line-height:17px;
}

.btn {
    text-align: center;
    margin-top: 25px;
    /* justify-content: flex-start; */
    width: 89px;
    height: 29px;
    line-height: 29px;
    background: rgba(246,102,54,1);
    box-shadow: 0px 0px 13px 0px rgba(255,172,172,0.79);
    border-radius: 15px;
}

.btn-left {
    margin-left: 13px;
    margin-right: 12px;
}

.btn-right {
    background:rgba(69,155,254,1);
    box-shadow:0px 0px 27px 0px rgba(141,208,255,0.79);
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
    background:linear-gradient(-35deg,rgba(228,251,255,1),rgba(232,245,254,1));
    box-shadow: 0px 3px 8px 0px rgba(159,201,234,0.65);
    border-radius: 5px;
}

.footer_text {
    width: 70px;
    height:17px;
    font-size:15px;
    font-family: Adobe Heiti Std R;
    font-weight: bold;
    color:rgba(53,53,53,1);
    line-height:17px;
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
    background:rgba(53,53,53,1);
}

.modal__box {
    width: 276px;
    height: 480px;
    background:linear-gradient(-35deg,rgba(227,251,255,1),rgba(232,245,254,1));
    border-radius:5px;
}

.close-btn {
    width: 29px;
    height: 29px;
    margin-top: 22px;
    margin-left: 124px;
}

.modal__box {
    padding-top: 27px;
    padding-left: 19px;
    padding-right: 5px;
}

.list-1 {
    width:76px;
    height:18px;
    font-size:18px;
    font-family:SourceHanSansCN-Bold;
    font-weight:bold;
    margin: 0 auto;
    color:rgba(53,53,53,1);
    line-height:17px;
}

.content-1 {
    font-size:13px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(53,53,53,1);
    line-height:22px;
}

.title-1 {
    height:22px;
    font-size:13px;
    font-family:SourceHanSansCN-Bold;
    font-weight:bold;
    color:rgba(53,53,53,1);
    line-height:22px;
}

.status_str{
    margin-top: 15px;
    height:17px;
    font-size:11px;
    font-family:SourceHanSansCN-Normal;
    font-weight:400;
    color:rgba(53,53,53,1);
    line-height:17px;
}
</style>

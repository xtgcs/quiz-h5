import { confirm } from '../api'

export const getAppid = () => {
    confirm('weixin/info', '', {'sys_id': 3}).then(res => {
        console.log(res)
    })
}
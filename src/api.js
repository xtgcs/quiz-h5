import { fetch } from './util/request-new-guess.js'

export const projectList = (url, type, data) => {
    //如果type为空，默认为post方法，也可以自己改成get
    if (type === '')
        type = 'get';
    return fetch({
        url: url,
        method: type,
        data: data,
    })
}

// 竞猜详情
export const projectDetail = (url, type, data) => {
    //如果type为空，默认为post方法，也可以自己改成get
    if (type === '') {
        type = 'get';
        return fetch({
            url: url,
            method: type,
            params: data,
        })
    } else {
        return fetch({
            url: url,
            method: 'POST',
            data: data,
        })
    }
}

// 确认参与
export const confirm = (url, type, data) => {
    //如果type为空，默认为post方法，也可以自己改成get
    if (type === '') {
        type = 'get';
        return fetch({
            url: url,
            method: type,
            params: data,
        })
    } else {
        return fetch({
            url: url,
            method: 'POST',
            data: data,
        })
    }
}


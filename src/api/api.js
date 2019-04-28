import axios from 'axios';

import { Message } from 'element-ui';
// http://47.106.39.130:6006/
let base = '';

axios.defaults.headers = {
    // 'Content-type': 'application/x-www-form-urlencoded'
}

axios.interceptors.response.use(
    res => {
        let data = res.data;
        console.log(data);
        if (data.code != 0) {
            Message.error(data.msg);
            return Promise.reject(data);
        }
        return data;
    },
    error => {
        let data = error.response.data;
        console.log(data);
        let errMsg = Object.prototype.toString.call(data).slice(8, -1) === 'Object' ? data.msg : data;
        Message.error(errMsg);
        return Promise.reject(data);
    }
)

export const requestLogin = params => { return axios.post(`${base}/login`, params); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

/**
    pageNum	    是	页数
    pageSize	是	条数
    type	    否	0 建议 1 吐槽
    startTime	否	开始时间
    endTime	    否	结束时间
 */
export const getForumList = params => {
    return axios.get(`${base}/forum/getForumList`, {params});
}

export const getForumById = id => {
    return axios.get(`${base}/forum/getForumById`, {id});
}

export const deleteForum = params => {
    return axios.get(`${base}/forum/deleteForum`, {params});
}

export const batchDeleteForum = params => {
    return axios.get(`${base}/forum/batchDeleteForum`, {params});
}

export const addForum = params => {
    return axios.post(`${base}/forum/addForum`, {params});
}

export const updateForum = params => {
    return axios.post(`${base}/forum/updateForum`, {params});
}

export const exportForum = (params) => {
    window.open(`${base}/forum/exportForumModelXls`, '_blank');
}

export const login = (params) => {
    return axios.get(`${base}/login/auth`, {params});
}

export const getSysUserList = (params) => {
    return axios.post(`${base}/sysUser/list`, {params})
}

export const deleteSysUser = (ids) => {
    return axios.post(`${base}/sysUser/delete`, {ids});
}

export const addSysUser = (params) => {
    return axios.post(`${base}/sysUser/add`, params);
}

export const updateSysUser = (params) => {
    return axios.post(`${base}/sysUser/update`, params);
}

export const getCustomerList = (params) => {
    return axios.get(`${base}/user/getUserLis`, {params});
}

export const addCustomer = (params) => {
    return axios.post(`${base}/user/saveUser`, params);
}


/**
 * 订单 ----
 */
// 后台订单列表
export const getOrderList = (params) => {
    return axios.get(`${base}/order/getOrderList`, {params});
}

export const getOrderDetail = (id) => {
    return axios.get(`${base}/order/findById/${id}`);
}

export const getTeamUsers = (teamId, pageNum, pageSize) => {
    return axios.get(`${base}/order/getTeamUsers/${teamId}/${pageNum}/${pageSize}`);
}

export const exportOrderXls = (params) => {
   window.open(`${base}/order/exportOrderXls`, '_blank');
}

import axios from 'axios';
// http://47.106.39.130:6006/
let base = '';

axios.interceptors.response.use(
    res => {
        console.log(res);
        return res.data;
    },
    error => {
        console.log(res);
        return Promise.reject(error);
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


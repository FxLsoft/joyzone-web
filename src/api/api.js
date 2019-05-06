import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: '',
    timeout: 5000
});

service.interceptors.request.use(config => {
    let param = config.data || config.params;
    if (Object.prototype.toString.call(param).slice(8, -1) == 'Object') {
        let ret = ''
        for (let it in param) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(param[it]) + '&'
        }
        config.data = ret;
    }
    // 设置请求头
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded', // 模拟form表单方式提交请求
    }
    return config
}, error => {
    Promise.reject(error)
});

service.interceptors.response.use(
    res => {
        let data = res.data;
        if (data.code != 0) {
            Message.error(data.msg);
            return Promise.reject(data);
        }
        return data;
    },
    error => {
        let data = error.response.data;
        let errMsg = Object.prototype.toString.call(data).slice(8, -1) === 'Object' ? data.msg : data;
        Message.error(errMsg);
        return Promise.reject(data);
    }
)

export const requestLogin = params => { return service.post(`/login`, params); };

export const getUserList = params => { return service.get(`/user/list`, { params: params }); };

export const getUserListPage = params => { return service.get(`/user/listpage`, { params: params }); };

export const removeUser = params => { return service.get(`/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return service.get(`/user/batchremove`, { params: params }); };

export const editUser = params => { return service.get(`/user/edit`, { params: params }); };

export const addUser = params => { return service.get(`/user/add`, { params: params }); };

/**
    pageNum	    是	页数
    pageSize	是	条数
    type	    否	0 建议 1 吐槽
    startTime	否	开始时间
    endTime	    否	结束时间
 */
export const getForumList = params => {
    return service.get(`/forum/getForumList`, {params});
}

export const getForumById = id => {
    return service.get(`/forum/getForumById`, {id});
}

export const deleteForum = params => {
    return service.get(`/forum/deleteForum`, {params});
}

export const batchDeleteForum = params => {
    return service.get(`/forum/batchDeleteForum`, {params});
}

export const addForum = params => {
    return service.post(`/forum/addForum`, {params});
}

export const updateForum = params => {
    return service.post(`/forum/updateForum`, {params});
}

export const exportForum = (params) => {
    window.open(`/forum/exportForumModelXls`, '_blank');
}

export const login = (params) => {
    return service.post(`/login/auth`, params);
}

export const getSysUserList = (params) => {
    return service.post(`/sysUser/list`, params)
}

export const deleteSysUser = (ids) => {
    return service.post(`/sysUser/delete`, {ids});
}

export const addSysUser = (params) => {
    return service.post(`/sysUser/add`, params);
}

export const updateSysUser = (params) => {
    return service.post(`/sysUser/update`, params);
}

export const getCustomerList = (params) => {
    return service.get(`/user/getUserLis`, {params});
}

export const addCustomer = (params) => {
    return service.post(`/user/saveUser`, params);
}


/**
 * 订单 ----
 */
// 后台订单列表
export const getOrderList = (params) => {
    return service.get(`/order/getOrderList`, {params});
}

export const getOrderById = (id) => {
    return service.get(`/order/findById/${id}`);
}

export const getTeamUsers = (teamId, pageNum, pageSize) => {
    return service.get(`/order/getTeamUsers/${teamId}/${pageNum}/${pageSize}`);
}

export const exportOrderXls = (params) => {
   window.open(`/order/exportOrderXls`, '_blank');
}

/**
    商家
 */
export const getShopList = (params) => {
    return service.post(`/shop/list`, params);
}

export const deleteShop = (ids) => {
    return service.post(`/shop/delete`, {ids});
}

export const addShop = (params) => {
    return service.post(`/shop/add`, params);
}

export const updateShop = (params) => {
    return service.post(`/shop/update`, params);
}

/**
    后台店家体验券管理
 */
export const getShopCouponList = (params) => {
    return service.get(`/shiopCoupon/getShopCouponList`, {params});
}

export const getShopCouponById = (id) => {
    return service.get(`/shiopCoupon/selectById/${id}`);
}

export const addShopCoupon = (params) => {
    return service.post(`/shiopCoupon/saveShopCoupon`, params);
}

export const updateShopCoupon = (params) => {
    return service.post(`/shiopCoupon/updateCouponStatus`, params);
}

export const exportShopCouponXls = (params) => {
   window.open(`/shiopCoupon/exportShopCouponXls`, '_blank');
}

/**
    后台折扣券管理
 */
 export const getShopDiscountCouponList = (params) => {
    return service.get(`/shopDiscount/getShopDiscountList`, {params});
}


export const getShopDiscountCouponById = (id) => {
    return service.get(`/shopDiscount/selectById/${id}`);
}

export const addShopDiscountCoupon = (params) => {
    return service.post(`/shopDiscount/saveShopDiscount`, params);
}

export const updateShopDiscountCoupon = (params) => {
    return service.post(`/shopDiscount/saveShopDiscount`, params);
}

export const exportShopDiscountCouponXls = (params) => {
   window.open(`/shopDiscount/exportShopDiscountXls`, '_blank');
}

export const getShopTypeList = (type) => {
    return service.get(`/shopType/getShopTypeList`, {params: {type}});
}

/**
    邀约
 */
export const getInviteList = (params) => {
    return service.get(`/inviting/getInvitingList`, {params});
}

export const getInviteById = id => {
    return service.get(`/inviting/findById/${id}`);
}

export const exportInviteXls = (params) => {
   window.open(`/inviting/exportInvitingXls`, '_blank');
}
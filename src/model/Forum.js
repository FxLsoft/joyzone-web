export default function(vm) {
    let _ = this;
    _.id = vm.id || 0;
    _.userId = vm.userId || 0;
    _.type = vm.type || 0; // 0 建议 1 吐槽
    _.pointNum = vm.pointNum || 0; // 跟帖人数
    _.content = vm.content || '';
    _.pointNum = vm.pointNum || 0; // 内容
    _.createTime = vm.createTime || new Date(); // 发布时间
    _.status = vm.status || 0; // 状态 0 失效 1正常
    _.forumNum = vm.forumNum || 0;
}
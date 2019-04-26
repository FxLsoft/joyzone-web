export default function (vm = {}) {
    let _ = this;
    _.id = vm.id || '';                     // 主键
    _.label = vm.label || '';               // 标签
    _.value = vm.value || '';               // 完整类名
    _.dataurl = vm.dataurl || '';           // 数据接口
    _.tableName = vm.tableName || '';       // 物理表明
    _.createBy = vm.createBy || '';         // 创建者
    _.createDate = vm.createDate || '';     // 创建时间
    _.updateBy = vm.updateBy || '';         // 更新者
    _.updateDate = vm.updateDate || '';     // 更新时间
    _.description = vm.description || '';   // 说明
    _.delFlag = vm.delFlag || 0;            // 逻辑删除标记（0：显示；1：隐藏）
}

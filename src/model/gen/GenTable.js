import TableColum from './GenTableColum';
import Scheme from './GenScheme';

export default function (vm = {}) {
    let _ = this;
    _.id = vm.id || '';                         // 主键ID
    _.name = vm.name || '';                     // 名称
    _.comments = vm.comments || '';             // 描述
    _.className = vm.className || '';           // 实体类名称
    _.parentTable = vm.parentTable || '';       // 关联父表
    _.parentTableFk = vm.parentTableFk || '';   // 关联父表外键
    _.isSync = !!vm.isSync;                     // 是否已同步到数据库
    _.tableType = vm.tableType || '';           // 表类型
    _.genIdType = vm.genIdType || '';           // 主键策略
    _.createBy = vm.createBy || '';             // 创建者
    _.createDate = vm.createDate || '';         // 创建时间
    _.updateBy = vm.updateBy || '';             // 更新者
    _.updateDate = vm.updateDate || '';         // 更新时间
    _.remarks = vm.remarks || '';               // 备注说明
    _.delFlag = vm.delFlag || 0;                // 逻辑删除标记（0：显示；1：隐藏）
    _.tableColum = [new TableColum()];          //
    _.scheme = new Scheme();                    //
}

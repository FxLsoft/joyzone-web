<template>
    <div class="form-page">
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-date-picker v-model="filters.dateRange" type="daterange" range-separator=" To " start-placeholder="Start date" end-placeholder="End date"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="handleExport">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
		<el-table :data="list" highlight-current-row v-loading="isLoading" @selection-change="selectChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="40"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="shopName" label="店家名称"></el-table-column>
			<el-table-column prop="shopTypeName" label="店家种类名称"></el-table-column>
			<el-table-column prop="price" label="折扣后的价格"></el-table-column>
            <el-table-column prop="discount" label="折扣"></el-table-column>
			<el-table-column prop="number" label="允许人数"></el-table-column>
			<el-table-column prop="playTime" label="玩耍时间"></el-table-column>
            <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--底部工具条-->
		<el-col :span="24" class="bottom-toolbar">
			<el-button type="danger" @click="batchDelete" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total"></el-pagination>
		</el-col>
        <!--新增界面-->
		<el-dialog :title="isAdd? '新增' : '编辑'" :visible.sync="formVisible" :close-on-click-modal="false">
			<el-form :model="form" label-width="110px" :rules="formRules" ref="form">
				<el-form-item label="折扣券名称" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="店家种类">
                    <el-select v-model="form.shopTypeId" filterable placeholder="请选择">
                        <el-option v-for="item in shopType.typeSource" :key="item.id" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="店家名称" prop="shopName">
					<el-input v-model="form.shopName" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="折扣后的价格" prop="price">
                    <el-input-number v-model="form.price" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="折扣" prop="discount">
                    <el-input-number v-model="form.discount" :min="0" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="允许人数" prop="number">
                    <el-input-number v-model="form.number" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="玩耍时间" prop="playTime">
                    <el-date-picker v-model="form.playTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio class="radio" :label="0">失效</el-radio>
						<el-radio class="radio" :label="1">正常</el-radio>
					</el-radio-group>
				</el-form-item>
                <el-form-item label="有效时间">
                    <el-date-picker v-model="couponValidDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="formVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import http from '@/api';

const Model = function (vm = {}) {
    let _ = this;
    _.id = vm.id || '';
    _.name = vm.name || '';
    _.shopId = vm.shopId || '';
    _.shopName = vm.shopName || ''
    _.shopTypeId = vm.shopTypeId || '';
    _.shopTypeName = vm.shopTypeName || '';
    _.price = vm.price || 0;
    _.discount = vm.discount;
    _.number = vm.number || 0; // 限制人数
    _.playTime = vm.playTime;
    _.status = vm.status || 0; // 状态：0 失效 1 正常
    // _.createTime = vm.createTime;
    // _.updateTime = vm.updateTime; //
    _.startTime = vm.startTime; // 开始时间
    _.endTime = vm.endTime; // 结束时间
    _.type = 2;
}

export default {
    data() {
        return {
			isLoading: false,
            filters: {
				name: '',
				dateRange: []
            },
			list: [],
			sels: [],
			page: 1,
			pageSize: 20,
			total: 0,
            // 添加/编辑
            isAdd: true,
            formVisible: false,//新增界面是否显示
            addLoading: false,
            formRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            //新增界面数据
            form: new Model(),

            couponValidDate: [],
            shopType: {
                loading: false,
                typeSource: []
            }
        }
	},
	mounted() {
		this.queryList();
	},
    methods: {
        selectChange(sels) {
			this.sels = sels;
		},
		handleEdit(index, row) {
            this.form = new Model(row);
            this.formVisible = true;
            this.isAdd = false;
            this.initShopTypeSource();
            this.couponValidDate = [this.form.startTime, this.form.endTime];
        },
        handleAdd() {
            this.formVisible = true;
            this.isAdd = true;
            this.form = new Model();
            this.initShopTypeSource();
            this.couponValidDate = [this.form.startTime, this.form.endTime];
		},
		handleExport() {
            let param = Object.assign({}, this.filters);
			param.page = this.page;
			param.pageSize = this.pageSize;
			http.exportShopDiscountCouponXls(param);
		},
        handleDel(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', { type: 'warning' }).then(() => {
				this.isLoading = true;
				http.deleteShopDiscountCoupon([row.id]).then((res) => {
					this.isLoading = false;
					this.$message({ message: '删除成功', type: 'success' });
					this.queryList();
				}).finally(() => {
					this.isLoading = false;
				});
			})
        },
        queryList() {
			this.isLoading = true;
			let param = Object.assign({}, this.filters);
			param.page = this.page;
			param.pageSize = this.pageSize;
			http.getShopDiscountCouponList(param).then(res => {
				if (res.code == 0) {
					this.list = res.data || [];
					this.total = res.total || this.list.length;
				}
			}).finally(() => {
				this.isLoading = false;
			});
		},
		batchDelete() {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', { type: 'warning' }).then(() => {
				this.isLoading = true;
				http.deleteShopDiscountCoupon(ids).then((res) => {
					this.$message({ message: '删除成功', type: 'success' });
					this.queryList();
				}).finally(() => {
					this.isLoading = false;
				});
			});
		},
		handleCurrentChange(val) {
			this.page = val;
			this.queryList();
		},
		formatType (row, column) {
			var out = '-';
            switch(row.type) {
                case 0: out = '组队店';break;
                case 1: out = '体验券店家';break;
            }
            return out;
		},
        formatStatus(row, column) {
            var out = '-';
            switch(row.status) {
                case 0: out = '失效';break;
                case 1: out = '正常';break;
            }
            return out;
        },
        //新增
        addSubmit: function () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        this.form.startTime = this.couponValidDate[0];
                        this.form.endTime = this.couponValidDate[1];
                        let para = new Model(this.form)
                        http[!para.id ? 'addShopDiscountCoupon' : 'updateShopDiscountCoupon'](para).then((res) => {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['form'].resetFields();
                            this.formVisible = false;
                            this.queryList();
                        }).finally(() => {
                            this.addLoading = false;
                        })
                    });
                }
            });
        },
        initShopTypeSource() {
            if (this.__formType != this.form.type) {
                this.shopType.loading = true;
                http.getShopTypeList(this.form.type).then(res => {
                    this.shopType.typeSource = (res.data || []);
                    this.__formType = this.form.type;
                }).finally(() => {
                    this.shopType.loading = false;
                })
            } else {
                this.shopType.typeSource = [];
            }
        }
    }
}
</script>

<style lang="scss">

</style>

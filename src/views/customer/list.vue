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
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="userName" label="用户名"></el-table-column>
			<el-table-column prop="loginName" label="登录名" ></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column label="头像">
                <template slot-scope="{row}">
                    <img :src="row.headPic" class="avatar">
                </template>
            </el-table-column>
			<el-table-column prop="sex" label="性别" :formatter="formatSex"></el-table-column>
			<el-table-column prop="birthday" label="生日"></el-table-column>
            <el-table-column prop="profession" label="头衔"></el-table-column>
            <el-table-column prop="education" label="学历"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="status" label="用户状态" :formatter="formatStatus"></el-table-column>
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
		<el-dialog :title="isAdd? '新增' : '编辑'" v-model="formVisible" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px" :rules="formRules" ref="form">
				<el-form-item label="姓名" prop="userName">
					<el-input v-model="form.userName" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="登录名">
					<el-input v-model="form.loginName" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="密码" prop="password">
					<el-input v-model="form.password" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="联系方式">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="form.headPic"></el-input>
				</el-form-item>
                <el-form-item label="生日">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a day"></el-date-picker>
                </el-form-item>
                <el-form-item label="头衔">
					<el-input v-model="form.profession"></el-input>
				</el-form-item>
                <el-form-item label="学历">
					<el-input v-model="form.education"></el-input>
				</el-form-item>
                <el-form-item label="年龄">
					<el-input-number v-model="form.age" min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio class="radio" :label="0">激活</el-radio>
						<el-radio class="radio" :label="1">禁用</el-radio>
					</el-radio-group>
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
    _.userName = vm.userName || '';
    _.loginName = vm.loginName || '';
    _.password = vm.password || ''
    _.phone = vm.phone || 0;
    _.sex = vm.sex || 0;
    _.headPic = vm.headPic || '';
    _.birthday = vm.birthday || '';
    _.phone = vm.phone || '';
    _.status = vm.status || 0;
    _.profession = vm.profession || '';
    _.education = vm.education || '';
    _.age = vm.age || '';
}

export default {
    data() {
        return {
			isLoading: false,
            filters: {
				userName: '',
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
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            //新增界面数据
            form: new Model()
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
        },
        handleAdd() {
            this.formVisible = true;
            this.isAdd = true;
            this.form = new Model();
		},
		handleExport() {
			http.exportForum();
		},
        handleDel(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', { type: 'warning' }).then(() => {
				this.isLoading = true;
				http.deleteSysUser([row.id]).then((res) => {
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
			http.getCustomerList(param).then(res => {
				this.list = res.data || [];
				this.total = res.total || this.list.length;
			}).finally(() => {
				this.isLoading = false;
			});
		},
		batchDelete() {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', { type: 'warning' }).then(() => {
				this.isLoading = true;
				http.deleteSysUser(ids).then((res) => {
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
		formatSex (row, column) {
			return row.sex == 0 ? '男' : row.sex == 1 ? '女' : '未知';
		},
        formatStatus(row, column) {
            return row.status == 0 ? '激活' : row.status == 1 ? '禁用' : '-';
        },
        //新增
        addSubmit: function () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let para = Object.assign({}, this.form);
                        http.addCustomer(para).then((res) => {
                            this.addLoading = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['form'].resetFields();
                            this.formVisible = false;
                            this.queryList();
                        });
                    });
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

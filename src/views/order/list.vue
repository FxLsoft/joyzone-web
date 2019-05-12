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
					<el-button type="warning" @click="handleExport">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
		<el-table :data="list" highlight-current-row v-loading="isLoading" @selection-change="selectChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="40"></el-table-column>
			<el-table-column prop="orderNo" label="订单编号"></el-table-column>
			<el-table-column prop="orderType" label="订单类型" :formatter="formatType"></el-table-column>
			<el-table-column prop="shopName" label="店家名称"></el-table-column>
			<el-table-column prop="shopTypeName" label="店家类型名称"></el-table-column>
			<el-table-column prop="personNum" label="参加人数"></el-table-column>
			<el-table-column prop="price" label="订单价格"></el-table-column>
            <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
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
		<el-dialog :title="'订单详情'" :visible.sync="formVisible" :close-on-click-modal="false">
			<el-form :model="form" label-width="110px" :rules="formRules" ref="form">
				<el-form-item label="订单编号">
					{{form.orderNo}}
				</el-form-item>
                <el-form-item label="订单类型">
					{{formatType(form)}}
				</el-form-item>
                <el-form-item label="店家名称">
                    {{form.shopName}}
                </el-form-item>
                <el-form-item label="店家类型名称">
                    {{form.shopTypeName}}
                </el-form-item>
				<el-form-item label="参加人数">
                    {{form.personNum}}
                </el-form-item>
                <el-form-item label="订单价格">
                    {{form.price}}
                </el-form-item>
                <el-form-item label="体验时间">
                    {{form.payTime}}
                </el-form-item>
                <el-form-item label="订单状态">
                    {{formatStatus(form)}}
                </el-form-item>
                <el-form-item label="组队详情">
                    <img class="team-avatar" :src="user.headPic" :alt="user.userName" v-for="(user, index) in form.teamUsers" :key="index">
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="formVisible = false">确认</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import http from '@/api';


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
            form: {},


            couponValidDate: []
        }
	},
	mounted() {
		this.queryList();
	},
    methods: {
        selectChange(sels) {
			this.sels = sels;
		},
		handleView(index, row) {
            this.isLoading = true;
            Promise.all([http.getOrderById(row.id), http.getTeamUsers(row.teamId, 1, 100)]).then(resArr => {
                this.formVisible = true;
                this.form = resArr[0].data;
                this.form.teamUsers = resArr[1].data;
            }).finally(() => {
                this.isLoading = false;
            })
        },
		handleExport() {
            let param = Object.assign({}, this.filters);
			param.page = this.page;
			param.pageSize = this.pageSize;
			http.exportOrderXls(param);
		},
        handleDel(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', { type: 'warning' }).then(() => {
				this.isLoading = true;
				http.deleteOrder([row.id]).then((res) => {
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
			http.getOrderList(param).then(res => {
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
				http.deleteOrder(ids).then((res) => {
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
            switch(row.orderType) {
                case 1: out = '组队店';break;
                case 2: out = '体验券店家';break;
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
    }
}
</script>

<style scoped lang="scss">
    .team-avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 5px;
    }
</style>

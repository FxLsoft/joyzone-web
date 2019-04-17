<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称"></el-input>
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
		<el-table :data="lists" highlight-current-row v-loading="isLoading" @selection-change="selectChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="name" label="角色名称" width="120" sortable></el-table-column>
			<el-table-column prop="sex" label="描述" width="200" :formatter="formatSex" sortable></el-table-column>
			<el-table-column prop="age" label="创建日期" width="200" sortable></el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchDelete" :disabled="this.selectedList.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;"></el-pagination>
		</el-col>
    </section>
</template>

<script>
export default {
    data() {
        return {
            filters: {
                name: ''
            },
			lists: [],
			page: 1,
			isLoading: false,
			selectedList: [],
			total: 0
        }
    },
    methods: {
        selectChange(selected) {
			this.selectedList = selected;
        },
        handleDel() {

        },
        handleEdit() {

        },
        handleAdd() {

		},
		handleExport() {
			
		},
        queryList() {
            
		},
		batchDelete() {

		},
		handleCurrentChange(val) {
			this.page = val;
		},
		formatSex: function (row, column) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
    }
}
</script>

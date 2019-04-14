<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="queryList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
		<el-table :data="lists" highlight-current-row v-loading="isLoading" @selection-change="selectChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="角色名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="描述" width="200" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="age" label="创建日期" width="100" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
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
            isLoading: false
        }
    },
    methods: {
        selectChange() {

        },
        handleDel() {

        },
        handleEdit() {

        },
        handleAdd() {

        },
        queryList() {
            
        }
    }
}
</script>

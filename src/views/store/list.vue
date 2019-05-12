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
			<el-table-column prop="phone" label="手机号码" width="110"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column prop="price" label="价格"></el-table-column>
			<el-table-column prop="type" label="店家类型" :formatter="formatType"></el-table-column>
			<el-table-column label="封面照片">
                <template slot-scope="{row}">
                    <el-image :src="row.coverImg" lazy></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
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
			<el-form :model="form" label-width="120px" :rules="formRules" ref="form">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="手机号码" prop="phone">
					<el-input v-model="form.phone" auto-complete="off"></el-input>
				</el-form-item>
                
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" :rows="2" placeholder="请输入店家描述" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="form.price" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
				<el-form-item label="店家类型">
					<el-radio-group v-model="form.type">
						<el-radio class="radio" :label="1">组队店家</el-radio>
						<el-radio class="radio" :label="2">体验券店家</el-radio>
					</el-radio-group>
				</el-form-item>
                <el-form-item label="店家种类">
                    <el-select v-model="form.shopTypeId" filterable placeholder="请选择">
                        <el-option v-for="item in shopType.typeSource" :key="item.id" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="店家状态">
					<el-radio-group v-model="form.status">
						<el-radio class="radio" :label="0">签约</el-radio>
						<el-radio class="radio" :label="1">待审核</el-radio>
                        <el-radio class="radio" :label="2">已禁入</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="店家封面照片">
                    <el-upload class="avatar-uploader" action="/doc/uploadShopDoc" :show-file-list="false"
                        :on-success="(res) => {form.coverImg = res.filePath}" :before-upload="beforeAvatarUpload">
                        <img v-if="form.coverImg" :src="form.coverImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
				</el-form-item>
                <el-form-item label="工商注册照片">
                    <el-upload class="avatar-uploader" action="/doc/uploadShopDoc" :show-file-list="false"
                        :on-success="(res) => {form.regImg = res.filePath}" :before-upload="beforeAvatarUpload">
                        <img v-if="form.regImg" :src="form.regImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
				</el-form-item>
                <el-form-item label="法人信息照片">
                    <el-upload class="avatar-uploader" action="/doc/uploadShopDoc" :show-file-list="false"
                        :on-success="(res) => {form.legalPersonImg = res.filePath}" :before-upload="beforeAvatarUpload">
                        <img v-if="form.legalPersonImg" :src="form.legalPersonImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
				</el-form-item>
                <el-form-item label="地址位置信息">
                    <div class="amap-wrapper">
                        <el-amap-search-box class="search-box" :search-option="mapOpt.searchOption" :on-search-result="mapOpt.onSearchResult"></el-amap-search-box>
                        <el-amap ref="map" class="amap-box" vid="amap-vue" :zoom="mapOpt.zoom" :center="mapOpt.center" :events="{click: mapClick}">
                            <el-amap-marker v-if="mapOpt.selectMarker" :position="mapOpt.selectMarker.position" :label="mapOpt.selectMarker.label"></el-amap-marker>
                        </el-amap>
                    </div>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
					<el-input v-model="form.address" auto-complete="off"></el-input>
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
    _.phone = vm.phone || ''
    _.address = vm.address || '';
    _.description = vm.description || '';
    _.price = vm.price || 0;
    _.phone = vm.phone || '';
    _.status = vm.status || 0;
    _.type = vm.type || 1; //1：组队店家，2：体验券店家
    _.coverImg = vm.coverImg || ''; // 店家封面照片
    _.status = vm.status || 0; // 店家状态；0：签约；1：待审核；2：已禁入
    _.regImg = vm.regImg || ''; // 工商注册照片
    _.legalPersonImg = vm.legalPersonImg || ''; // 法人信息照片
    _.createTime = vm.createTime;
    _.updateTime = vm.updateTime;
    _.shopTypeId = vm.shopTypeId;
    _.shopTypeName = vm.shopTypeName;
    _.lng = vm.lng;
    _.lat = vm.lat;
}
const MapCmp = {
    props: ['text'],
    template: `<div>text from  parent: {{text}}</div>`
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

            mapOpt: {
                searchOption: {},
                onSearchResult: e => {
                    console.log(e);
                    if (Array.isArray(e) && e.length > 0) {
                        let p = e[0];
                        this.mapOpt.selectMarker = {
                            position: [p.lng, p.lat],
                            label: p.address,
                            p
                        };
                        this.getCityInfo(p.lng, p.lat);
                    }
                },
                searchMarkers: [],
                selectMarker: null,
                zoom: 14,
                center: [114.305215, 30.592935]
            },

            shopType: {
                loading: false,
                typeSource: []
            }
        }
	},
    created() {
        
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
            if (this.form.lng && this.form.lat) {
                this.mapOpt.center = [this.form.lng, this.form.lat];
                this.mapOpt.selectMarker = {
                    label: this.form.address,
                    position: [this.form.lng, this.form.lat]
                }
            }
            this.initShopTypeSource();
            console.log(this);
        },
        handleAdd() {
            this.formVisible = true;
            this.isAdd = true;
            this.form = new Model();
            if (this.form.lng && this.form.lat) {
                this.mapOpt.center = [this.form.lng, this.form.lat];
                this.mapOpt.selectMarker = {
                    label: this.form.address,
                    position: [this.form.lng, this.form.lat]
                }
            }
            this.initShopTypeSource();
		},
		handleExport() {
            let param = Object.assign({}, this.filters);
			param.page = this.page;
			param.pageSize = this.pageSize;
			http.exportShopXls(param);
		},
        handleDel(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', { type: 'warning' }).then(() => {
				this.isLoading = true;
				http.deleteShop([row.id]).then((res) => {
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
			http.getShopList(param).then(res => {
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
				http.deleteShop(ids).then((res) => {
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
                case 0: out = '签约';break;
                case 1: out = '待审核';break;
                case 2: out = '已禁入';break;
            }
            return out;
        },
        //新增
        addSubmit: function () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        if (this.mapOpt.selectMarker) {
                            this.form.lng = this.mapOpt.selectMarker.position[0];
                            this.form.lat = this.mapOpt.selectMarker.position[1];

                        }
                        let para = Object.assign({}, this.form);
                        http[!para.id ? 'addShop' : 'updateShop'](para).then((res) => {
                            this.addLoading = false;
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
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //获取用户所在城市信息
        getCityInfo(lng, lat) {
            this.mapOpt.center = [lng, lat];
            AMap.service('AMap.Geocoder', () => {//回调函数
                //实例化Geocoder
                let geocoder = new AMap.Geocoder({
                    city: ""//城市，默认：“全国”
                });
                var lnglatXY=[lng, lat];//地图上所标点的坐标
                geocoder.getAddress(lnglatXY, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        //获得了有效的地址信息:
                        //即，result.regeocode.formattedAddress
                        this.form.address = this.mapOpt.selectMarker.label = result.regeocode.formattedAddress;
                        let address = result.regeocode.addressComponent;
                        this.form.province = address.province;
                        this.form.city = address.city || address.province;
                        this.form.area = address.district;
                    }else{ }
                });
            })
        },
        mapClick(e) {
            this.mapOpt.selectMarker = {
                label: '',
                position: [e.lnglat.lng, e.lnglat.lat]
            }
            this.getCityInfo(e.lnglat.lng, e.lnglat.lat);
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
    .amap-wrapper {
        width: 500px;
        height: 300px;
        .search-box {
            position: absolute;
            top: 10px;
            right: 25px;
            z-index: 999;
        }
        .el-vue-search-box-container {
            height: 30px;
        }
    }
    .el-image {
        width: 40px;
        height: 40px;
    }
</style>

<template>
    <el-form v-loading="isLoading" ref="form" :model="form" label-width="150px" class="form">
        <el-form-item label="Single Input">
			<el-input v-model="form.singleInput"></el-input>
		</el-form-item>
		<el-form-item label="Multiple Input">
			<el-input type="textarea" v-model="form.multipleInput"></el-input>
		</el-form-item>
		<el-form-item label="Single Select">
			<el-select v-model="form.singleSelect" placeholder="Single Select">
				<el-option v-for="opt in selectOptions" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Multiple Select">
			<el-select v-model="form.multipleSelect" multiple :multiple-imit="1" placeholder="Multiple Select">
				<el-option v-for="opt in selectOptions" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Date Picker">
			<el-date-picker v-model="form.datePicker" type="date" placeholder="Pick a day"></el-date-picker>
		</el-form-item>
		<el-form-item label="Date Time Picker">
			<el-date-picker v-model="form.dateTimePicker" type="datetime" placeholder="Select date and time"></el-date-picker>
		</el-form-item>
		<el-form-item label="Switch">
			<el-switch v-model="form.switch" active-color="#409eff" inactive-color="#ff4949"></el-switch>
		</el-form-item>
		<el-form-item label="Checkbox">
			<el-checkbox v-model="form.checkbox1" label="Option1"></el-checkbox>
			<el-checkbox v-model="form.checkbox2" label="Option2"></el-checkbox>
		</el-form-item>
		<el-form-item label="Checkbox Group">
			<el-checkbox-group v-model="form.checkboxGroup">
				<el-checkbox v-for="(opt, index) in checkboxOptions" :label="opt.value" :key="index">{{opt.label}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="Radio">
			<el-radio disabled v-model="form.radio" label="disabled">Option A</el-radio>
  			<el-radio disabled v-model="form.radio" label="selected and disabled">Option B</el-radio>
		</el-form-item>
		<el-form-item label="Radio Group">
			<el-radio-group v-model="form.radioGroup">
				<el-radio v-for="(opt, index) in checkboxOptions" :label="opt.value" :key="index">{{opt.label}}</el-radio>
			</el-radio-group>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" @click="onSubmit()">提 交</el-button>
			<el-button @click.prevent="handleCancel()">取 消</el-button>
		</el-form-item>
    </el-form>
</template>

<script>
    import Model from '@/model/Forum';
    export default {
        name: 'role-form',
        data() {
            return {
				isLoading: false,
                form: {
					singleInput: '',
					multipleInput: '',
					singleSelect: '',
					multipleSelect: [],
					datePicker: '',
					dateTimePicker: '',
					switch: false,
					checkbox1: false,
					checkbox2: false,
					checkboxGroup: [],
					radio: 'selected and disabled',
					radioGroup: '',
				},
				selectOptions: [
					{
						value: 1,
						label: 'Option1'
					}, {
						value: 2,
						label: 'Option2'
					}, {
						value: 3,
						label: 'Option3'
					}, {
						value: 4,
						label: 'Option4'
					}, {
						value: 5,
						label: 'Option5'
					}
				],
				checkboxOptions: [
					{
						value: 1,
						label: 'Option1'
					}, {
						value: 2,
						label: 'Option2'
					}, {
						value: 3,
						label: 'Option3'
					}, {
						value: 4,
						label: 'Option4'
					}, {
						value: 5,
						label: 'Option5'
					}
				]
            }
        },
        methods: {
            // 提交保存
            onSubmit() {
				this.isLoading = true;
                this.$refs.form.validate((valid) => {
					if (valid) {
						console.log(this.form);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				setTimeout(() => {
					this.isLoading = false;
				}, 3000)
            },
            handleCancel() {
				this.$refs.form.resetFields();
            }
        },
    }
</script>

<style lang="scss" scope>
.form {
    margin:20px;
    width:60%;
    min-width:600px;
}
</style>
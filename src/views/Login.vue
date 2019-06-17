<template>
    <div class="login-app">
        <el-form :model="form" :rules="rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">JOYZONE系统登录</h3>
            <el-form-item prop="userName">
                <el-input type="text" v-model="form.userName" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import http from '@/api';
    
    export default {
        data() {
            return {
                logining: false,
                form: {
                    userName: 'admin',
                    password: '123456'
                },
                rules2: {
                    userName: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleReset2() {
                this.$refs.form.resetFields();
            },
            handleSubmit2(ev) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        http.login({userName: this.form.userName, password: this.form.password}).then(res => {
                            if (res.code == 0) {
                                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                                this.$router.push({ path: '/' });
                            }
                        }).finally(() => {
                            this.logining = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login-app {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #2492fc;
    }
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        width: 300px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
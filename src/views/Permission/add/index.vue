<template>
    <article>
        <el-card>
            <div slot="header">
                <span>添加管理员</span>
            </div>
            <div class="box">
                <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
                    <el-form-item label="头像" prop="avatar" required>
                        <upload v-model="info.avatar"></upload>
                    </el-form-item>
                    <el-form-item label="名字" prop="nickname">
                        <el-input type="text" v-model="info.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="info.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input type="password" v-model="info.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="info.checkPass"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="roles">
                        <el-select v-model="info.roles" multiple placeholder="请选择" class="block">
                            <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')" :loading="loading">立即创建</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </article>
</template>

<script>
import { mapGetters } from "vuex";
import upload from "@/components/upload";
export default {
    components: { upload },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.info.checkPass !== "") {
                    this.$refs.form.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.info.pwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            info: {
                nickname: "",
                username: "",
                pwd: "",
                avatar: "",
                checkPass: "",
                roles: ["default"]
            },
            roles: [
                { label: "超级管理员", value: "admin" },
                { label: "普通管理员", value: "default" }
            ],
            loading: false,
            rules: {
                nickname: [
                    { required: true, message: "请填写名字", trigger: "blur" }
                ],
                username: [
                    { required: true, message: "请填写用户名", trigger: "blur" }
                ],
                pwd: [
                    { validator: validatePass, required: true, trigger: "blur" }
                ],
                checkPass: [
                    {
                        validator: validatePass2,
                        required: true,
                        trigger: "blur"
                    }
                ],
                roles: [
                    {
                        required: true,
                        message: "请选择权限",
                        trigger: "change",
                        type: "array"
                    }
                ]
            }
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            this.loading = true;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    try {
                        await this.$axios
                            .post("/user/add", this.info)
                            .then(res => {
                                if (res.code == 200) {
                                    this.$message.success(res.msg);
                                    this.$router.push("permission_list");
                                } else {
                                    this.$message.error("用户名不能重复");
                                }
                            });
                        this.loading = false;
                        // this.$router.push("/permission/list");
                    } catch (e) {
                        this.loading = false;
                    }
                } else {
                    console.log("error submit!!");
                    this.loading = false;
                    return false;
                }
            });
        }
    }
};
</script>


<style lang="less" scoped>
article {
    text-align: center;
    padding: 0 20px;
    .box {
        // margin-left: 100px;
        width: 500px;
        text-align: left;
    }
    .block {
        width: 100%;
        display: block;
    }
    .left-item {
        text-align: left;
    }
    .form {
    }
    .submit {
        width: 100px;
    }
}
</style>
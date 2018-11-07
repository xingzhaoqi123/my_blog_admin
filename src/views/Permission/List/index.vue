<template>
    <article>
        <el-card>
            <div slot="header">
                <span>管理员列表</span>
            </div>
            <el-table :data="usersInfo" border style="width: 100%" class="bottom">
                <el-table-column type="index" align="center" header-align="center" width="70">
                </el-table-column>
                <el-table-column prop="avatar" label="头像" align="center" header-align="center" width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" class="avatar1" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center" header-align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" width="280" header-align="center">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row._id)">编辑</el-button>
                        <el-button type="danger" @click="remove(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageindex" :page-size="page_size" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>

            <el-dialog title="个人信息" :visible.sync="editShow">
                <el-form :model="perInfo" :rules="rule" ref="perInfo">
                    <el-form-item label="头像" :label-width="formLabelWidth" required>
                        <upload v-model="perInfo.avatar"></upload>
                    </el-form-item>
                    <el-form-item label="昵称" :label-width="formLabelWidth" required>
                        <el-input v-model="perInfo.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" :label-width="formLabelWidth" required>
                        <el-input v-model="perInfo.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="原密码" :label-width="formLabelWidth" required>
                        <el-input v-model="perInfo.oldPwd" type="password" autocomplete="off"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="新密码" prop="pwd" :label-width="formLabelWidth" required>
                        <el-input v-model="perInfo.pwd" type="password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth" required>
                        <el-input v-model="perInfo.checkPass" type="password" autocomplete="off"></el-input>
                    </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editShow = false">取 消</el-button>
                    <el-button type="primary" @click="update(perInfo._id)">更新</el-button>
                </div>
            </el-dialog>
        </el-card>
    </article>
</template>

<script>
import upload from "@/components/upload";
export default {
    components: { upload },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.perInfo.checkPass !== "") {
                    this.$refs.perInfo.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.perInfo.pwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            // page: 1,
            page_size: 8,
            pageindex: 1,
            rule: {
                pwd: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }]
            },
            usersInfo: [],
            total: 0,
            formLabelWidth: "120px",
            editShow: false,
            perInfo: {
                avatar: "",
                username: "",
                // pwd: "",
                nickname: ""
                // oldPwd: ""
            }
            // updateInfo: {
            //     avatar: "",
            //     username: "",
            //     pwd: "",
            //     nickname: "",
            //     oldPwd: ""
            // checkPass: ""
            // }
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val;
            this.getUserInfo();
        },
        update(id) {
            this.$axios.put(`/user/${id}`, this.perInfo).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.getUserInfo();
                    this.editShow = false;
                }
            });
        },
        remove(id) {
            this.$axios
                .delete(`/user/${id}`)
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.getUserInfo();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        edit(id) {
            this.editShow = true;
            this.$axios
                .get(`/user/person/${id}`)
                .then(res => {
                    if (res.code == 200) {
                        this.perInfo = res.data;
                        // this.updateInfo=this.perInfo
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        resetForm() {
            this.$refs.perInfo.resetFields();
            this.password = "";
            this.perInfo = {
                avatar: "",
                username: "",
                pwd: "",
                nickname: "",
                oldPwd: ""
            };
        },
        getUserInfo() {
            let params = {
                page: this.pageindex,
                page_size: this.page_size
            };
            this.$axios
                .get("/user/list", params)
                .then(res => {
                    if (res.code == 200) {
                        this.usersInfo = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getTotal() {
            this.$axios
                .get("/user/total")
                .then(res => {
                    if (res.code == 200) {
                        this.total = res.total;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getUserInfo();
        this.getTotal();
    },
    watch: {
        editShow: function(val) {
            if (val == false) {
                this.resetForm();
            }
        }
    }
};
</script>


<style lang="less" scoped>
/deep/.el-pagination {
    text-align: center;
    margin-top: 20px;
}
/deep/.bottom {
    scroll-snap-type-x: auto;
}
/deep/.avatar1 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
article {
    padding: 20px;
    .search {
        padding-bottom: 20px;
        .el-input {
            width: 300px;
        }
    }
    .pagination {
        text-align: right;
        padding: 20px 0;
    }
    .tag {
        margin: 0 10px;
    }
}
</style>

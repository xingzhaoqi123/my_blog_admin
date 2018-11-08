<template>
    <div class="header">
        <div class="catalog"><img src="../assets/mulu.png" alt="" ref="mulu" @click="rotate"></div>
        <el-breadcrumb separator="/" class="bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-show="this.$route.meta.title !== '首页'">{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tag v-for="tag in tags" :key="tag.name" @click.native="$router.push({path:`${tag.path}`})" :type="tag.name == $route.meta.title ?'':`${tag.type}`" closable @close="handleClose(tag)">
            {{tag.name}}
        </el-tag>
        <div class="user">
            <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                    <div class="head_img"><img :src="userInfo.avatar" alt=""></div>
                    <div> name<i class="el-icon-arrow-down el-icon--right"></i></div>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="per_info">个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["userInfo"])
    },
    data() {
        return {
            ifRow: true,
            tags: []
        };
    },
    methods: {
        turn_type() {
            for (var item in this.tags) {
                if (item === this.$route.meta.title) {
                }
            }
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },

        rotate() {
            if (this.ifRow) {
                this.$refs.mulu.style.transform = "rotate(90deg)";
                this.ifRow = false;
                this.$store.dispatch("sideBar_show", this.ifRow);
            } else {
                this.$refs.mulu.style.transform = "rotate(0deg)";
                this.ifRow = true;
                this.$store.dispatch("sideBar_show", this.ifRow);
            }
        },
        addTags() {
            var title = this.$route.meta.title;
            var flag = true;
            this.tags.forEach(item => {
                if (item.name === title) {
                    flag = false;
                }
            });
            if (flag) {
                this.tags.push({
                    name: this.$route.meta.title,
                    type: "info",
                    path: this.$route.path
                });
            }

            // if (this.tags.indexOf(this.$route.meta.title) === -1) {
            //     this.tags.push(this.$route.meta.title);
            // }
        },
        per_info() {
            // this.$router.push({path:'per_info',query:{id:this.$store.state.userinfo.id}})
        },
        logout() {
            this.$axios.get("/user/logout").then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    // this.$store.commit("DEL_TOKEN");
                    this.$store.dispatch("remove_token");
                    this.$router.push({ path: "/" });
                } else {
                    this.$message.error(res.msg);
                    this.$router.push({ path: "/" });
                }
            });
        }
    },
    created() {
        this.$store.dispatch("sideBar_show", this.ifRow);
    },
    watch: {
        $route(to) {
            this.addTags();
        }
    }
};
</script>
<style lang="less">
.head_img {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.header {
    .user {
        float: right;
        margin-right: 20px;
        height: 64px;
        /deep/.el-dropdown-link {
            display: flex;
            flex-direction: row;
        }
    }
    background-color: #eef1f6;
    display: absolute;
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #ccc;
    .catalog {
        width: 64px;
        height: 64px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            transition: all 0.5s ease;
            width: 32px;
            height: 32px;
            // transform: rotate(90deg);
        }
    }
    .bread {
        line-height: 64px;
        float: left;
        margin-right: 30px;
    }
    .el-tag {
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>


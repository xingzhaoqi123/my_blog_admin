<template>
    <div class="sidebar">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#324157" text-color="#fff" active-text-color="#ffd04b">
            <router-link :to="{path:'home'}">
                <el-menu-item index="1">
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <el-submenu index="2">
                <template slot="title">
                    <span>权限管理</span>
                </template>
                <router-link :to="{path:'permission_list'}">
                    <el-menu-item index="2-1">管理员列表</el-menu-item>
                </router-link>
                <router-link :to="{path:'permission_add'}">
                    <el-menu-item index="2-2">添加管理员</el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <span>文章</span>
                </template>
                <router-link :to="{path:'article_list'}">
                    <el-menu-item index="3-1">文章列表</el-menu-item>
                </router-link>
                <router-link :to="{path:'article_add'}">
                    <el-menu-item index="3-2">添加文章</el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {},
    created() {}
};
</script>

<style lang= 'less' scoped>
/deep/.el-menu {
    border: none;
}
.sidebar {
    background-color: #0b233d;
    overflow-y: auto;
    overflow: hidden;
}
</style>

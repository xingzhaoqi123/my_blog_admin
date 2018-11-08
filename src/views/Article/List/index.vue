<template>
    <article>
        <el-card>
            <div slot="header">
                <span>文章列表</span>
            </div>
            <el-table :data="blogList" border style="width: 100%" class="bottom">
                <el-table-column type="index" fixed="left" align="center" header-align="center" width="70">
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center" header-align="center" width="180">
                </el-table-column>
                <el-table-column prop="desc" label="描述" align="center" header-align="center" width="180">
                </el-table-column>
                <el-table-column prop="sourse" label="来源" align="center" header-align="center" width="180">
                    <template slot-scope="scope">
                        <!-- <el-tag>{{scope.row.sourse == 1 ? '原创':(scope.row.sourse == 2 ?"转载":'翻译')}}</el-tag> -->
                        <el-tag v-show="scope.row.sourse==1">{{'原创'}}</el-tag>
                        <el-tag type="success" v-show="scope.row.sourse==2">{{'转载'}}</el-tag>
                        <el-tag type="warning" v-show="scope.row.sourse==3">{{'翻译'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="author.nickname" label="作者" align="center" header-align="center" width="180">
                </el-table-column>

                <el-table-column prop="updateTime" label="最后更新时间" :formatter="formatDate" align="center" header-align="center" width="180">
                </el-table-column>
                <el-table-column prop="visible" label="是否可见" align="center" header-align="center" width="180">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="220" header-align="center">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row._id)">编辑</el-button>
                        <el-button type="danger" @click="remove(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageindex" :page-size="page_size" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </article>
</template>

<script>
export default {
    data() {
        return {
          
            page_size: 8,
            total: 0,
            pageindex: 1,
            ifShow: false,
            blogList: [
                // {
                //     author:'xing',
                //     title: "第一个标题",
                //     desc: "这是描述",
                //     date: "111",
                //     sourse: "原创",
                //     visible: 1
                // }
            ]
        };
    },
    methods: {
        formatDate(row, column, cellValue) {
            return this.parseTime(cellValue);
        },
        // formatSourse(row, column, cellValue) {
        //     switch (cellValue) {
        //         case 1:
        //             return `原创`;
        //         case 2:
        //             return "转载";
        //         case 3:
        //             return "翻译";
        //     }
        // },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageindex = val;
            this.getBlog();
        },
        getTotal() {
            this.$axios.get("/blog/total").then(res => {
                if (res.code == 200) {
                    this.total = res.total;
                }
            });
        },
        getBlog() {
            let params = {
                page: this.pageindex,
                page_size: this.page_size
            };
            this.$axios.get("/blog/list", params).then(res => {
                if (res.code == 200) {
                    this.blogList = res.data;
                    this.getTotal();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        remove(id) {
            this.$axios.delete(`/blog/${id}`).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.getBlog();
                } else this.$message.error(res.msg);
            });
        },
        edit(id) {
            this.$router.push({
                path: "article_edit",
                query: {
                    id: id
                }
            });
        }
    },
    created() {
        this.getBlog();
    }
};
</script>

<style lang="less" scoped>
/deep/.el-pagination {
    text-align: center;
    margin-top: 20px;
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


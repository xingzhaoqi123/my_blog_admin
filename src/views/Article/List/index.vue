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
                </el-table-column>
                <el-table-column prop="author" label="作者" align="center" header-align="center" width="180">
                </el-table-column>

                <el-table-column prop="date" label="发布时间" align="center" header-align="center" width="180">
                </el-table-column>
                <el-table-column prop="visible" label="是否可见" align="center" header-align="center" width="180">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="220" header-align="center">
                    <template slot-scope="scope">
                        <el-button @click="edit('123')">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageindex" :page-size="page_size" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
        </el-card>
    </article>
</template>

<script>
export default {
    data() {
        return {
             page: 1,
            page_size: 8,
            total:'',
            pageindex: 1,
            ifShow: false,
            blogList: [
                {
                    author:'xing',
                    title: "第一个标题",
                    desc: "这是描述",
                    date: "111",
                    sourse: "原创",
                    visible: 1
                }
            ]
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        edit(id) {
            this.$router.push({
                path: "article_edit",
                query: {
                    id: id
                }
            });
        }
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


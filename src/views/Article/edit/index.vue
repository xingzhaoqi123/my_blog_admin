<template>
    <div>
        <el-card>
            <div slot="header">
                <span>编辑文章</span>
            </div>

            <el-form :model="info" ref="info" :rules="rule">
                <el-form-item label="博客类型" :label-width="formLabelWidth" prop="blogTypes" v-if="info.blogTypes">
                    <el-select style="width:500px" v-model="info.blogTypes" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
                        <el-option v-for="(item,index) in blogTypes" :key="index" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="info.title" autocomplete="off" style="width:500px"></el-input>
                </el-form-item>
                <el-form-item label="文章描述" :label-width="formLabelWidth" prop="desc">
                    <el-input v-model="info.desc" autocomplete="off" style="width:500px"></el-input>
                </el-form-item>
                <el-form-item label="文章内容" :label-width="formLabelWidth" class="editor">
                    <Editor v-model="info.content" :article_content="info.content"></Editor>
                </el-form-item>
                <el-form-item label="文章来源" :label-width="formLabelWidth" prop="sourse">
                    <!-- <el-input v-model="info.sourse" autocomplete="off" style="width:500px"></el-input> -->
                    <el-select v-model="info.sourse" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可见" :label-width="formLabelWidth" prop="isVisible" v-if="info.visible">
                    <el-switch v-model="info.visible" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-button type="primary" @click="update">更新</el-button>
                    <el-button  @click="$router.push({path:'article_list'})">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import Editor from "@/components/quillEditor";
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["blogTypes"])
    },
    components: { Editor },
    data() {
        return {
            rule: {
                isVisible: [
                    {
                        required: true,
                        message: "请选择",
                        trigger: "change",
                        type: "boolean"
                    }
                ],
                blogTypes: [
                    {
                        required: true,
                        message: "请选择至少选择一个文章类型",
                        trigger: "change",
                        type: "array"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: "请填写文章标题",
                        trigger: "blur"
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: "请填写文章描述",
                        trigger: "blur"
                    }
                ],
                sourse: [
                    {
                        required: true,
                        message: "请填写文章描述",
                        trigger: "blur"
                    }
                ]
            },
            options: [
                { name: "原创", id: 1 },
                { name: "转载", id: 2 },
                { name: "翻译", id: 3 }
            ],
            id: "",
            formLabelWidth: "120px",
            info: {}
        };
    },
    methods: {
        update() {
            this.$axios.put(`/blog/${this.id}`, this.info).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.$router.push({ path: "article_list" });
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        getBlog() {
            this.$axios
                .get(`/blog/person/${this.id}`)
                .then(res => {
                    if (res.code == 200) {
                        this.info = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.getBlog();
    }
};
</script>

<style lang="less" scoped>
.editor {
    width: 900px;
}
</style>

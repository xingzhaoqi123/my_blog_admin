<template>
    <div>
        <el-card>
            <div slot="header">
                <span>添加文章</span>
            </div>
            <div>
                <el-form :model="info" ref="info" :rules="rule">
                    <el-form-item label="博客类型" :label-width="formLabelWidth" prop="blogType">
                        <el-select style="width:500px" v-model="info.blogType" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
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
                        <el-select v-model="info.sourse" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可见" :label-width="formLabelWidth" prop="isVisible">
                        <el-switch v-model="info.visible" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <el-button type="primary" @click="xzq">添加</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-card>
    </div>
</template>

<script>
import Editor from "@/components/quillEditor";
import { mapGetters } from "vuex";
export default {
    components: { Editor },
    computed: {
        ...mapGetters(["blogTypes"])
    },
    data() {
        return {
            options: [
                { name: "原创", id: 1 },
                { name: "转载", id: 2 },
                { name: "翻译", id: 3 }
            ],
            formLabelWidth: "120px",
            isEdit: false,
            info: {
                blogType: ["JavaScript"],
                title: "",
                desc: "",
                sourse: 1,
                visible: 1,
                content: ""
            },
            rule: {
                isVisible: [
                    {
                        required: true,
                        message: "请选择",
                        trigger: "change",
                        type: "boolean"
                    }
                ],
                blogType: [
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
            }
        };
    },
    methods: {
        xzq() {
            console.log(this.info);
        }
    },
    created() {}
};
</script>

<style lang="less" scoped>
.editor {
    width: 900px;
}
</style>

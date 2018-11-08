<template>
    <div>
        <quillEditor class="editor" v-model="content" @change="onEditorChange" ref="myQuillEditor" :options="editorOption"></quillEditor>
    </div>
</template>

<script>
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
    components: { quillEditor },
    props: {
        article_content: {
            type: String
        }
    },
    data() {
        return {
            content: "",
            contentText: "",
            formData: {
                token: ""
            },
            editorOption: {
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: "file",
                        action: "https://upload-z1.qiniup.com",
                        response: res => {
                            return res.url;
                        },
                        change: (xhr, formData) => {
                            // xhr.setRequestHeader("myHeader", "myValue");
                            formData.append("token", this.formData.token);
                        }
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            image: function() {
                                QuillWatch.emit(this.quill.id);
                            }
                        }
                    }
                }
            }
        };
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
            this.$emit("input", html);
            this.contentText = text;
        },
        getToken() {
            this.$axios.get("/getToken").then(res => {
                if (res.code == 200) {
                    this.formData.token = res.uptoken;
                }
            });
        }
    },
    created() {
        this.getToken();
        this.content = this.article_content;
    }
};
</script>

<style lang="less" >
.ql-container {
    min-height: 300px;
}
</style>


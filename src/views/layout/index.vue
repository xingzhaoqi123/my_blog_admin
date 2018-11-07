<template>
    <div class="wrapper">
        <el-row class="container">
            <transition name="side">
                <div class="left" ref="left">
                    <sidebar></sidebar>
                </div>
            </transition>
            <transition name="head">
                <div class="right" ref="right">
                    <vHead></vHead>
                    <div class="content">
                        <router-view class="content_detail"></router-view>
                    </div>
                </div>
            </transition>

        </el-row>
    </div>
</template>

<script>
import vHead from "../../components/vheader";
import sidebar from "../../components/sidebar";
import { mapGetters } from "vuex";
export default {
    components: { vHead, sidebar },
    computed: {
        ...mapGetters(["getifShow"])
    },
    methods: {
        turnHead(show) {
            if (show) {
                this.$refs.right.style.marginLeft = "200px";
                this.$refs.left.style.marginLeft = "0";
            } else {
                this.$refs.right.style.marginLeft = "0";
                this.$refs.left.style.marginLeft = "-200px";
            }
        }
    },
    watch: {
        getifShow: function(val) {
            this.turnHead(val);
            // return val;
        }
    }
};
</script>

<style lang="less" >
// .side-enter-active,
// .side-leave-active,
// .head-enter-active,
// .head-leave-active {
//     transition: all .7s ease;
// }

// .side-enter,
// .side-leave-to {
//     transform: translateX(-200px);
// }

// .side-enter-to,
// .side-leave {
//     transform: translateX(0px);
// }
.container {
    overflow: hidden;
    height: 100%;
    display: flex;
}
.content {
    padding: 10px;
}
.left {
    transition: margin-left 0.38s ease;
    background-color: #324157;
    width: 200px;
    height: 100vh;
    position: absolute;
}
.right {
    transition: margin-left 0.38s ease;
    position: relative;
    top: 0;
    right: 0;
    margin-left: 200px;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
}
</style>

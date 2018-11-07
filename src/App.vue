<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style lang="less">
.fll {
    float: left;
}
.flr {
    float: right;
}
.clearfix::after {
    content: "";
    clear: both;
    display: block;
    overflow: hidden;
}
//滚动条的宽度
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
    background-color: #a1a3a9;
    border-radius: 3px;
}
</style>

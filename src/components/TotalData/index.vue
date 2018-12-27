<template>
    <div class="total">
        <el-row>
            <el-col :span="4" class="target">
                <h1>{{totalList.timesOfBrowsing}}</h1>
                <p>浏览次数</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totalList.independentVisitors}}</h1>
                <p>独立访客</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totalList.IP}}</h1>
                <p>IP数量</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totalList.averageAccessDepth}}</h1>
                <p>平均访问深度</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totalList.averageAccessTime}}</h1>
                <p>平均访问时长</p>
            </el-col>
            <el-col :span="4" class="target">
                <h1>{{totalList.bounceRate}}</h1>
                <p>跳出率</p>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'TotalData',
    props: {
        totalList: Object,
        type: true
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.total {
        margin-top: 15px;
        padding: 2em 0;
        background: #fff;
        color: #333;
        .target {
            margin-left: -15px;
            text-align: center;
            h1 {
                font-size: 36px;
                line-height: 1;
                margin-top: 0.2em;
                margin-bottom: 0.2em;
                font-weight: normal;
            }
            p {
                font-size: 20px;
                color: #999;
            }
        }
    }
</style>


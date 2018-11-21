<template>
    <!-- 自定义指标 -->
    <el-card shadow="never"  class="card-item">
        <div slot="header" class="clearfix">
            <el-button class="definetarget">自定义指标</el-button>
        </div>
        <div class="formbody">
            <span class="tip"><i class="el-icon-warning" ></i>最多可同时选择6项指标</span>
            <div class="checkbox">
                <el-checkbox-group 
                    v-model="currenttages" 
                    :min="1"
                    :max="6">
                    <div class="target">
                        <el-button type="text">网站基础指标： </el-button>
                        <el-checkbox label="1">浏览次数</el-checkbox>
                        <el-checkbox label="2">浏览量占比</el-checkbox>
                        <el-checkbox label="3">访问次数</el-checkbox>
                        <el-checkbox label="4">独立访客</el-checkbox>
                        <el-checkbox label="5">新独立访客数</el-checkbox>
                        <el-checkbox label="6">新访客比率</el-checkbox>
                        <el-checkbox label="7">IP数</el-checkbox>
                        <!-- <el-checkbox  v-for="tag in websitetargets" :label="tag.label" :key="tag.value" >{{tag.value}}</el-checkbox> -->
                    </div>
                    <div  class="target">
                        <el-button type="text">流量质量指标： </el-button>
                        <el-checkbox label="8">跳出率</el-checkbox>
                        <el-checkbox label="9">平均访问时长</el-checkbox>
                        <el-checkbox label="10">平均访问深度</el-checkbox>
                        <!-- <el-checkbox  v-for="tag in flowtargets" :label="tag.label" :key="tag.value" >{{tag.value}}</el-checkbox> -->
                    </div>
                </el-checkbox-group>
                <div class="submit">
                    <el-button type="warning" class="submit-btn" @click="handleSubmitTarget">确定</el-button>
                </div>
            </div>
        </div>
    </el-card>
</template>
<script>
// const websitetargetsOption = [
//     { label: '1', value: '浏览次数' },
//     { label: '2', value: '浏览量占比' },
//     { label: '3', value: '访问次数' },
//     { label: '4', value: '访客数' },
//     { label: '5', value: '新访客数' },
//     { label: '6', value: '新访客比率' },
//     { label: '7', value: 'IP数' }
// ]
// const flowtargetsOption = [
//     { label: '8', value: '跳出率' },
//     { label: '9', value: '平均访问时长' },
//     { label: '10', value: '平均访问深度' }
// ]
export default {
    name: 'CustomTagForm',
    data() {
        return {
            // websitetargets: websitetargetsOption,
            // flowtargets: flowtargetsOption,
            currenttages: ['1', '4', '7', '8', '9', '10']
        }
    },
    methods: {
        handleSubmitTarget(currenttages) {
            // let targetLabel = []
            // for (let item in currenttages) {
            //     targetLabel.push(item.label)
            // }
            // console.log(targetLabel)
            this.$emit('handleTagForm', this.currenttages)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.card-item {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    .definetarget {
        background-color: #f75426;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 20px;
        font-size: 1.1em;
        padding-left: 30px;
        padding-right: 30px;
    }
    .formbody {
        .tip {
            display: inline-block;
            margin-bottom: 15px;
            padding: 6px 6em 6px 14px;
            background: #f5f5f5;
            color: #666;
            .el-icon-warning {
                margin-right: 5px
            }
        }
        .form-item {
            margin-bottom: 0;
        }
        .checkbox {
            .target {
                margin-bottom: 5px;
            }
        }
        .submit { 
            text-align: center;
            .submit-btn { background:#f75426 }
        }
    }
}
</style>

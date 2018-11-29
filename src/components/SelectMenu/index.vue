<template>
    <el-select  class="selectdropdown" v-model="defaultvalue" placeholder="选择指示" @change="handleSelectOption">
            <el-option
            v-for="item in targets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="selectoption"
            >
            <el-radio :label='1'>{{ item.label }}</el-radio>
            </el-option>
        </el-select>
</template>
<script>
export default {
    name: 'SelectMenu',
    data() {
        return {
             defaultvalue: '浏览次数',
             targets: [{
                value: '1',
                label: '浏览次数'
            }, {
                value: '2',
                label: '访客次数'
            }, {
                value: '3',
                label: 'IP'
            }, {
                value: '4',
                label: '新独立访客数'
            }, {
                value: '5',
                label: '平均访客深度'
            }, {
                value: '6',
                label: '平均访客时长'
            }, {
                value: '7',
                label: '跳出率'
            }]
        }
    },
    methods: {
        handleSelectOption(target) {
            this.$emit('handleSelect', target)
        }
    }
}
</script>


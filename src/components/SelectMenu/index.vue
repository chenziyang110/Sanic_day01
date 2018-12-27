<template>
<div class="chartbox">
    <!-- <el-select  class="selectdropdown" v-model="defaultvalue" placeholder="选择指示" @change="handleSelectOption">
            <el-option
            v-for="item in targets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="selectoption"
            >
            <el-radio :label='1'>{{ item.label }}</el-radio>
            </el-option>
    </el-select> -->
    <div class="selectradiogroup">
        <div class="selectBox_show">
            <input type="text"  @click="handleDropdown" name="unit" v-model="targetsName" placeholder="请选择">
            <span :class="iconstyle"></span>
        </div>
        <!-- <span class="arrowup"></span> -->
        <el-form ref="form"  :rules="rules" :model="form"  action="" v-show="isShowSelect" class="radioform" style="display: block;">
            <el-form-item prop="targets">
                <el-radio-group  v-model="form.targets" >
                    <el-radio :label="1">浏览次数</el-radio>
                    <el-radio :label="2">访客次数</el-radio>
                    <el-radio :label="3">IP</el-radio>
                    <el-radio :label="4">新独立访客数</el-radio>
                    <el-radio :label="5">平均访客深度</el-radio>
                    <el-radio :label="6">平均访客时长</el-radio>
                    <el-radio :label="7">跳出率</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="submit-box">
                <el-button type="primary" size="small" class="btn-submit btn-sub" @click="submitForm('form')">确定</el-button>
                <el-button  size="small" class="btn-cancel btn-can" @click="handleDropBox">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
    
    
</template>
<script>
export default {
    name: 'SelectMenu',
    data() {
        return {
            // defaultvalue: '浏览次数',
             iconstyle: 'el-icon-arrow-right',
             unitName: '请选择',
             targetsName: '',
             isShowSelect: false,
             form: {
                 targets: 1
             },
             rules: {
                 targets: [
                    { required: true, message: '请至少选择一项', trigger: 'change' }
                ]
             },
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
    created() {
        if (this.form.targets === 1) {
            this.targetsName = '浏览次数'
        }
    },
    methods: {
        handleDropdown() {
            this.isShowSelect = !this.isShowSelect
            if (this.isShowSelect === true) {
                this.iconstyle = 'el-icon-arrow-down'
            } else {
                this.iconstyle = 'el-icon-arrow-right'
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                 this.isShowSelect = !this.isShowSelect
                 switch (this.form.targets) {
                    case 1: this.targetsName = '浏览次数'
                    break
                    case 2: this.targetsName = '访客次数'
                    break
                    case 3: this.targetsName = 'IP'
                    break
                    case 4: this.targetsName = '新独立访客数'
                    break
                    case 5: this.targetsName = '平均访客深度'
                    break
                    case 6: this.targetsName = '平均访客时长'
                    break
                    case 7: this.targetsName = '跳出率'
                    break
                 }
                 let targets = this.form.targets
                 let targetname = this.targetsName
                 this.$emit('handleSelect', this.form.targets)
                //  console.log(this.form.targets)
            } else {
                console.log('error submit!!')
                return false
            }
            })
         },
         targetName() {
             this.targetsName = '浏览次数'
         },
         handleDropBox() {
            this.isShowSelect = !this.isShowSelect
         }
        // handleSelectOption(target) {
        //     this.$emit('handleSelect', target)
        // }
    }
}
</script>
<style lang="scss" scoped>
.chartbox {
    position: relative;
    .selectradiogroup {
        .selectBox_show {
            margin-bottom: 15px;
            width: 235px;
            position: relative;
            span {
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
        input { 
            cursor: pointer;
            line-height: 2;
            padding-left: 15px;
            width: 235px;
            outline:none;
            border:1px solid #cecece;
            color: #012989;
            font-weight: bold;
        }
        .radioform {
            position: absolute;
            padding: 10px 15px;
            z-index: 999;
            // max-height: 240px;
            width: 235px;
            background: #fff;
            border: 1px solid #cecece;
            .el-form-item {
                margin-bottom: 5px;
            }
        }
        .arrowup {
            content: " ";
            width: 0;
            height: 0;
            display: block;
            border-top: 1px solid #555;
            border-left: 1px solid transparent;
        }
        .submit-box {
            margin-bottom: 0;
            text-align: center;
            .btn-submit {
                padding: 6px 12px;
                border-radius: 12px;
            }
            .btn-cancel {
                padding: 6px 12px;
                border-radius: 12px;
                background: #012989;
                color: #fff;
                border-color: #012989;
            }
        }
}

}

</style>



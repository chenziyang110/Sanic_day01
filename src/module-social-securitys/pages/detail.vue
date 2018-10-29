<template>
    <div class="detailBox">
       <div class="detailTop">
          <div>
             <img src="./../../assets/img.jpeg" width="100" height="100" alt="">
          </div>
          <div>
            <p>李飞 <span class="lab">在职</span></p>  
            <p><span>最新工资基数 8000</span><span>入职时间 2018-08-17<span></span>身份证号 130****8767</span></p>
            <p>
              本月不缴纳社保 <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"> </el-switch> 
              本月不缴纳公积金<el-switch v-model="fundValue" active-color="#13ce66" inactive-color="#ff4949"> </el-switch> 
           </p>
          </div>
       </div>
       <div class="detailContentBox">
          <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
            <el-form-item label="参保城市">
              <el-select v-model="sizeForm.region" placeholder="请选择参保城市">
                <el-option label="北京" value="shanghai"></el-option>
                <el-option label="上海" value="beijing"></el-option>
                <el-option label="天津" value="tianjing"></el-option>
                <el-option label="广州" value="guangzhou"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="社保类型">
              <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                <el-option label="首次开户" value="shanghai"></el-option>
                <el-option label="非首次开户" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户籍类型">
              <el-select v-model="sizeForm.region" placeholder="请选择户籍类型">
                <el-option label="本市城镇" value="shanghai"></el-option>
                <el-option label="本市农村" value="beijing"></el-option>
                <el-option label="外阜城镇" value="beijing"></el-option>
                <el-option label="外阜农村" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="社保基数">
              <el-input v-model="sizeForm.region" style="width:38%"></el-input> (基数范围是3387 ~ 25401）
            </el-form-item>
            <el-form-item label="工伤比例">
              <el-input v-model="sizeForm.region" style="width:38%"></el-input>（比例范围是0.2％ ~ 3％，推荐0.2％）
            </el-form-item>
            <el-form-item label="社保缴纳"> 
                <el-form-item label="个人" label-width="74px" style="display:inline-block">
                  <el-input v-model="sizeForm.region"  style="width:100%" placeholder="个人" inline="true"></el-input>
                </el-form-item>
                <el-form-item label="公司" label-width="74px" style="display:inline-block">
                  <el-input v-model="sizeForm.region"  style="width:100%" placeholder="企业" size="small" inline="true"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item label="社保备注">
              <el-input type="textarea" :rows="2" placeholder="1-300字符" v-model="sizeForm.region" style="width:38%"> </el-input>
            </el-form-item>

            <el-form-item label="公积金城市">
              <el-select v-model="sizeForm.region" placeholder="请选择参保城市">
                <el-option label="北京" value="shanghai"></el-option>
                <el-option label="上海" value="beijing"></el-option>
                <el-option label="天津" value="tianjing"></el-option>
                <el-option label="广州" value="guangzhou"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公积金基数">
              <el-input v-model="sizeForm.region" style="width:38%"></el-input>（基数范围是2273 ~ 25401。低于下限时，按照下限计算；高于上限时，按照上限计算）
            </el-form-item>
            <el-form-item label="企业比例">
              <el-input v-model="sizeForm.region" style="width:38%" placeholder="12"></el-input>（比例范围是5％ ~ 12％，推荐12％ ）
            </el-form-item>
            <el-form-item label="个人比例">
              <el-input v-model="sizeForm.region" style="width:38%" placeholder="12"></el-input>（比例范围是5％ ~ 12％，推荐12％ ）
            </el-form-item>
            <el-form-item label="公积金缴纳">
                <el-form-item label="个人" style="display:inline-block">
                  <el-input v-model="sizeForm.region"  style="width:100%" placeholder="个人" inline="true"></el-input>
                </el-form-item>
                <el-form-item label="公司" style="display:inline-block">
                  <el-input v-model="sizeForm.region"  style="width:100%" placeholder="企业" size="small" inline="true"></el-input>（为自动测算结果，可手动调整）
                </el-form-item>
            </el-form-item>
            <el-form-item label="公积金备注">
              <el-input type="textarea" :rows="2" placeholder="1-300字符" v-model="sizeForm.region" style="width:38%"> </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存更新</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
       </div>
    </div>
</template>

<script>

export default {
  name: 'detailSocial',
  data() {
    return {
      sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        value: true,
        fundValue: true
    }
  },
  methods: {
    onSubmit() {
        console.log('submit!')
      }
  },
  mounted() {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detailBox{
  margin: 20px;
  .detailTop{
    background: #fff;
    padding: 15px;
    display: flex;
    img{
      border-radius:50%;
      margin-right: 40px;
      box-shadow: 1px 2px 4px #cccccc;
    }
  }
  .detailContentBox{
    margin: 15px 0;
    padding: 15px;
    background: #fff;
  }
}
</style>

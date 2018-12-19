<template>
    <div class="dashboard-container">
        <div class="top-total">
            <el-row>
                <el-col :span="7"><span class="number">{{hopmapdata.total}}</span>页面点击数</el-col>
                <el-col :span="7"><span class="number">{{hopmapdata.timesOfBrowsing}}</span>浏览量</el-col>
                <el-col :span="7"><span class="number">{{hopmapdata.independentVisitors}}</span>访客数</el-col>
            </el-row>
        </div>
        <div class="search">
            <el-form :inline="true" >
                <el-form-item class="formitem subtitle" label="时间：">
                    <div class="radios">
                        <el-radio-group  v-model="range" @change="handleData">
                            <el-radio-button label="0">今天</el-radio-button>
                            <el-radio-button label="1">昨天</el-radio-button>
                            <el-radio-button label="7">最近7日</el-radio-button>
                            <el-radio-button label="30">最近30日</el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item  class="formitem subtitle" label="日期：">
                    <el-date-picker
                        v-model="date"
                        @change="handleData"
                        type="date"
                        format= "yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class="hotmap">
            <iframe  v-bind:src="hotmapurl" width="100%" height="800px"   frameborder="1/0"  name="iframe名称"  scrolling="yes/no/auto">   </iframe>
            <div id="heatmap" style="width:100%;height:800px;"></div>
        </div>
    </div>
    
</template>
<script>
import {visitedhotmap} from '@/api/base/visited'
import echarts from 'echarts'
import Heatmap from 'heatmap.js'
import resize from './../../components/Charts/mixins/resize'

export default {
    name: 'visited-hotmap',
    data() {
        return {
            hotmapID: '',
            range: '1',
            date: '',
            hopmapdata: {},
            hotmapurl: '',
            heatdata: [],
            chart: null
        }
    },
    created() {
        this.hotmapID = this.$route.params.id
        this.hotmapurl = this.$route.params.url
        this.setupHotMapData()
    },
    methods: {
        // 业务请求
        async doQueryHotMap(id = this.hotmapID, range, date) {
            this.loading = true
            await visitedhotmap({
                id, range, date
            }).then(res => {
                this.hopmapdata = res.data
                this.heatdata = res.data.data

                // let newheatData = []
                // for (let i = 0; i < this.heatdata.length; i++) {
                //     newheatData[i] = [this.heatdata[i].x, this.heatdata[i].y, this.heatdata[i].value]
                // }
                // let xData = []
                // for (let j = 0; j < this.heatdata.length; j++) {
                //     xData.push(this.heatdata[j].x)
                // }
                // let yData = []
                // for (let j = 0; j < this.heatdata.length; j++) {
                //     yData.push(this.heatdata[j].y)
                // }

                // 创建一个heatmap实例对象
                // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
                var heatmapInstance = Heatmap.create({
                    container: document.getElementById('heatmap')
                })
                // 构建一些随机数据点,网页切图价格这里替换成你的业务数据
                var max = 120
                var width = 100 + '%'
                var height = 800
                // var len = 200
                var data = {
                    max: max,
                    data: this.heatdata
                }
                // 因为data是一组数据,web切图报价所以直接setData
                heatmapInstance.setData(data)
                
            })
            this.loading = false
        },
        // 初始数据
        async setupHotMapData() {
            await this.doQueryHotMap()
        },
        handleData(id = this.hotmapID, range, date) {
            this.doQueryHotMap(id, range, date)
        }
    },
    mounted() {
        
    }

}
</script>
<style lang="scss" scoped>
.top-total {
  padding: 6px 20px;
  font-size: 20px;
  line-height: 2.5;
  background: #04166c;
  color: #5d8aec;
  .number {
    padding-right: 5px;
    font-size: 32px;
    color: #fff;
  }
}
.search {
  padding: 6px 20px;
  background: #ebeff5;
  box-shadow: 2px 2px 5px #e4e2e2;
  .formitem {
    padding: 10px 0;
    margin-bottom: 0;
  }
}
.hotmap {
    iframe {
        position: absolute;
        left: 0;
        border: none;
    }
}
#heatmap {
    position: relative;
    img {
        position: absolute;
    }
}
</style>


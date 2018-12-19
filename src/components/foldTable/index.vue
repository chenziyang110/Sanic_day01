<template>
    <div class="foldtable">
        <el-table  :data="tableList" :row-class-name="setClassName" >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="props.row.items"
                        class="innertable"
                        style="width: 100%">
                        <el-table-column label="来源类型" prop="source" >
                            <template slot-scope="scope">
                                <span style="float:left">{{scope.row.source}}</span>
                                <el-popover trigger="hover" placement="right">
                                    <span @click="handleGoSeDetail(scope.row.$index, scope.row.sourceID)">查看历史趋势</span>
                                    <div slot="reference" class="name-wrapper">
                                        <i class="fa fa-file-text iconlink"></i>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="浏览次数"  prop="timesOfBrowsing" v-if="showColumes[0]"> </el-table-column>
                        <el-table-column prop="browsingVolume" label="浏览量占比" v-if="showColumes[1]"></el-table-column>
                        <el-table-column prop="timesOfVisite" label="访问次数" v-if="showColumes[2]"></el-table-column>
                        <el-table-column prop="independentVisitors" label="独立访客" v-if="showColumes[3]"></el-table-column>
                        <el-table-column prop="independentNewVisitors" label="新独立访客数" v-if="showColumes[4]"></el-table-column>
                        <el-table-column prop="independentNewVisitorsRate" label="新独立访比率" v-if="showColumes[5]"></el-table-column>
                        <el-table-column prop="IP" label="IP" v-if="showColumes[6]"></el-table-column>
                        <el-table-column prop="bounceRate" label="跳出率" v-if="showColumes[7]"></el-table-column>
                        <el-table-column prop="averageAccessDepth" label="平均访问深度" v-if="showColumes[8]"></el-table-column>
                        <el-table-column prop="averageAccessTime" label="平均访问时长" v-if="showColumes[9]"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="source" label="来源类型">
                <template slot-scope="scope">
                    <span style="float:left">{{scope.row.source}}</span>
                    <el-popover trigger="hover" placement="right">
                        <span @click="handleGoSeDetail(scope.row.$index, scope.row.sourceID)">查看历史趋势</span>
                        <div slot="reference" class="name-wrapper">
                            <i class="fa fa-file-text iconlink"></i>
                        </div>
                    </el-popover> 
                </template> 
            </el-table-column>
            <el-table-column prop="timesOfBrowsing" label="浏览次数" v-if="showColumes[0]"></el-table-column>
            <el-table-column prop="browsingVolume" label="浏览量占比" v-if="showColumes[1]"></el-table-column>
            <el-table-column prop="timesOfVisite" label="访问次数" v-if="showColumes[2]"></el-table-column>
            <el-table-column prop="independentVisitors" label="独立访客" v-if="showColumes[3]"></el-table-column>
            <el-table-column prop="independentNewVisitors" label="新独立访客数" v-if="showColumes[4]"></el-table-column>
            <el-table-column prop="independentNewVisitorsRate" label="新独立访比率" v-if="showColumes[5]"></el-table-column>
            <el-table-column prop="IP" label="IP" v-if="showColumes[6]"></el-table-column>
            <el-table-column prop="bounceRate" label="跳出率" v-if="showColumes[7]"></el-table-column>
            <el-table-column prop="averageAccessDepth" label="平均访问深度" v-if="showColumes[8]"></el-table-column>
            <el-table-column prop="averageAccessTime" label="平均访问时长" v-if="showColumes[9]"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'foldTable',
  props: ['tableList', 'showColumes'],
  data() {
    return {
        readmore: false
        // showColumes: [true, false, false, true, false, false, true, true, true, true]
    }
  },
  methods: {
        setClassName({row, index}) {
            // 通过自己的逻辑返回一个class或者空
            return row.expand ? 'expand' : 'hiddencell'
        },
        // 去往详情页
        handleGoSeDetail(index, sourceID) {
            console.log(12333)
            this.$router.push({
                path: '/source/sedetail',
                name: 'source-sedetail',
                params: { 
                    id: 'id',
                    dataObj: sourceID
                }
            })
        },
        handleEnter() {
            this.readmore = true
        },
        // 父级跳转
        handleSourceLink(index, sourceID) {
            if (this.$route.path === '/source/domain') {
                this.$router.push({
                    path: '/source/page',
                    name: 'source-page',
                    params: { 
                        id: 'id',
                        dataObj: sourceID
                    }
                })
            } else if (this.$route.path === '/visited/visiteddomain') {
                this.$router.push({
                    path: '/visited/visitedpage',
                    name: 'visited-page',
                    params: { 
                        id: 'id',
                        dataObj: sourceID
                    }
                })
            } else if (this.$route.path === '/source/type') {
                this.$router.push({
                    path: '/source/domain',
                    name: 'source-domain',
                    params: { 
                        id: 'id',
                        dataObj: sourceID
                    }
                })
            }
        }
  }
}
</script>
<style lang="scss" scoped>
.foldtable {
    .iconlink {
        position: relative;
        float: right;
        line-height: 1.6;
        cursor: pointer;
        color: #5784e7;
    }
}

</style>



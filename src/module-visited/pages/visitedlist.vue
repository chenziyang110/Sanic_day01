<template>
    <div class="dashboard-container">
        <el-card class="card-head">
            <h2 class="title">页面点击列表（{{defaultdate}}）</h2>
            <el-form ref="searchform" :model="formSearch">
                <el-input  placeholder="请输入" v-model="formSearch.keyword" style="width: 200px;"></el-input>
                <el-button type="warning" class="filter-item" size="medium"  @click="handleSearch">搜索</el-button>
            </el-form>
        </el-card>
        <el-card shadow="never" v-loading="loading" class="card-item">
            <div class="tablestyle">
                <el-table :data="visitedlistData.items">
                     <el-table-column prop="title" label="点击图名称"></el-table-column>
                     <el-table-column prop="description" label="页面范围"></el-table-column>
                     <el-table-column prop="url" label="预览页面">
                         <template slot-scope="scope">
                            <span><a :href="scope.row.url">{{scope.row.url}}</a></span>
                        </template>
                     </el-table-column>
                     <el-table-column prop="stateTitle" label="状态"></el-table-column>
                     <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button class="operate-btn" type="text" size="small" @click="handleRouterMap(scope.$index, scope.row.id, scope.row.url)"><a>查看点击图</a></el-button>
                            <span>|</span>
                            <el-button 
                                v-if= " scope.row.stateTitle === '关闭' " 
                                @click="handleChangeState(scope.row.id, true)" 
                                class="operate-btn" 
                                type="text" 
                                size="small"><a>开启</a>
                            </el-button>
                            <el-button v-if= "scope.row.stateTitle === '统计中' "  @click="handleChangeState(scope.row.id, false)"  class="operate-btn" type="text" size="small"><a>关闭</a></el-button>
                        </template>
                        </el-table-column>
                </el-table>
                <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                </el-pagination>
            </div>
        </el-card>
        
    </div>
</template>
<script>
import {visitedlist, visitedswitch, visitedhotmap} from '@/api/base/visited'
export default {
    name: 'visited-list',
    data() {
        return {
            loading: false,
            defaultdate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            visitedlistData: {},
            keyword: '',
            formSearch: {
                keyword: ''
            },
            pagination: {
                total: 0,
                pageSize: 20,
                pageSizes: [10, 20, 40],
                currentPage: 1
            },
            switchtext: ''
        }
    },
    methods: {
        // 业务请求
        async doQueryVisitedList(page = 1, pagesize = 20) {
            this.pagination.currentPage = page
            this.pagination.pagesize = pagesize
            this.loading = true
            this.totaldata = {}
            await visitedlist({
               ...this.formSearch,
               page,
               pagesize
            }).then(res => {
                this.visitedlistData = res.data
                this.pagination.total = res.data.counts
            })
            this.loading = false
        },
        // 业务请求：关闭开启状态
        async doQueryState(id, disabled) {
            this.loading = true
            this.totaldata = {}
            await visitedswitch({
               id, disabled
            }).then(res => {
                this.loading = false
            })
            this.loading = false
        },
        // 初始数据
        async setupvisitedlistData() {
            await this.doQueryVisitedList()
        },
        // 交互操作
        handleSearch() {
            this.doQueryVisitedList()
        },
        // 页尺寸
        handleSizeChange(val) {
            this.doQueryVisitedList(1, val)
        },
        // 页码切换
        handleCurrentChange(val) {
            this.doQueryVisitedList(val, this.pagination.pageSize)
        },
        handleRouterMap(index, id, url) {
             this.$router.push({
                path: '/visited/visitedhotmap',
                name: 'visited-hotmap',
                params: {
                    id: id,
                    url: url
                }
            })
        },
        // 状态改变
        handleChangeState(id, disabled) {
           this.doQueryState(id, disabled)
           
        }
    },
    mounted() {},
    created() {
        this.setupvisitedlistData()
    }
}
</script>
<style lang="scss"  scoped>
.dashboard-container {
    .card-item {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .filter-item {
        background: #f75426;
        color: #fff
    }
    .title {
        font-size: 20px;
        color: #012989;
        font-weight: normal;
    }
    a {color: #3d8ddf;}
    .operate-btn {
        span {color: #3d8ddf;}
    }
}
</style>



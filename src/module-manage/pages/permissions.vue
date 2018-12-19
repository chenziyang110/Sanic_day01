<template>
  <div class="dashboard-container">
    <!-- 搜索框 -->
    <el-card shadow="never">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="权限组名称">
          <el-input placeholder="请输入" style="width: 200px;" class="filter-item" v-model="formSearch.keyword">
          </el-input>
        </el-form-item>
        <el-button class="filter-item" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button class="filter-item fr" size="small" @click="handleNew" type="primary" icon="el-icon-plus">新增</el-button>
        <!-- 提示条 -->
        <el-alert v-if="barSearch.alertText !== ''" :title="barSearch.alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
      </el-form>
    </el-card>
    <!-- 搜索框 / -->
    <!-- 正文 -->
    <div class="app-container">
      <el-card shadow="never" v-loading="loading"  class="backmanage">
        <!-- 数据表格 -->
        <el-table :data="items" border style="width: 100%; margin-top:10px;">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="title" label="名称"></el-table-column>
          <el-table-column prop="create_date" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
        </el-pagination>
        <!-- 数据表格 / -->
      </el-card>
    </div>
    <!-- 正文 / -->
    <!-- 弹出窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" v-loading="dialogLoading">
      <el-form :rules="rules" ref="dataForm" :model="formData" label-width="100px" label-position="right">
        <el-form-item label="名称" prop="title">
          <el-input v-model="formData.title" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="权限分配">
          <el-tree :data="dataTree" show-checkbox="" default-expand-all="" node-key="id" ref="tree" highlight-current>
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSave(false)">取 消</el-button>
        <el-button type="primary" @click="handleSave(true)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出窗 / -->
  </div>
</template>

<script>
import {list, add, update, remove, detail} from '@/api/base/permissions'
import {list as menuList} from '@/api/base/menus'

export default {
  name: 'manage-permissions-index',
  data() {
    return {
      // 工具栏
      formSearch: {
        keyword: ''
      },
      barSearch: {
        alertText: ''
      },
      // 数据表
      items: [],
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: false,
      multipleSelection: [], // 多行选择
      dialogVisible: false,
      // 弹出窗口
      dataTree: [], // 菜单列表
      dialogTitle: '',
      dialogLoading: false,
      formData: [],
      rules: {
        title: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 业务方法
    async doQuery(page = 1, limit = 20) {
      this.pagination.currentPage = page
      this.pagination.pageSize = limit
      this.loading = true
      this.barSearch.alertText = ''
      this.items = []
      await list({
        ...this.formSearch,
        page,
        limit
      }).then(res => {
        this.items = res.data.items
        this.pagination.total = res.data.counts
        this.barSearch.alertText = `共 ${this.pagination.total} 条记录`
      })
      this.loading = false
    },
    // 初始数据
    async setupData() {
      let items = await menuList({}).then(res => res.data)
      let dataTree = []
      this.toTree(items, dataTree, false)
      await this.doQuery()
      this.dataTree = dataTree
      // console.log(dataTree)
    },
    // 转显示树
    toTree(dataList, dataTree, isPoint) {
      for (let it of dataList) {
        let navNode = {
          id: it.id,
          label: isPoint ? '☝' + it.title : '' + it.title,
          isPoint
        }
        if (it.childs !== undefined && it.childs.length > 0) {
          navNode.children = []
          this.toTree(it.childs, navNode.children, false)
        } else if (it.points !== undefined && it.points.length > 0) {
          navNode.children = []
          this.toTree(it.points, navNode.children, true)
        }
        dataTree.push(navNode)
      }
    },
    // UI方法
    // 搜索
    handleSearch() {
      this.doQuery()
    },
    // 也尺寸
    handleSizeChange(val) {
      this.doQuery(1, val)
    },
    // 页码切换
    handleCurrentChange(val) {
      this.doQuery(val, this.pagination.pageSize)
    },
    // 新建
    handleNew() {
      this.dialogTitle = '新建'
      this.formData = {
        title: '',
        permissions: []
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs.tree.setCheckedKeys([])
      })
    },
    // 修改
    async handleEdit(item) {
      this.dialogLoading = true
      this.dialogTitle = '修改'
      await detail({id: item.id}).then(res => {
        this.formData = res.data
      })
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs.tree.setCheckedKeys(this.formData.permissions)
      })
      this.dialogLoading = false
    },
    // 保存
    handleSave(isSave) {
      if (isSave) {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.formData.permissions = this.$refs.tree.getCheckedKeys()
            this.dialogLoading = true
            if (this.formData.id === undefined) {
              add(this.formData).then(res => {
                this.dialogLoading = false
                this.dialogVisible = false
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
              })
            } else {
              update(this.formData).then(res => {
                this.dialogLoading = false
                this.dialogVisible = false
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              })
            }
          } else {
            return false
          }
        })
      } else {
        this.dialogVisible = false
      }
    },
    // 删除
    handleDelete(item) {
      this.$confirm('确认删除？').then(ret => {
        remove({id: item.id}).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    }
  },
  created() {
    this.setupData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>

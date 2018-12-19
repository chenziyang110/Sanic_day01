<template>
  <div class="dashboard-container">
    <!-- 搜索框 -->
    <el-card shadow="never">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label=""></el-form-item>
        <el-button class="filter-item fr" size="small" @click="handleNew" type="primary" icon="el-icon-plus">新增</el-button>
      </el-form>
    </el-card>
    <!-- 搜索框 / -->
    <!-- 正文 -->
    <div class="app-container">
      <el-card shadow="never" v-loading="loading"  class="backmanage">
        <!-- 数据表格 -->
        <el-table :data="items" border style="width: 100%; margin-top:10px;">
          <el-table-column prop="title" label="名称">
            <template slot-scope="scope">
              <span v-bind:style="{marginLeft: scope.row.layer * 20 + 'px'}"></span>
              <i class="el-icon-caret-bottom" v-if="scope.row.childsCount > 0"></i>
              <i class="el-icon-document" v-if="scope.row.childsCount === 0 && !scope.row.isPoint"></i>
              <i class="el-icon-view" v-if="scope.row.isPoint"></i>
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="代码"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 数据表格 / -->
      </el-card>
    </div>
    <!-- 正文 / -->
    <!-- 弹出窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" v-loading="dialogLoading">
      <el-form :rules="rules" ref="dataForm" :model="formData" label-width="100px" label-position="right">
        <el-form-item label="类型" prop="isPoint">
          <el-radio-group v-model="formData.isPoint">
            <el-radio :label="false">菜单</el-radio>
            <el-radio :label="true">权限点</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级菜单" prop="pid">
          <!-- <el-cascader :options="menusTree" v-model="formData.pid" :show-all-levels="false">
          </el-cascader> -->
          <el-select v-model="formData.pid" placeholder="父级">
            <el-option v-for="item in items" :key="item.id" :label="item.title" :value="item.id" v-if="!item.isPoint" :disabled="item.childsCount > 0">
              <template slot-scope="scope">
                <span v-bind:style="{marginLeft: item.layer * 20 + 'px'}"></span>
                <i class="el-icon-caret-bottom" v-if="item.childsCount > 0"></i>
                <i class="el-icon-document" v-if="item.childsCount === 0 && !item.isPoint"></i>
                <span>{{item.title}}</span>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码" prop="code">
          <el-input v-model="formData.code" placeholder="代码"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="标题"></el-input>
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
import {list, add, update, remove, detail} from '@/api/base/menus'

export default {
  name: 'manage-menus-index',
  data() {
    return {
      // 工具栏
      formSearch: {},
      // 数据表
      items: [],
      loading: false,
      dialogVisible: false,
      // 弹出窗口
      menusTree: [], // 菜单列表
      dialogTitle: '',
      dialogLoading: false,
      formData: [],
      rules: {
        code: [
          {required: true, message: '请输入代码', trigger: 'blur'},
          {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
        ],
        pid: [{required: true, message: '请选择父级菜单', trigger: 'change'}],
        isPoint: [{required: true, message: '请选择类型', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 读取数据
    async reloadData() {
      let items = await list({}).then(res => res.data)
      let dataTable = []
      let dataTree = []
      let layer = 0
      this.toTable(items, dataTable, layer, false)
      // this.toTree(items, dataTree)
      this.items = dataTable
      // this.menusTree = dataTree
      // console.log(dataTable, dataTree)
    },
    toTable(dataList, dataTable, layer, isPoint) {
      for (let it of dataList) {
        // console.log(
        //   `layer: ${layer} , title: ${it.title} , isPoint: ${isPoint}`
        // )
        dataTable.push({
          id: it.id,
          pid: it.pid,
          code: it.code,
          title: it.title,
          childsCount: it.childs !== undefined ? it.childs.length : 0,
          layer,
          isPoint
        })
        if (it.childs !== undefined) {
          layer++
          this.toTable(it.childs, dataTable, layer, false)
          layer--
        } else if (it.points !== undefined) {
          layer++
          this.toTable(it.points, dataTable, layer, true)
          layer--
        }
      }
    },
    toTree(dataList, dataTree) {
      for (let it of dataList) {
        let navNode = {
          value: it.id,
          label: it.title
        }
        if (it.childs !== undefined && it.childs.length > 0) {
          navNode.children = []
          this.toTree(it.childs, navNode.children)
        }
        dataTree.push(navNode)
      }
    },
    // UI方法
    // 新建
    handleNew() {
      this.dialogTitle = '新建'
      this.formData = {
        isPoint: false,
        pid: null,
        code: '',
        title: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
      })
      this.dialogLoading = false
    },
    // 保存
    handleSave(isSave) {
      if (isSave) {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
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
    this.reloadData()
  }
}
</script>

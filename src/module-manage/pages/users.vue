<template>
  <div class="dashboard-container">
    <!-- 搜索框 -->
    <el-card shadow="never">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="姓名、账号">
          <el-input placeholder="请输入" style="width: 200px;" class="filter-item" v-model="formSearch.keyword">
          </el-input>
        </el-form-item>
        <el-button class="filter-item" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button class="filter-item fr" size="small" @click="handleNew" type="primary" icon="el-icon-plus">新增用户</el-button>
        <!-- 提示条 -->
        <el-alert v-if="barSearch.alertText !== ''" :title="barSearch.alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
      </el-form>
    </el-card>
    <!-- 搜索框 / -->
    <!-- 正文 -->
    <div class="app-container">
      <el-card shadow="never" v-loading="loading" class="backmanage">
        <!-- 数据表格 -->
        <el-table :data="items" border style="width: 100%; margin-top:10px;" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="fullName" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="联系电话" ></el-table-column>
          <el-table-column prop="permission_group_title" label="权限组名称"></el-table-column>
          <el-table-column prop="email" label="邮件"></el-table-column>
          <el-table-column prop="disabled" label="屏蔽" width="100">
            <template slot-scope="scope">
              <div class="text-center">
                <i class="el-icon-success success" v-if="!scope.row.disabled"></i>
                <i class="el-icon-error danger" v-if="scope.row.disabled"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="200px" label="操作" >
            <template slot-scope="scope">
              <el-button @click="handelPassword(scope.row)" type="text" size="small">重置密码</el-button>
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
      <!-- 重置密码 -->
      <template v-if="dialogType === 'password'">
        <el-form :rules="rulesPassword" ref="dataForm" :model="formData" label-width="100px" label-position="right">
          <el-form-item label="重置密码" prop="password">
            <el-input v-model="formData.password" placeholder="重置密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleSave(false)">取 消</el-button>
        <el-button type="primary" @click="handelPasswordSave(true)">确 定</el-button>
      </span>
      </template>
      <!-- 重置密码 / -->
      <!-- 用户 -->
      <template v-if="dialogType === 'user'">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-width="100px" label-position="right">
          <el-form-item label="账号" prop="account">
            <el-input v-model="formData.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="fullName">
            <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="权限组" prop="permission_group_id">
            <el-select v-model="formData.permission_group_id" placeholder="权限组">
              <el-option v-for="item in permissions" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮件" prop="email">
            <el-input v-model="formData.email" placeholder="邮件"></el-input>
          </el-form-item>
          <el-form-item label="屏蔽" prop="disabled">
            <el-switch v-model="formData.disabled" active-color={true} inactive-color={false}>
            </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleSave(false)">取 消</el-button>
          <el-button type="primary" @click="handleSave(true)">确 定</el-button>
        </span>
      </template>
      <!-- 用户 / -->
    </el-dialog>
    <!-- 弹出窗 / -->
  </div>
</template>

<script>
import {list, add, update, remove, detail, password} from '@/api/base/users'
import {simple as permissionsList} from '@/api/base/permissions'
import shajs from 'sha.js'

export default {
  name: 'manage-users-index',
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
      permissions: [], // 权限列表
      dialogTitle: '',
      dialogType: '', // user , password
      dialogLoading: false,
      formData: [],
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
        ],
        fullName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        permission_group_id: [
          {required: true, message: '请选择权限组', trigger: 'change'}
        ]
      },
      rulesPassword: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 40, message: '长度在 4 到 40 个字符', trigger: 'blur'}
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
      await permissionsList({}).then(res => {
        this.permissions = res.data.items
      })
      await this.doQuery()
    },
    // UI方法
    // 搜索
    handleSearch() {
      this.doQuery()
    },
    // 行选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 也尺寸
    handleSizeChange(val) {
      this.doQuery(1, val)
    },
    // 页码切换
    handleCurrentChange(val) {
      this.doQuery(val, this.pagination.pageSize)
    },
    // 修改密码
    handelPassword(item) {
      this.dialogType = 'password'
      this.dialogTitle = '新建'
      this.formData = {
        id: item.id,
        password: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handelPasswordSave() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogLoading = true
          password({
            id: this.formData.id,
            password: shajs('sha256')
              .update(this.formData.password)
              .digest('hex')
          }).then(res => {
            this.dialogLoading = false
            this.dialogVisible = false
            this.$message({
              message: '重置密码成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    // 新建
    handleNew() {
      this.dialogType = 'user'
      this.dialogTitle = '新建'
      this.formData = {
        account: '',
        fullName: '',
        mobile: '',
        permission_group_id: null,
        avatar: '',
        email: '',
        disabled: false
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改
    async handleEdit(item) {
      this.dialogType = 'user'
      this.dialogTitle = '修改'
      this.dialogLoading = true
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

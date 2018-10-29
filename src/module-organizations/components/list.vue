<template>
  <div class="add-form">
    <el-dialog :title="treeBase.text" :visible.sync="dialogTableVisible">
      <div  class="searchInfo">
        <el-input
          placeholder="搜索"
          v-model="keyword"
              clearable
              @keyup.enter.native='dataSearch(itemes,index)' class="inputW">
          </el-input>
      </div>
      <div style="height:300px;overflow-y: scroll;">
      
      <el-table :data="tables" fit highlight-current-row style="width: 100%;" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="id" label="序号" width="50" align='center'></el-table-column>
          <el-table-column sortable prop="fullName" label="姓名" width="220"></el-table-column>
          <el-table-column sortable prop="mobilePhone" label="手机号"></el-table-column>
          <el-table-column prop="workNumber" label="工号" width="120"></el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形势" width="200"></el-table-column>
        </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <PageTool :paginationPage="requestParameters.page" :total="counts" :paginationPagesize="requestParameters.pagesize" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSimple" v-if="multipleSelection.length>0">调整</el-button>
        <el-button disabled v-if="multipleSelection.length===0">调整</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
      
    </el-dialog>
    <el-dialog title="调整部门" :visible.sync="dialogForm" width="30%">
        <el-form :model="formBase">
          <el-form-item label="调整后部门">
          <el-input
            placeholder="请选择"
            v-model="department"
            icon="caret-bottom"
            class="inputW"
            
            @click.native="isShowSelect = !isShowSelect">
          </el-input>
          <el-tree v-if="isShowSelect"
            :expand-on-click-node="false"
            :data="treeBase.inspectionObjectOptions"
            :props="treeBase.defaultProps"
            default-expand-all
              :filter-node-method="filterNode" 
            @node-click="handleNodeClick"
            class="objectTree"
            ref="tree2">
          </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleBtn" v-if="department!==''">确 定</el-button>
          <el-button disabled v-if="department===''">确 定</el-button>
          <el-button @click="dialogForm = false">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import PageTool from '@/components/page/page-tool'
import { add, organList, changeDept } from '@/api/base/organizations'
import { list } from '@/api/base/employees'
var _this = null
export default {
  name: 'list',
  props: ['treeBase'],
  components: {
    PageTool
  },
  data() {
    return {
      PageTool: 'PageTool',
      dataList: [],
      simpleData: [],
      multipleSelection: [],
      counts: '',
      department: '',
      isShowSelect: false,
      dialogTableVisible: false,
      dialogForm: false,
      keyword: this.keyword,
      requestParameters: {
        // id: '',
        page: 1,
        pagesize: 10
      },
      formBase: {
        ids: [],
        deptID: ''
      }
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.keyword
      if (search) {
        return this.dataList.items.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.dataList.items
    }
  },
  methods: {
    // 业务方法
    // 弹层显示
    dialogFormV(Id) {
      this.dialogTableVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogTableVisible = false
    },
    // 退出
    handleClose() {
      this.dialogFormH()
      this.formData = {}
    },
    // 未分配员工列表
    doQuery() {
      if (this.treeBase.hasDept === 0) {
        this.$set(this.requestParameters, 'hasDept', '0')
        list(this.requestParameters)
          .then(data => {
            this.dataList = data.data
            this.counts = data.data.counts
          })
          .catch(e => {
            this.$message.e('错了哦，这是一条错误消息')
          })
      } else {
        this.$set(
          this.requestParameters,
          'department',
          this.treeBase.departmentId
        )
        list(this.requestParameters)
          .then(data => {
            this.dataList = data.data
            this.counts = data.data.counts
          })
          .catch(e => {
            this.$message.e('错了哦，这是一条错误消息')
          })
      }
    },
    // 调整部门确定
    handleBtn() {
      changeDept(this.formBase)
        .then(() => {
          this.$message.success('部门调整成功')
          this.dialogForm = false
          this.treeBase.inspectionObjectOptions = []
          this.$emit('simpleBase')
          this.dialogFormH()
        })
        .catch(e => {
          this.$message.error('调整部门失败')
        })
    },

    // 界面交互
    handleSelectionChange(val) {
      this.multipleSelection = val
      var ids = []
      this.multipleSelection.forEach(function(item) {
        ids.push(item.id)
      })
      this.formBase.ids = ids
    },
    // 每页显示信息条数
    handleSizeChange(pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        _this.doQuery(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      this.doQuery()
    },
    dataSearch() {
      this.doQuery(this.requestParameters)
    },
    // 清楚搜索
    handleClear() {
      this.doQuery()
    },
    // 调整
    handleSimple() {
      this.dialogForm = true
      this.$emit('simpleBase')
    },
    // 调整后部门选择
    handleNodeClick(data) {
      this.department = data.name
      this.formBase.deptID = data.id
      this.isShowSelect = false
    },
    filterNode(value, data) {
      this.$emit('filterNode')
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    _this = this
  },
  // 组件更新
  updated: function() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div ref="rootNode" :class="generalClassNode">

      <div :class="generalClass" :style="{'cursor':changeFlag?'pointer':'auto'}">
        
        <span  @click="toggle">
        <span v-if="treeRoot.children!==undefined">
          <span v-if="treeRoot.children.length===0">
          <i class="fa fa-male" aria-hidden="true"></i>
          <span>{{treeRoot.name}}</span>
          <span>({{treeRoot.employeeCount}}人)</span>
          </span>
          <span v-else>
            <i class="fa fa-plus-square-o" v-if="isFolder && !open"></i>
            <i class="fa fa-minus-square-o" v-else></i>
            <span><strong>{{treeRoot.name}}</strong></span>
          <span><strong>({{treeRoot.employeeCount}}人)</strong></span>
          </span>
        </span>
        </span>
        
        <div class="fr">
          <div class="treeRinfo">
            <span>{{treeRoot.manager}}</span>
            <span>在职  <em class="colGreen" title="在职人数">{{treeRoot.employeeCount}}</em>&nbsp;&nbsp;(<em class="colGreen" title="正式员工">{{treeRoot.officialCount}}</em>&nbsp;/&nbsp;<em class="colRed" title="非正式员工">{{treeRoot.unofficialCount}}</em>)</span>
          </div>     
          <span class="treeRinfo">
            <el-dropdown class="item">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="handlAdd(treeRoot.id,2)">添加子部门</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="handleEdit(treeRoot.id)">编辑部门</el-button>
                  </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="handleList(treeRoot,1)">查看员工</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="handleMove(treeRoot.id)">移动部门</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="handleDelete(treeRoot)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
        
      </div>
      <!-- <div v-if="isGeneral===0" class="centerline" :style="{width:centerlineWidth+'px',marginLeft:centerlineLeft+'px'}"></div> -->
      <recursive-component-tree v-show="open" v-for="item of treeRoot.children" :key="item.id" v-if="treeRoot.children" :tree-root="item" :changeFlag="changeFlag" ></recursive-component-tree>
      <!-- 新增员工弹层 -->
      <component v-bind:is="organizationAdd" ref="addUser" :treeBase='treeBase' @getObj='getObj'>
      </component>
      <!-- 待分配员工 -->
      <component v-bind:is="organizationList" ref="list" :treeBase='treeBase' @simpleBase='simpleBase' @filterNode='filterNode'>
      </component>
      <!-- 移动部门 -->
      <el-dialog title="移动部门" :visible.sync="moveFormShow" width="30%">
        <el-form :model="formBase">
          <el-form-item label="上级部门">
          <el-input
            placeholder="请选择"
            v-model="treeBase.department"
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
          <el-button type="primary" @click="MoveBtn" v-if="treeBase.department!==''">确 定</el-button>
          <el-button disabled v-if="treeBase.department===''">确 定</el-button>
          <el-button @click="moveFormShow = false">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
 
<script>
import organizationAdd from './add'
import organizationList from './list'
import { detail, organList, moveDept, remove } from '@/api/base/organizations'
export default {
  name: 'recursive-component-tree',
  components: {
    organizationAdd,
    organizationList
  },
  // props: {
  //   treeRoot: Array,
  //   changeFlag: Boolean,
  //   parentId: ''
  // },
  props: ['treeRoot', 'changeFlag', 'parentId'],
  data() {
    return {
      organizationAdd: 'organizationAdd',
      organizationList: 'organizationList',
      generalClass: 'generalClass',
      rootClassNode: 'rootClassNode',
      generalClassNode: 'generalClassNode',
      centerlineWidth: 0,
      centerlineLeft: 0,
      open: true,
      moveFormShow: false,
      isShowSelect: false,

      formBase: {
        id: '',
        parentId: ''
      },
      treeBase: {
        organId: '',
        text: '',
        hasDept: '',
        departmentName: '',
        department: '',
        departmentId: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        inspectionObjectOptions: []
      }
    }
  },
  updated() {},
  mounted() {},
  computed: {
    // isGeneral: function() {
    //   return this.treeRoot.grade
    // }
  },
  methods: {
    // 业务方法
    getObj(params) {
      this.$emit('getObject')
    },
    // 组织结构下来数据
    simpleBase() {
      organList().then(ret => {
        this.treeBase.inspectionObjectOptions.push(ret.data.items)
      })
    },
    MoveBtn() {
      // console.log(this.formBase)
      moveDept(this.formBase)
        .then(() => {
          this.$message.success('移动部门成功')
          this.moveFormShow = false
          this.treeBase.inspectionObjectOptions = []
          this.treeBase.department = ''
          location.reload()
        })
        .catch(e => {
          this.$message.error('移动部门失败')
        })
    },
    // 界面交互
    // 移动部门选择
    handleNodeClick(data) {
      this.treeBase.department = data.name
      this.formBase.parentId = data.id
      this.isShowSelect = false
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    isFolder() {
      return this.treeRoot.children
    },
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    // 添加部门
    handlAdd(Id, num) {
      this.$refs.addUser.dialogFormV(Id, num)
      this.treeBase.text = '添加部门'
    },
    // 编辑
    handleEdit(Id) {
      this.treeBase.organId = Id
      this.$refs.addUser.dialogFormV(Id)
      this.treeBase.text = '编辑部门'
      this.$refs.addUser.getObjInfo(Id)
    },
    // 待分配员工
    handleList(treeRoot, num) {
      this.treeBase.organId = treeRoot.parentId
      this.treeBase.hasDept = num
      this.treeBase.departmentId = treeRoot.id
      if (num === 0) {
        this.treeBase.text = '传智播客的员工'
      } else {
        this.treeBase.departmentName = treeRoot.name
        this.treeBase.text = treeRoot.name + '部门的员工'
      }
      this.$refs.list.dialogFormV(treeRoot.parentId)
      this.$refs.list.doQuery()
    },
    // 删除
    handleDelete(item) {
      if (item.children.length > 0) {
        this.$confirm('请先删除部门下的子部门!', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
        return false
      } else {
        this.$confirm(
          '您确定删除该部门吗？' +
            '部门删除后，原部门下员工将被重置为无部门状态',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            remove({ id: item.id }).then((ret, err) => {
              if (err) {
                this.$Message.error('删除失败!')
                return false
              } else {
                this.$message.success('删除成功' + '!')
                location.reload()
              }
            })
          })
          .catch(() => {
            this.$message.info('已取消操作!')
          })
      }
    },
    // 移动部门
    handleMove(id) {
      this.formBase.id = id
      this.moveFormShow = true
      this.simpleBase()
    }
  },
  // 创建完毕状态
  created: function() {}
}
</script>
 
<style scoped>
.generalClass {
  font-size: 14px;
  line-height: 36px;
}
.generalClassNode {
  padding-left: 20px;
}

.treeRinfo {
  display: inline-block;
}
.treeRinfo span {
  padding-left: 30px;
}
/*  .firstClass:after{
  display:block;clear:both;content:"";visibility:hidden;height:0
 }*/
.el-dropdown,
.el-button--text {
  color: #333;
}
</style>

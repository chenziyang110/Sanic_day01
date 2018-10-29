<template>
<div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
   <div class="all">
        <div class="organization-main">
             <div class='organization-index'>
                <div class='organization-index-top'>
                  <div class='main-top-title'>
                    <el-tabs v-model="activeName">
                      <el-tab-pane label="组织结构" name="first"></el-tab-pane>
                      <div class="el-tabs-report">
                        <router-link :to="{'path':'/organizations/import'}" class="el-button el-button--primary el-button--mini" aria-hidden="true" >导入</router-link>
                        <a class="el-button el-button--primary el-button--mini" title="导出" @click='handleExport'>导出</a>
                        </div>
                    </el-tabs>
                  </div>
                </div>
               <div style="overflow: scroll;white-space:nowrap"  class="treBox">
                 <div class="treeCon clearfix">
                    <span>
                      <i class="fa fa-university" aria-hidden="true"></i>
                      <span ><strong>{{organizationTree.name}}江苏传智播客教育科技股份有限公司</strong></span>
                      <span>({{organizationTree.employeeCount}}人)</span>
                    </span>
                    <div class="fr">
                        <div class="treeRinfo">
                          <span>{{organizationTree.manager}}</span>
                          <span>在职  <em class="colGreen" title="在职人数">{{organizationTree.employeeCount}}</em>&nbsp;&nbsp;(<em class="colGreen" title="正式员工">{{organizationTree.officialCount}}</em>&nbsp;/&nbsp;<em class="colRed" title="非正式员工">{{organizationTree.unofficialCount}}</em>)</span>
                        </div>
                        <div class="treeRinfo">
                          <el-dropdown class="item">
                          <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <el-button type="text" @click="handlAdd(organizationTree,1)">添加子部门</el-button>
                              </el-dropdown-item>
                              <!-- <el-dropdown-item>
                                <el-button type="text" @click="handleEdit(organizationTree)">编辑部门</el-button>
                              </el-dropdown-item> -->
                            <el-dropdown-item>
                              <el-button type="text" @click="handleList(organizationTree,0)">查看待分配员工</el-button>
                              
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        </div> 
                    </div>
                  </div>
                 <RecursiveComponentTree :treeRoot="organizationTree" ref="tree" :parentId='parentId' :changeFlag="childrenFlag" v-on:toChangeNode="handleChangeNode" @getObj="getObj" class="boxpad"></RecursiveComponentTree>
 
                 <!-- <div class='modal-total' v-if="showModal" v-on:click="hideModal()">ddd</div> -->
               </div>
              </div>
              
        </div>
   </div>
   </el-card>
    </div>
</div>
</template>
 
<script>
import { getBlob } from '@/filters/index'
import { organList, exportData } from '@/api/base/organizations'
import RecursiveComponentTree from './../components/tree'
var _this = null
export default {
  data() {
    return {
      parentId: '',
      departLength: 0,
      fullWidth: 0,
      leftWidth: 0,
      botWidth: 0,
      isActive_9: true,
      isActive_2: true,
      childrenFlag: false,
      changeOrSave: '编辑',
      showModal: false,
      showNodeModal: false,
      showDialog: false,
      master: 0,
      activeName: 'first',
      dialogOption: [
        {
          title: '',
          text: '',
          happiness: '',
          sad: '',
          department: null
        }
      ],
      newNodeName: '',
      changeName: '',
      treeNode: Object,
      updateRoot: true,
      toList: Object,
      organizationTree: {}
    }
  },
  components: {
    RecursiveComponentTree
  },
  computed: {
    TreetoList() {
      let listData = []
      transferTreeData(JSON.parse(JSON.stringify([this.organizationTree])))
      function transferTreeData(sourceData) {
        sourceData.forEach(function(node, nodeIndex) {
          if (node.children.length > 0) transferTreeData(node.children)
          listData.push(node)
        })
      }
      return listData
    }
  },
  methods: {
    getObj(params) {
      organList().then(data => {})
    },
    getObject(params) {
      organList(this.requestParameters)
        .then(data => {
          this.organizationTree = data.data.items
          this.parentId = this.organizationTree.parentId
        })
        .catch(e => {
          this.$message.error('错了哦，这是一条错误消息')
        })
    },
    handleChangeNode(Nodedata) {
      this.showModal = true
      this.toList = JSON.parse(JSON.stringify(this.TreetoList))
      this.toList.forEach(function(Listnode) {
        delete Listnode.children
      })
      this.treeNode = this.toList.find(e => e.id === Nodedata.id)
      this.changeName = this.treeNode.name
    },
    hideModal() {
      this.showModal = false
    },
    hideNodeModal() {
      this.showNodeModal = false
    },
    handlAdd(data, num) {
      this.$refs.tree.handlAdd(data.id, num)
    },
    handleList(data, num) {
      this.$refs.tree.handleList(data.id, num)
    },
    // handleEdit(data) {
    //   this.$refs.tree.handleEdit(data.id)
    // }
    handleExport() {
      exportData()
        .then(response => {
          getBlob(response)
          this.$message.success('导出成功！')
        })
        .catch(e => {
          this.$message.error('导出失败！')
        })
    }
  },
  // 挂载结束
  mounted() {},
  // 创建完毕状态
  created: function() {
    _this = this
    this.getObject()
  },
  // 组件更新
  updated: function() {},
  watch: {
    organizationTree: {
      handler: function(curVal, oldVal) {
        this.updateRoot = false
        let _this = this
        setTimeout(function() {
          _this.updateRoot = true
        }, 10)
      },
      deep: true // 深度watch
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.objectTree {
  overflow: auto;
  z-index: 100;
  width: 300px;
  border: 1px solid #dcdfe6;
  margin-top: 5px;
  left: 70px;
}
.el-tabs__content {
  overflow: initial;
}
.boxpad {
  margin-left: -40px;
}
.boxpad > div:first-child,
.objectTree > div:first-child.el-tree-node > div:first-child {
  display: none;
}
</style>
<style  rel="stylesheet/scss" lang="scss" scoped>
.all {
  position: relative;
  min-height: 100%;
  padding-bottom: 200px;
}
.organization-main:after,
.organization-index-top:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}
.organization-main {
  font-size: 14px;
  font-size: 14px;
}

.organization-index {
  padding-bottom: 20px;
  margin-left: 20px;
}
.main-top-title {
  padding-left: 20px;
  padding-top: 20px;
  text-align: left;
}

::-webkit-scrollbar-thumb {
  background-color: #018ee8;
  height: 50px;
  outline-offset: -2px;
  outline: 8px solid #fff;
  -webkit-border-radius: 4px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #fb4446;
  height: 50px;
  -webkit-border-radius: 4px;
}
.modal-total {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 90;
  opacity: 0.2;
}
.modal {
  width: 400px;
  height: 300px;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  left: 45%;
  top: 20%;
  text-align: center;
}
.treBox {
  padding: 30px 120px 0;
}
.organization-index-top {
  position: relative;

  .el-tabs-report {
    position: absolute;
    top: -50px;
    right: 15px;
  }
}
.treeCon {
  border-bottom: 1px solid #cfcfcf;
  padding: 10px 0;
  margin-bottom: 10px;
  .el-dropdown {
    color: #333;
  }
}
.treeRinfo {
  display: inline-block;
}
.treeRinfo span {
  padding-left: 30px;
}
</style>

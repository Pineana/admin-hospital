<template>
    <div>
    <div>
        <el-table :data="tableData" border stripe>
            <el-table-column label="小程序通知key" prop="key" width="150" align="center">
                <template slot-scope="scope">
                    <el-tag
                            type="primary"
                            disable-transitions
                    >{{ scope.row.key }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="通知内容" prop="value" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.value}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button @click="updateNotice(scope.row,scope.$index)" size="small" type="primary"
                    >更新</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog  :visible.sync="dialogVisible" title="通知栏编辑">
            <el-form ref="noticeform" :model="formData"  size="medium" label-width="100px"
                     label-position="left">
                <el-form-item label="通知内容">
                    <el-input type="textarea" v-model="formData.value" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handelConfirm">提交</el-button>
            </div>
        </el-dialog>
    </div>
    <div>
      <el-table :data="tableData1" border stripe>
        <el-table-column label="推荐搜索" prop="key" width="150" align="center">
          <template slot-scope="scope">
            <el-tag
                type="primary"
                disable-transitions
            >{{ scope.$index+1 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="搜索内容" prop="value" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.HotTitle}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="updateHotPoint(scope.row,scope.$index+1)" size="small" type="primary"
            >更新</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog  :visible.sync="dialogVisible" title="通知栏编辑">
        <el-form ref="noticeform" :model="formData"  size="medium" label-width="100px"
                label-position="left">
          <el-form-item label="通知内容">
            <el-input type="textarea" v-model="formData.value" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="handelConfirm">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog  :visible.sync="dialogVisible1" title="通知栏编辑">
        <el-form ref="noticeform" :model="formData1"  size="medium" label-width="100px"
                label-position="left">
          <el-form-item label="通知内容">
            <el-input  v-model="formData1.value" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="close1">取消</el-button>
          <el-button type="primary" @click="handelConfirm1">提交</el-button>
        </div>
      </el-dialog>
    </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import infoList from "@/components/mixins/infoList";
    import { getFileList, deleteFile } from "@/api/fileUploadAndDownload";
    import { downloadImage } from "@/utils/downloadImg";
    import { formatTimeToStr } from "@/utils/data";
    import { store } from '@/store/index';
    import serviceMongo from "../../../utils/back-request";
    export default {
        name: "Upload",
        mixins: [infoList],
        data() {
            return {
                dialogVisible:false,
                dialogVisible1:false,
                listApi: getFileList,
                tableData: [],
                tableData1:[],
                formData:{},
                formData1:{},
                tempKey : null
            };
        },
        computed: {
            ...mapGetters("user", ["userInfo", "token"]),
        },
        filters: {
            formatDate: function(time) {
                if (time != null && time != "") {
                    var date = new Date(time);
                    return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
                } else {
                    return "";
                }
            },
        },
        methods: {
            updateNotice(item,index){
                this.dialogVisible = true
                this.tempKey = item.key
            },
            updateHotPoint(item,index){
              this.dialogVisible1 = true
              this.tempKey = index
            },
            close(){
                this.dialogVisible = false
            },
            close1(){
              this.dialogVisible1 = false
            },
            queryList(){
                var that = this
                serviceMongo({
                    url: "/broadcast/querylist",
                    method: "get",
                }).then(function (res) {
                    if (res.data.Status=="success"){
                        that.tableData=res.data.res
                    }else{
                        that.$message.error("网络请求失败")
                    }
                })
                this.formData = []
            },
            handelConfirm(){
                var that = this
                serviceMongo({
                    url:"/broadcast/update",
                    method:"post",
                    data:{
                        key:that.tempKey,
                        value:that.formData.value
                    }
                }).then(function (res) {
                    console.log(res)
                    if (res.data.Status=="success"){
                        that.dialogVisible = false
                        that.$message.success("更新成功")
                    }else{
                        that.dialogVisible =false
                        that.$message.error("网络请求失败")
                    }
                    that.queryList()
                })
            },
          handelConfirm1(){
            var that = this
            serviceMongo({
              url:"/search/hotpointupdate?hottitle="+that.formData1.value+"&hotid="+that.tempKey,
              method:"get",
            }).then(function (res) {
              console.log(res)
              if (res.data.status=="ok"){
                that.dialogVisible1 = false
                that.queryList1()
                that.$message.success("更新成功")

              }else{
                that.dialogVisible1 =false
                that.queryList1()
                that.$message.error("网络请求失败")
              }
            })
          },
            queryList1(){
              var that = this
              serviceMongo({
                url: "/search/hotpointquery",
                method: "get",
              }).then(function (res) {
                if (res.data.status!="fail"){
                  that.tableData1=res.data
                }else{
                  that.$message.error("网络请求失败")
                }
              })
              this.formData1 = []
            }
        },
        created() {
            var that = this
            serviceMongo({
                url: "/broadcast/querylist",
                method: "get",
            }).then(function (res) {
                if (res.data.Status=="success"){
                    that.tableData=res.data.res
                }else{
                    that.$message.error("网络请求失败")
                }
            })
            that.queryList1()
        },
    };
</script>

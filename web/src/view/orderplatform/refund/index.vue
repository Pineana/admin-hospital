<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
            <div style="display:flex;flex-direction:row;width: 92%">
                <div style="width: 250px">
                    <el-input
                            placeholder="支持订单号搜索"
                            prefix-icon="el-icon-search"
                            v-model="inputid" style="max-width: 250px">
                    </el-input>
                </div>
                <div style="margin-left: 20px">
                    <el-button-group>
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button type="primary" icon="el-icon-refresh" @click="refresh"></el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="订单号">
                                    <span>{{ props.row.orderid }}</span>
                                </el-form-item>
                                <el-form-item label="商户号">
                                    <span>{{ props.row.businessid }}</span>
                                </el-form-item>
                                <el-form-item label="商户名">
                                    <span>{{ props.row.businessname }}</span>
                                </el-form-item>
                                <el-form-item label="课程id">
                                    <span>{{ props.row.courseid}}</span>
                                </el-form-item>
                                <el-form-item label="课程名称">
                                    <span>{{ props.row.coursename}}</span>
                                </el-form-item>
                                <el-form-item label="课程时间">
                                    <span>{{ props.row.coursetime}}</span>
                                </el-form-item>
                                <el-form-item label="备注">
                                    <span>{{ props.row.remarks}}</span>
                                </el-form-item>
                                <el-form-item label="退款原因">
                                    <span>{{ props.row.refundreason}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="订单号"
                            prop="orderid" width="200">
                    </el-table-column>
                    <el-table-column
                            label="店铺名称"
                            prop="businessname" width="250">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="订单金额"
                            prop="price" width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="课程名称"
                            prop="coursename" width="250">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="创建时间"
                            prop="starttime" width="250">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="订单状态"
                            prop="status" width="200">
                        <template slot="header" slot-scope="scope">
                            <div style="display: flex;flex-direction: column;justify-content: center">
                                <el-select v-model="tempStatus" placeholder="请选择" @change="selectStatus">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.tempStatus"
                                            :label="item.label"
                                            :value="item.tempStatus">
                                    </el-option>
                                </el-select>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status==0"
                                    type="danger"
                                    disable-transitions
                            >待退款</el-tag>
                            <el-tag v-if="scope.row.status==1"
                                    type="warning"
                                    disable-transitions
                            >已退款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  align="center">
                        <template slot-scope="scope">
                            <el-button v-if="tempStatus==0" type="primary" @click="refund(scope.row._id)" size="small" icon="el-icon-back">退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
            <el-pagination @current-change="current" @prev-click="prevclick" @next-click="nextclick" :current-page="pageindex"
                           background
                           layout="prev, pager, next"
                           :total="total" :page-size=10>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import serviceMongo from "../../../utils/back-request";

    export default {
        data() {
            return {
                options: [{
                    tempStatus: 0,
                    label: '待退款'
                }, {
                    tempStatus: 1,
                    label: '已退款'
                }],
                tempStatus:0,
                pageindex:1,
                visible:false,
                inputid:"",
                total:0,
                tableData: [],
                dialogVisible:false,
                dialogVisible1:false,
                fullscreenLoading:false,
            }
        },
        methods:{
            refresh(){
                this.queryList(1,10)
            },
            search(){
                var that = this
                if (this.inputid==""){
                    this.$message.warning("搜索内容为空")
                }else{
                    serviceMongo({
                        url:"/order/querylistbyorderid?orderid="+this.inputid,
                        method:"get"
                    }).then(function (res) {
                        if (res.data.Status=="success"){
                            that.tableData = []
                            that.tableData.push(res.data.res)
                            that.total = 0
                            that.fullscreenLoading = false
                            that.$message.success("查询成功")
                        }else{
                            that.fullscreenLoading = false
                            that.$message.error("查询失败")
                        }
                    })
                }
            },
            copy: function(obj) {
                return JSON.parse(JSON.stringify(obj))
            },
            close(){
                this.dialogVisible = false
            },
            current(index){
                this.queryList(index,10)
            },
            prevclick(index){
                this.pageindex=index
            },
            nextclick(index){
                this.pageindex=index
            },
            selectStatus(item){
                this.tempStatus = item
                this.queryList(1,10)
            },
            queryList(page,limit){
                var that =this
                this.fullscreenLoading =true
                serviceMongo({
                    url:"/order/querylist?page="+page+"&limit="+limit+"&status="+this.tempStatus,
                    method:"get"
                }).then(function (res) {
                    console.log(res.data)
                    if (res.data.Status=="success"){
                        that.tableData=res.data.res
                        that.total = res.data.total
                        that.fullscreenLoading = false
                        that.$message.success("加载成功")
                    }else{
                        that.fullscreenLoading = false
                        that.$message.error("加载失败")
                    }
                })
            }
        },
        created() {
            this.queryList(1,10)
        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        padding: 0px 50px;
        width: 50%;
    }
</style>


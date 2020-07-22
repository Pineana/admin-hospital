<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
            <div style="display:flex;flex-direction:row;width: 92%">
                <div style="width: 250px">
                    <el-input
                            placeholder="支持商户号搜索"
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
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商户id" prop="businessid" width="150">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.businessid" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.businessid}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="openid" prop="openid" width="150">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.openid" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.openid}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="用户昵称" prop="nickname" width="100">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.nickname" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.nickname}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="评论内容" prop="content">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="bottom">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.content}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="评分" prop="rate" width="100">
                <template slot-scope="scope">
                    <el-tag type="primary" disable-transitions>
                        {{ scope.row.rate }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="时间" prop="timestamp" width="120">
            </el-table-column>
            <el-table-column label="操作"  align="center" width="150">
                <template slot-scope="scope">
                    <el-popconfirm title="确定删除评论" @onConfirm="deleteComment(scope.row._id)">
                        <el-button type="danger" slot="reference" size="small" icon="el-icon-close">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
            <el-pagination @current-change="current" :current-page="pageindex" @prev-click="prevclick" @next-click="nextclick"
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
        name: 'Dynamic',
        data() {
            return {
                inputid:"",
                pageindex:1,
                fullscreenLoading: false,
                tableData: [],
                tempStatus: 0,
                total:0,
            }
        },
        methods: {
            refresh(){
                this.queryList(1)
            },
            search(){
                var that = this
                if (this.inputid==""){
                    this.$message.warning("搜索内容为空")
                }else{
                    serviceMongo({
                        url:"/businesscomment/querylist?businessid="+this.inputid,
                        method:"get"
                    }).then(function (res) {
                        console.log(res)
                        if (res.data.Status=="success"){
                            that.inputid = ""
                            that.tableData = res.data.res
                            that.total = 0
                            that.fullscreenLoading = false
                            that.$message.success("查询成功")
                        }else{
                            that.fullscreenLoading = false
                            that.inputid = ""
                            that.$message.error("查询失败")
                        }
                    })
                }
            },
            deleteComment(item){
                this.fullscreenLoading = true
                var that = this
                serviceMongo({
                    url: "/businesscomment/delete?commentid="+item,
                    method: "get",
                }).then(function (res) {
                    console.log(res)
                    if (res.data.status= "success"){
                        that.fullscreenLoading = false
                        that.$message.success("更新成功")
                        that.queryList(1,that.tempStatus)
                    }else{
                        that.$message.error("网络错误")
                        that.fullscreenLoading = false
                    }
                })
            },
            current(index){
                this.queryList(index)
            },
            prevclick(index){
                this.pageindex = index
            },
            nextclick(index){
                this.pageindex =index
            },
            queryList(index){
                this.fullscreenLoading = true
                var that = this
                serviceMongo({
                    url: "/businesscomment/querylist?page="+index+"&limit=10",
                    method: "get",
                }).then(function (res) {
                    if (res.data.status= "success"){
                        that.fullscreenLoading = false
                        that.tableData=res.data.res
                        that.$message.success("加载成功")
                        that.total = res.data.total
                    }else{
                        that.$message.error("网络错误")
                        that.fullscreenLoading = false
                    }
                })
            }
        },
        created() {
            this.fullscreenLoading = true
            var that = this
            serviceMongo({
                url: "/businesscomment/querylist?page=1&limit=10",
                method: "get",
            }).then(function (res) {
                if (res.data.status= "success"){
                    that.fullscreenLoading = false
                    that.tableData=res.data.res
                    that.total = res.data.total
                }else{
                    that.$message.success("网络错误")
                    that.fullscreenLoading = false
                }
            })
        }
    }
</script>
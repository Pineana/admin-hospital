<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="openid" prop="openid" width="150">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.openid" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.openid}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="昵称" prop="nickname" width="150">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.nickname" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.nickname}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="评论类型" prop="dynamictype" width="100">
                <template slot-scope="scope">
                <el-tag :type="scope.row.dynamictype == 0 ? 'primary' : 'success'" disable-transitions>
                    {{ scope.row.dynamictype == 0 ? "图片类":"视频类" }}
                </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="评论内容" prop="content">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="bottom">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.content}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="发表时间" prop="publictime" width="120">
            </el-table-column>
            <el-table-column label="操作"  align="center" width="150">
                <template slot-scope="scope">
                    <el-popconfirm title="确定删除动态" @onConfirm="deleteDynamic(scope.row._id)">
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
                pageindex:1,
                fullscreenLoading: false,
                tableData: [],
                tempStatus: 0,
                total:0,
            }
        },
        methods: {
            deleteDynamic(item){
                this.fullscreenLoading = true
                var that = this
                serviceMongo({
                    url: "/dynamics/delete?dynamicid="+item,
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
                    url: "/dynamics/querylist?page="+index+"&limit=10",
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
                url: "/dynamics/querylist?page=1&limit=10",
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
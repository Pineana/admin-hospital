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
            <el-table-column label="用户昵称" prop="nickname" width="100">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.nickname" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.nickname}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="课程名称" prop="coursename" width="150">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.coursename" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.coursename}}</div>
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
            <el-table-column label="回复内容" prop="repley">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.repley" placement="bottom">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.repley}}</div>
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
                <template slot-scope="scope" v-if="!scope.row.repleyflag">
                    <el-button type="primary" @click="backComment(scope.row._id)" slot="reference" size="small" icon="el-icon-chat-dot-round">回复</el-button>
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
        <el-dialog  :visible.sync="dialogVisible" title="广告栏编辑">
            <el-form ref="commentform" :model="formData"  size="medium" label-width="100px"
                     label-position="left">
                <el-form-item label="评论内容" prop="url">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入回复内容"
                            v-model="textarea">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handelConfirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import serviceMongo from "../../../utils/back-request";

    export default {
        name: 'Dynamic',
        data() {
            return {
                dialogVisible:false,
                formData:{},
                inputid:"",
                pageindex:1,
                fullscreenLoading: false,
                tableData: [],
                tempStatus: 0,
                textarea:"",
                total:0,
                commentid:"",
            }
        },
        methods: {
            backComment(item){
                this.dialogVisible = true
                this.commentid = item
            },
            close(){
                this.dialogVisible = false
            },
            handelConfirm(){
                this.fullscreenLoading = true
                var that = this
                serviceMongo({
                    url: "/businesscomment/repley",
                    method: "post",
                    data:{
                        businesscommentid:that.commentid,
                        repley:that.textarea,
                    }
                }).then(function (res) {
                    console.log(res)
                    if (res.data.status= "success"){
                        that.fullscreenLoading = false
                        that.$message.success("回复成功")
                        that.queryList(1)
                        that.dialogVisible = false
                    }else{
                        that.$message.error("网络错误")
                        that.fullscreenLoading = false
                        that.dialogVisible = false
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
                    url: "/businesscomment/querylist?page="+index+"&limit=10&businessid="+this.$store.businessid,
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
            var businessid = localStorage.getItem("businessid")
            serviceMongo({
                url: "/businesscomment/querylist?page=1&limit=10&businessid="+businessid,
                method: "get",
            }).then(function (res) {
                console.log(res.data)
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
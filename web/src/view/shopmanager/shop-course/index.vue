<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <div style="display: flex;flex-direction: row;justify-content: flex-end;margin-bottom: 10px">
            <div style="margin-right: 40px">
                <el-button type="primary" @click="addCourse">添加课程</el-button>
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
                                <el-form-item label="课程 ID">
                                    <span>{{ props.row._id }}</span>
                                </el-form-item>
                                <el-form-item label="课程名称">
                                    <span>{{ props.row.coursename }}</span>
                                </el-form-item>
                                <el-form-item label="线上价格">
                                    <span>{{ props.row.onlineprice }}</span>
                                </el-form-item>
                                <el-form-item label="线下价格">
                                    <span>{{ props.row.offlineprice}}</span>
                                </el-form-item>
                                <el-form-item label="课程销量">
                                    <span>{{ props.row.salenum}}</span>
                                </el-form-item>
                                <el-form-item label="开始时间">
                                    <span>{{ props.row.starttime }}</span>
                                </el-form-item>
                                <el-form-item label="结束时间">
                                    <span>{{ props.row.endtime}}</span>
                                </el-form-item>
                                <el-form-item label="课程介绍">
                                    <el-button type="text" @click="courseDetail(props.row.detail)">详情</el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="课程 ID"
                            prop="_id" width="250">
                    </el-table-column>
                    <el-table-column
                            label="课程名称"
                            prop="coursename">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="课程销量"
                            prop="salenum" width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="开始时间"
                            prop="starttime" width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="结束时间"
                            prop="endtime" width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="线上价格"
                            prop="onlineprice" width="100">
                        <template slot-scope="scope">
                            <el-tag
                                    type="success"
                                    disable-transitions
                            >{{ scope.row.onlineprice }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            prop="desc" width="150">
                        <template slot-scope="scope">
                            <el-button @click="editCourse(scope.row)" type="primary" size="small">编辑</el-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteCourse(scope.row._id)" >
                                <el-button size="small" type="danger" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog  :visible.sync="dialogVisible" title="添加课程" width="30%">
                    <el-form ref="courseform" :model="formData" :rules="rules" size="medium" label-width="100px"
                             label-position="left">
                        <el-form-item label="课程名称" prop="coursename">
                            <el-input v-model="formData.coursename" placeholder="请输入课程名称" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="线上价格" prop="onlineprice">
                            <el-input v-model="formData.onlineprice" type="number" placeholder="请输入线上价格" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="线下价格" prop="offlineprice">
                            <el-input v-model="formData.offlineprice" placeholder="请输入线下价格" type="number" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="starttime">
                            <el-date-picker
                                    v-model="formData.startandendtime"
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item
                                v-for="(item,index) in desc"
                                :label="'标题' + (index+1)"
                                :prop="'desc.' + index + '.value'">
                            <el-input
                                    type="text"
                                    placeholder="请输入标题"
                                    v-model="desc[index].title"
                                    maxlength="10"
                                    show-word-limit
                            >
                            </el-input>
                            <div style="margin: 20px 0;"></div>
                            <el-input
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="desc[index].content"
                                    maxlength="30"
                                    show-word-limit
                            >
                            </el-input>
                            <el-button @click.prevent="addDesc">添加</el-button>
                            <el-button v-if="index!=0" @click.prevent="removeDesc">删除</el-button>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" @click="handelConfirm">确定</el-button>
                    </div>
                </el-dialog>
                <el-dialog  :visible.sync="dialogVisible1" title="添加课程" width="30%">
                    <el-form ref="courseform" :model="formData1" :rules="rules" size="medium" label-width="100px"
                             label-position="left">
                        <el-form-item label="课程名称" prop="coursename">
                            <el-input v-model="formData1.coursename" placeholder="请输入课程名称" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="线上价格" prop="onlineprice">
                            <el-input v-model="formData1.onlineprice" type="number" placeholder="请输入线上价格" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="线下价格" prop="offlineprice">
                            <el-input v-model="formData1.offlineprice" placeholder="请输入线下价格" type="number" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="时间" prop="starttime">
                            <el-date-picker
                                    v-model="formData1.startandendtime"
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item
                                v-for="(item,index) in desc"
                                :label="'标题' + (index+1)"
                                :prop="'desc.' + index + '.value'">
                            <el-input
                                    type="text"
                                    placeholder="请输入标题"
                                    v-model="desc[index].title"
                                    maxlength="10"
                                    show-word-limit
                            >
                            </el-input>
                            <div style="margin: 20px 0;"></div>
                            <el-input
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="desc[index].content"
                                    maxlength="30"
                                    show-word-limit
                            >
                            </el-input>
                            <el-button @click.prevent="addDesc">添加</el-button>
                            <el-button v-if="index!=0" @click.prevent="removeDesc">删除</el-button>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="close1">取消</el-button>
                        <el-button type="primary" @click="handelConfirm1">更新</el-button>
                    </div>
                </el-dialog>
                <el-dialog  :visible.sync="dialogVisible2" title="编辑店铺" width="40%">
                    <el-collapse v-model="activeNames">
                        <div v-for="(item,index) in course_detail">
                            <el-collapse-item :title="item.title" :name="index">
                                <div>{{item.content}}</div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </el-dialog>
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
                text:"",
                textarea:"",
                pageindex:1,
                visible:false,
                inputid:"",
                total:0,
                tableData: [],
                formData: {
                },
                desc:[{
                    title:"",
                    content:"",
                }],
                formData1: {},
                activeNames: [],
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                fullscreenLoading:false,
                course_detail:null,
                rules: {
                    coursename: [
                        { required: true, message: '请输入课程名称', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3-15 个字符内', trigger: 'blur' }
                    ],
                    onlineprice: [
                        { type: 'string',required: true, message: '请输入线上价格', trigger: 'blur' }
                    ],
                    offlineprice: [
                        { type: 'string', required: true, message: '请输入线下价格', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            addDesc(item){
                this.desc.push({
                    title: "",
                    content: ""
                })
            },
            removeDesc(item){
                this.desc.pop()
            },
            courseDetail(item){
                this.course_detail = item
                this.dialogVisible2 = true
            },
            deleteCourse(item){
                console.log(item)
                var that =this
                serviceMongo({
                    url: "/course/delete?courseid="+item,
                    method: "get",
                }).then(function (res) {
                    if (res.data.Status=="success"){
                        that.$message.success("删除成功")
                        that.queryList()
                    }else{
                        that.$message.error("网络请求失败")
                    }
                })
            },
            addCourse(){
                this.dialogVisible = true
            },
            editCourse(item){
                this.formData1._id = item._id
                this.dialogVisible1 = true
            },
            close(){
                this.dialogVisible = false
            },
            close1(){
                this.dialogVisible1 = false
            },
            handelConfirm(){
                var that = this
                var businessid = localStorage.getItem("businessid")
                serviceMongo({
                    url:"/course/insert",
                    method:"post",
                    data:{
                        businessid:businessid,
                        coursename:this.formData.coursename,
                        onlineprice:this.formData.onlineprice,
                        offlineprice:this.formData.offlineprice,
                        starttime:this.formData.startandendtime[0],
                        endtime:this.formData.startandendtime[1],
                        detail:this.desc,
                    }
                }).then(function (res) {
                    console.log(res.data)
                    if (res.data.status=="success"){
                        that.queryList(1,10)
                        that.$message.success("插入成功")
                        that.dialogVisible =false
                        that.formData1 = {}
                    }else{
                        that.$message.error("插入失败")
                        that.dialogVisible =false
                        that.fromData1 = {}
                    }
                })
            },
            handelConfirm1(){
                var that = this
                serviceMongo({
                    url:"/course/update",
                    method:"post",
                    data:{
                        courseid:this.formData1._id,
                        coursename:this.formData1.coursename,
                        onlineprice:this.formData1.onlineprice,
                        offlineprice:this.formData1.offlineprice,
                        starttime:this.formData1.startandendtime[0],
                        endtime:this.formData1.startandendtime[1],
                        detail:this.desc,
                    }
                }).then(function (res) {
                    console.log(res.data)
                    if (res.data.Status=="success"){
                        that.queryList(1,10)
                        that.$message.success("更新成功")
                        that.dialogVisible1 =false
                        that.formData1 = {}
                    }else{
                        that.$message.error("更新失败")
                        that.dialogVisible1 =false
                        that.fromData1 = {}
                    }
                })
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
            queryList(page,limit){
                var that =this
                var businessid = localStorage.getItem("businessid")
                this.fullscreenLoading =true
                serviceMongo({
                    url:"/course/querylist?page="+page+"&limit="+limit+"&businessid="+businessid,
                    method:"get"
                }).then(function (res) {
                    console.log(res.data)
                    if (res.data.Status=="success"){
                        that.tableData=res.data.res
                        that.total = res.data.total
                        that.fullscreenLoading = false
                        that.$message.success("加载成功")
                        that.formData = {}
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


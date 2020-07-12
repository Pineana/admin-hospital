<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
       <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
           <div style="display:flex;flex-direction:row;width: 92%">
               <div style="width: 250px">
                    <el-input
                            placeholder="支持店铺ID搜索"
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
           <div style="width: 8%">
                <el-button type="primary" @click="addShop">添加店铺</el-button>
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
                                <el-form-item label="店铺 ID">
                                    <span>{{ props.row._id }}</span>
                                </el-form-item>
                                <el-form-item label="店铺名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="店铺评分">
                                    <span>{{ props.row.score }}</span>
                                </el-form-item>
                                <el-form-item label="评论人数">
                                    <span>{{ props.row.ratenum}}</span>
                                </el-form-item>
                                <el-form-item label="类别">
                                    <span>{{ props.row.class }}</span>
                                </el-form-item>
                                <el-form-item label="店铺坐标">
                                    <span>{{ "经纬度："+props.row.location[1].Value}}</span>
                                </el-form-item>
                                <el-form-item label="联系电话">
                                    <span>{{ props.row.phonenum }}</span>
                                </el-form-item>
                                <el-form-item label="起始价格">
                                    <span>{{ props.row.startprice }}</span>
                                </el-form-item>
                                <el-form-item label="店铺销量">
                                    <span>{{ props.row.salenum }}</span>
                                </el-form-item>
                                <el-form-item label="详细地址">
                                    <span>{{ props.row.address }}</span>
                                </el-form-item>
                                <el-form-item label="所在区域">
                                    <span>{{ props.row.shortloc }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="店铺 ID"
                            prop="_id" width="250">
                    </el-table-column>
                    <el-table-column
                            label="店铺名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="联系电话"
                            prop="phonenum" width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="店铺销量"
                            prop="salenum" width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="评论人数"
                            prop="ratenum" width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="店铺评分"
                            prop="score" width="100">
                        <template slot-scope="scope">
                            <el-tag
                                    type="success"
                                    disable-transitions
                            >{{ scope.row.score }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            prop="desc" width="150">
                        <el-button @click="editShop" type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </el-table-column>
                </el-table>
                <el-dialog  :visible.sync="dialogVisible" title="添加店铺" width="40%">
                    <el-form ref="shopform" :model="formData" :rules="rules" size="medium" label-width="100px"
                             label-position="left">
                        <el-form-item label="店铺名称" prop="name">
                            <el-input v-model="formData.name" placeholder="请输入店铺名称" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="店铺类别" prop="class">
                            <el-input v-model="formData.class" type="string" placeholder="请输入店铺类别" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phonenum">
                            <el-input v-model="formData.phonenum" placeholder="请输入联系电话" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="经纬度坐标" prop="location">
                            <el-input v-model="formData.location" placeholder="请输入经纬度( | 为分隔符)" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="所在区域" prop="shortloc">
                            <el-input v-model="formData.shortloc" placeholder="请输入所属区域" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="formData.address" placeholder="请输入详细地址" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="关键词" prop="keyword">
                            <el-input v-model="formData.keyword" placeholder="请输入关键词" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" @click="handelConfirm">确定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
        <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
            <el-pagination @current-change="current" @prev-click="prevclick" @next-click="nextclick"
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
                inputid:"",
                total:0,
                tableData: [],
                formData: {},
                dialogVisible:false,
                fullscreenLoading:false,
                rules: {
                    name: [
                        { required: true, message: '请输入店铺名称', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3-15 个字符内', trigger: 'blur' }
                    ],
                    class: [
                        { type: 'string',required: true, message: '请输入店铺类别', trigger: 'blur' }
                    ],
                    phonenum: [
                        { type: 'string', required: true, message: '请输入联系电话', trigger: 'blur' }
                    ],
                    location: [
                        { type: 'string', required: true, message: '请输入坐标', trigger: 'blur' }
                    ],
                    shortloc:[
                        { type: 'string', required: true, message: '请输入所处区域', trigger: 'blur' }
                    ],
                    address:[
                        { type: 'string', required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    keyword:[
                        { type: 'string', required: true, message: '请输入关键词信息', trigger: 'blur' }
                    ]

                },
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
                        url:"/businessinfo/query?businessid="+this.inputid,
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
            addShop(){
                this.dialogVisible = true
            },
            editShop(){
                this.dialogVisible1 = true
            },
            close(){
                this.dialogVisible = false
            },
            close1(){
                this.dialogVisible = false
            },
            handelConfirm(){
                var that = this
                if (this.formData.name!=null&&
                    this.formData.class!=null&&
                    this.formData.phonenum!=null&&
                    this.formData.location!=null&&
                    this.formData.shortloc!=null&&
                    this.formData.address!=null)
                {
                    if (this.formData.name!=""&&
                        this.formData.class!=""&&
                        this.formData.phonenum!=""&&
                        this.formData.location!=""&&
                        this.formData.shortloc!=""&&
                        this.formData.address!="")
                    {
                        this.formData.location = this.formData.location.split("|")
                        var la = Number(this.formData.location[0])
                        var lo = Number(this.formData.location[1])

                    }else{
                        that.$message.warning("有未填内容")
                    }
                }else{
                    that.$message.warning("有未填内容")
                }
            },
            current(index){
                console.log(index)
                // this.queryList(index,this.tempStatus)
            },
            prevclick(index){
                console.log(index)
                // this.queryList(index,this.tempStatus)
            },
            nextclick(index){
                console.log(index)
                // this.queryList(index,this.tempStatus)
            },
            queryList(page,limit){
                var that =this
                this.fullscreenLoading =true
                serviceMongo({
                    url:"/businessinfo/querylist?page="+page+"&limit="+limit,
                    method:"get"
                }).then(function (res) {
                    console.log(res.data)
                    if (res.data.Status=="success"){
                        that.tableData=res.data.res
                        console.log(that.tableData)
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


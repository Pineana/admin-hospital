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
                                    <span>{{ "经纬度："+props.row.location.coordinates}}</span>
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
                                <el-form-item label="关键词">
                                    <span>{{ props.row.keyword }}</span>
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
                        <template slot-scope="scope">
                            <el-button @click="editShop(scope.row)" type="primary" size="small">编辑</el-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteshop(scope.row._id)" >
                                <el-button size="small" type="danger" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
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
                <el-dialog  :visible.sync="dialogVisible1" title="编辑店铺" width="40%">
                    <el-form ref="shopform" :model="formData1" :rules="rules1" size="medium" label-width="100px"
                             label-position="left">
                        <el-form-item label="店铺名称" prop="name">
                            <el-input v-model="formData1.name" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="店铺类别" prop="class">
                            <el-input v-model="formData1.class" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phonenum">
                            <el-input v-model="formData1.phonenum" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="经纬度坐标" prop="location">
                            <el-input v-model="formData1.location" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="所在区域" prop="shortloc">
                            <el-input v-model="formData1.shortloc" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="formData1.address" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="关键字" prop="keyword">
                            <el-input v-model="formData1.keyword" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="店铺销量" prop="salenum">
                            <el-input v-model="formData1.salenum" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="评论人数" prop="ratenum">
                            <el-input v-model="formData1.ratenum" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="店铺评分" prop="score">
                            <el-input v-model="formData1.score" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="起始价格" prop="startprice">
                            <el-input v-model="formData1.startprice" type="string" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="close1">取消</el-button>
                        <el-button type="primary" @click="handelConfirm1">确定</el-button>
                    </div>
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
                pageindex:1,
                visible:false,
                inputid:"",
                total:0,
                tableData: [],
                formData: {},
                formData1:{},
                dialogVisible:false,
                dialogVisible1:false,
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
                rules1: {
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
                    ],
                    salenum:[
                        { type: 'string', required: true, message: '请输入店铺销量', trigger: 'blur' }
                    ],
                    ratenum:[
                        { type: 'string', required: true, message: '请输入店铺评分', trigger: 'blur' }
                    ],
                    startprice:[
                        { type: 'string', required: true, message: '请输入起始价格', trigger: 'blur' }
                    ],
                    score:[
                        { type: 'string', required: true, message: '请输入店铺评分', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            deleteshop(item){
                console.log(item)
                var that =this
                serviceMongo({
                    url: "/businessinfo/delete?businessinfoid="+item,
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
            editShop(item){
                this.dialogVisible1 = true
                this.formData1 = this.copy(item)
            },
            copy: function(obj) {
                return JSON.parse(JSON.stringify(obj))
            },
            close(){
                this.dialogVisible = false
            },
            close1(){
                this.dialogVisible1 = false
            },
            handelConfirm(){
                var that = this
                if (this.formData.name!=null&&
                    this.formData.class!=null&&
                    this.formData.phonenum!=null&&
                    this.formData.location!=null&&
                    this.formData.shortloc!=null&&
                    this.formData.address!=null&&
                    this.formData.keyword!=null)
                {
                    if (this.formData.name!=""&&
                        this.formData.class!=""&&
                        this.formData.phonenum!=""&&
                        this.formData.location!=""&&
                        this.formData.shortloc!=""&&
                        this.formData.address!=""&&
                        this.formData.keyword!="")
                    {
                        this.formData.location = this.formData.location.split("|")
                        var la = Number(this.formData.location[0])
                        var lo = Number(this.formData.location[1])
                        serviceMongo({
                            url:"/businessinfo/insert",
                            method:"post",
                            data:{
                                name:this.formData.name,
                                class:this.formData.class,
                                phonenum:this.formData.phonenum,
                                location:{
                                    type : "Point",
                                    coordinates : [la, lo]
                                },
                                shortloc:this.formData.shortloc,
                                address:this.formData.address,
                                keyword:this.formData.keyword,
                                score:0,
                                ratenum:0,
                                salenum:0
                            }
                        }).then(function (res) {
                            console.log(res.data)
                            if (res.data.Status=="success"){
                                that.queryList(1,10)
                                that.$message.success("添加成功")
                                that.dialogVisible =false
                                that.formData = {}
                            }else{
                                that.$message.error("添加失败")
                                that.dialogVisible =false
                                that.fromData = {}
                            }
                        })

                    }else{
                        that.$message.warning("有未填内容")
                    }
                }else{
                    that.$message.warning("有未填内容")
                }
            },
            handelConfirm1(){
                var that = this
                if (this.formData1.name!=null&&
                    this.formData1.class!=null&&
                    this.formData1.phonenum!=null&&
                    this.formData1.shortloc!=null&&
                    this.formData1.address!=null&&
                    this.formData1.keyword!=null&&
                    this.formData1.salenum!=null&&
                    this.formData1.ratenum!=null&&
                    this.formData1.score!=null&&
                    this.formData1.startprice!=null)
                {
                    if (this.formData1.name!=""&&
                        this.formData1.class!=""&&
                        this.formData1.phonenum!=""&&
                        this.formData1.shortloc!=""&&
                        this.formData1.address!=""&&
                        this.formData1.keyword!=""&&
                        this.formData1.salenum!=""&&
                        this.formData1.ratenum!=""&&
                        this.formData1.score!=""&&
                        this.formData1.startprice!="")
                    {
                        if (typeof(this.formData1.location)=="string"){
                            this.formData1.location = this.formData1.location.split("|")
                            var la = Number(this.formData1.location[0])
                            var lo = Number(this.formData1.location[1])
                            this.formData1.location.coordinates = [la,lo]
                        }
                        console.log(this.formData1.location)
                        serviceMongo({
                            url:"/businessinfo/update",
                            method:"post",
                            data:{
                                objid:this.formData1._id,
                                name:this.formData1.name,
                                class:this.formData1.class,
                                phonenum:this.formData1.phonenum,
                                location:{
                                    type : "Point",
                                    coordinates : this.formData1.location.coordinates
                                },
                                shortloc:this.formData1.shortloc,
                                address:this.formData1.address,
                                keyword:this.formData1.keyword,
                                score:this.formData1.score,
                                ratenum:this.formData1.ratenum,
                                salenum:this.formData1.salenum,
                                startprice:this.formData1.startprice
                            }
                        }).then(function (res) {
                            console.log(res.data)
                            if (res.data.Status=="success"){
                                that.queryList(1,10)
                                that.$message.success("更新成功")
                                that.dialogVisible =false
                                that.formData1 = {}
                            }else{
                                that.$message.error("更新失败")
                                that.dialogVisible =false
                                that.fromData1 = {}
                            }
                        })

                    }else{
                        that.$message.warning("有未填内容")
                    }
                }else{
                    that.$message.warning("有未填内容")
                }
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
                console.log(1)
                var that =this
                this.fullscreenLoading =true
                serviceMongo({
                    url:"/businessinfo/querylist?page="+page+"&limit="+limit,
                    method:"get"
                }).then(function (res) {
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


<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-row :gutter="20">
            <el-col :span="2" :offset="22" >
                <el-button type="primary" @click="addShop">添加店铺</el-button>
            </el-col>
        </el-row>
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
                            prop="_id">
                    </el-table-column>
                    <el-table-column
                            label="店铺名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="店铺销量"
                            prop="salenum">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="店铺评分"
                            prop="score">
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
                            prop="desc">
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
                            <el-input v-model="formData.class" type="number" placeholder="请输入店铺类别" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phonenum">
                            <el-input v-model="formData.phonenum" placeholder="请输入联系电话" type="number" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="优惠券金额" prop="discountnum">
                            <el-input v-model="formData.discountnum" placeholder="请输入礼物价格" type="number" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="图片上传" prop="src">
                            <el-upload ref="src" :file-list="srcfileList" :action="srcAction" :auto-upload="false"
                                       :before-upload="srcBeforeUpload" :on-success="uploadSuccess" :limit=1 list-type="picture" accept="image/*" name="file">
                                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传不超过 5MB 的图片文件</div>
                            </el-upload>
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
                total:0,
                tableData: [],
                dialogVisible:false,
                fullscreenLoading:false,
            }
        },
        methods:{
            addShop(){

            },
            editShop(){

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


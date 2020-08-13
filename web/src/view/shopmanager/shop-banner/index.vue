<template>
    <div>
        <div class="top">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px">店铺信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="editShop(tableData)">编辑页面</el-button>
                </div>
                <div style="display: flex;flex-direction: row;justify-content: space-around">
                    <div style="width: 25%;">
                        <el-upload
                                class="avatar-uploader"
                                action="http://mini.yilianjia.top:9090/group1/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="tableData.imageurl" :src="tableData.imageurl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div style="width: 75%">
                        <el-row>
                            <el-col :span="4"><div>店名</div></el-col>
                            <el-col :span="8"><div>{{tableData.name}}</div></el-col>
                            <el-col :span="4"><div>评分</div></el-col>
                            <el-col :span="8"><div>{{tableData.score}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>类别</div></el-col>
                            <el-col :span="8"><div>{{tableData.class}}</div></el-col>
                            <el-col :span="4"><div>经纬度</div></el-col>
                            <el-col :span="8"><div>{{tableData.location.coordinates}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>电话</div></el-col>
                            <el-col :span="8"><div>{{tableData.phonenum}}</div></el-col>
                            <el-col :span="4"><div>起始价</div></el-col>
                            <el-col :span="8"><div>{{tableData.startprice}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>所在区域</div></el-col>
                            <el-col :span="8"><div>{{tableData.shortloc}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>详细地址</div></el-col>
                            <el-col :span="20"><div>{{tableData.address}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>店长寄语</div></el-col>
                            <el-col :span="20"><div>{{tableData.notice}}</div></el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
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
        </div>
        <div class="middle">
            <div style="display: flex;flex-direction: row;width: 100%;margin-top: 20px">
                <div style="margin-bottom: 20px;margin-left: 10px;font-size: 20px;width: 70%">店铺展示列表</div>
                <div style="display: flex;flex-direction: row;justify-content: center;width: 20%">
                </div>
                <div style="width: 10%">
                    <el-button type="primary" @click="addShow">插入图片</el-button>
                </div>
            </div>
            <div v-loading.fullscreen.lock="fullscreenLoading2">
                <el-table :data="tableData.showpic" border stripe>
                    <el-table-column label="预览" align="center" width="420px">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center">
                                <el-image style="width: 425px; height: 210px" :src="scope.row" :preview-src-list="picList"></el-image>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="url地址" prop="showpic" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" :href="scope.row">{{ scope.row }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <template slot-scope="scope">
                          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteShowPic(scope.$index)" >
                            <el-button size="small" type="danger" slot="reference">删除</el-button>
                          </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog  :visible.sync="dialogVisible2" title="店铺展示编辑">
                    <el-form ref="showpicform" :model="formData2"  size="medium" label-width="100px"
                             label-position="left">
                        <el-form-item label="链接地址" prop="url">
                            <el-input v-model="formData2.url" placeholder="请输入链接地址:请带上https:// 前缀" clearable prefix-icon='el-icon-s-promotion'
                                      :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="图片上传" prop="src">
                            <el-upload ref="src" :file-list="srcfileList" :action="srcAction"
                                       :before-upload="beforeAvatarUpload" :on-success="uploadSuccess" :limit=1 list-type="picture" accept="image/*" name="file">
                                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传不超过 5MB 的图片文件</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="close2">取消</el-button>
                        <el-button type="primary" @click="handelConfirm2">确定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div class="end">
            <div style="display: flex;flex-direction: row;width: 100%;margin-top: 20px">
                <div style="margin-bottom: 20px;margin-left: 10px;font-size: 20px;width: 70%">教师列表</div>
                <div style="display: flex;flex-direction: row;justify-content: center;width: 20%">
                </div>
                <div style="width: 10%">
                    <el-button type="primary" @click="addTeacher">插入教师信息</el-button>
                </div>
            </div>
            <div v-loading.fullscreen.lock="fullscreenLoading3">
                <el-table :data="tableData.teacherlist" border stripe>
                    <el-table-column label="教师头像" align="center" width="200px">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center">
                                <el-image style="width: 150px; height: 150px" :src="scope.row.picurl" :preview-src-list="picList"></el-image>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="教师姓名" prop="name" align="center" width="80px">
                        <template slot-scope="scope">
                            <div>{{ scope.row.name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="教师介绍" prop="content" align="center">
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="bottom">
                          <div>{{scope.row.content}}</div>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <template slot-scope="scope">
                          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteTeacher(scope.$index)" >
                            <el-button size="small" type="danger" slot="reference">删除</el-button>
                          </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog  :visible.sync="dialogVisible3" title="教师信息插入">
                    <el-form ref="teacherform" :model="formData3"  size="medium" label-width="100px"
                             label-position="left">
                        <el-form-item label="教师姓名" prop="url">
                            <el-input v-model="formData3.name" placeholder="请输入教师姓名" clearable
                                      :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="教师介绍" prop="url">
                          <el-input type="textarea" v-model="formData3.content" placeholder="请输入教师介绍" clearable
                                    :style="{width: '100%'}">
                          </el-input>
                        </el-form-item>
                        <el-form-item label="头像上传" prop="src" required>
                            <el-upload ref="src" :file-list="srcfileList" :action="srcAction"
                                       :before-upload="beforeAvatarUpload" :on-success="uploadSuccess2" :limit=1 list-type="picture" accept="image/*" name="file">
                                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传不超过 5MB 的图片文件</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="close3">取消</el-button>
                        <el-button type="primary" @click="handelConfirm3">确定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import serviceMongo from "../../../utils/back-request";
    import Table from "../../example/table/table";

    export default {
        name: "index",
        data() {
            return {
                tempurl :"",
                dialogVisible1:false,
                dialogVisible2:false,
                dialogVisible3:false,
                fullscreenLoading:false,
                fullscreenLoading2:false,
                fullscreenLoading3:false,
                picList:[],
                srcAction: 'http://mini.yilianjia.top:9090/group1/upload',
                srcfileList: [],
                formData1:{},
                formData2:{url:""},
                formData3:{},
                tableData:{},
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
                    startprice:[
                        { type: 'string', required: true, message: '请输入起始价格', trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            deleteShowPic(item){
              var that = this
              var businessid = localStorage.getItem("businessid")
              this.tableData.showpic.splice(item,1)
              serviceMongo({
                url: "/businessinfo/update",
                method: "post",
                data:{
                  objid:businessid,
                  showpic:that.tableData.showpic
                }
              }).then(function (res) {
                if (res.data.status= "success"){
                  that.$message.success("删除成功")
                  that.formData2 = {}
                  that.queryList()
                }else{
                  that.$message.error("删除失败")
                  that.formData2 = {}
                  that.queryList()
                }
              })
            },
            deleteTeacher(item){
              console.log(item)
              var that = this
              var businessid = localStorage.getItem("businessid")
              this.tableData.teacherlist.splice(item,1)
              console.log(this.tableData.teacherlist)
              serviceMongo({
                url: "/businessinfo/update",
                method: "post",
                data:{
                  objid:businessid,
                  teacherlist:that.tableData.teacherlist
                }
              }).then(function (res) {
                if (res.data.status= "success"){
                  that.$message.success("删除成功")
                  that.formData3 = {}
                  that.queryList()
                }else{
                  that.$message.error("删除失败")
                  that.formData3 = {}
                  that.queryList()
                }
              })
            },
            addShow(){
              this.dialogVisible2 = true
            },
            uploadSuccess(response){
              var that = this
              that.formData2.url = response
            },
            uploadSuccess2(response){
              var that = this
              that.formData3.picurl = response
            },
            addTeacher(){
              this.dialogVisible3 = true
            },
            copy: function(obj) {
                return JSON.parse(JSON.stringify(obj))
            },
            editShop(item){
                console.log(item)
                this.dialogVisible1 = true
                this.formData1 = this.copy(item)
            },
            close1(){
                this.dialogVisible1 = false
            },
            close2(){
              this.dialogVisible2 = false
              this.formData2 = {}
            },
            close3(){
              this.dialogVisible3 = false
              this.formData3 = {}
            },
            handelConfirm1(){
                var that = this
                if (this.formData1.name!=null&&
                    this.formData1.class!=null&&
                    this.formData1.phonenum!=null&&
                    this.formData1.shortloc!=null&&
                    this.formData1.address!=null&&
                    this.formData1.keyword!=null&&
                    this.formData1.startprice!=null)
                {
                    if (this.formData1.name!=""&&
                        this.formData1.class!=""&&
                        this.formData1.phonenum!=""&&
                        this.formData1.shortloc!=""&&
                        this.formData1.address!=""&&
                        this.formData1.keyword!=""&&
                        this.formData1.startprice!="")
                    {
                        if (typeof(this.formData1.location)=="string"){
                            this.formData1.location = this.formData1.location.split("|")
                            var la = Number(this.formData1.location[0])
                            var lo = Number(this.formData1.location[1])
                            this.formData1.location.coordinates = [la,lo]
                        }
                        var businessid = localStorage.getItem("businessid")
                        serviceMongo({
                            url:"/businessinfo/update",
                            method:"post",
                            data:{
                                objid:businessid,
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
                                startprice:this.formData1.startprice
                            }
                        }).then(function (res) {
                            console.log(res.data)
                            if (res.data.Status=="success"){
                                that.querylist()
                                that.$message.success("更新成功")
                                that.dialogVisible =false
                                that.formData1 = {}
                            }else{
                                that.$message.error("更新失败")
                                that.dialogVisible =false
                                that.fromData1 = {}
                                that.querylist()
                            }
                        })

                    }else{
                        that.$message.warning("有未填内容")
                    }
                }else{
                    that.$message.warning("有未填内容")
                }
            },
            handelConfirm2(){
                var that = this
                if (that.tableData.showpic==null){
                  that.tableData.showpic=[]
                }
                that.tableData.showpic.push(this.formData2.url)
                var businessid = localStorage.getItem("businessid")
                if (that.formData2.url!=""){
                    serviceMongo({
                      url: "/businessinfo/update",
                      method: "post",
                      data:{
                        objid:businessid,
                        showpic:that.tableData.showpic
                      }
                    }).then(function (res) {
                      if (res.data.status= "success"){
                        that.$message.success("更新成功")
                        that.dialogVisible2 = false
                        that.formData2 = {}
                        that.queryList()
                      }else{
                        that.$message.error("更新失败")
                        that.dialogVisible2 =false
                        that.formData2 = {}
                        that.queryList()
                      }
                    })
                }
            },
            handelConfirm3(){
              var that = this
              if (that.tableData.teacherlist==null){
                that.tableData.teacherlist=[]
              }
              that.tableData.teacherlist.push(this.formData3)
              console.log(this.tableData.teacherlist)
              var businessid = localStorage.getItem("businessid")
                serviceMongo({
                  url: "/businessinfo/update",
                  method: "post",
                  data:{
                    objid:businessid,
                    teacherlist:that.tableData.teacherlist
                  }
                }).then(function (res) {
                  if (res.data.status= "success"){
                    that.$message.success("更新成功")
                    that.formData3 = {}
                    that.dialogVisible3 = false
                    that.queryList()
                  }else{
                    that.$message.error("更新失败")
                    that.formData3 = {}
                    that.dialogVisible3 = false
                    that.queryList()
                  }
                })
            },
            handleAvatarSuccess(response, file) {
                var that = this
                that.tempurl = response
                var businessid = localStorage.getItem("businessid")
                if (that.tempurl!=""){
                    serviceMongo({
                        url: "/businessinfo/update",
                        method: "post",
                        data:{
                            objid:businessid,
                            imageurl:that.tempurl,
                        }
                    }).then(function (res) {
                        if (res.data.status= "success"){
                            that.$message.success("更新成功")
                            that.queryList()
                        }else{
                            that.$message.error("更新失败")
                            that.queryList()
                        }
                    })
                }
            },
            beforeAvatarUpload(file) {
                const isPng = file.type === "image/png";
                const isJPG = file.type === "image/jpg";
                const isJPEG = file.type === "image/jpeg";
                if (!isJPG && !isPng && !isJPEG) {
                    this.$message.error("上传图片只能是 JPG或png 格式!");
                    this.fullscreenLoading = false;
                }
                let isRightSize = file.size / 1024 / 1024 < 5
                if (!isRightSize) {
                    this.$message.error('文件大小超过 5MB')
                }
                let isAccept = new RegExp('image/*').test(file.type)
                if (!isAccept) {
                    this.$message.error('应该选择图片类型的文件')
                }
                if (isJPEG){
                    this.temptype = ".jpg"
                }else if (isJPG){
                    this.temptype = ".jpeg"
                }else if (isPng){
                    this.temptype = ".png"
                }
                return isRightSize && isAccept
            },
            querylist(){
                var that =this
                var businessid = localStorage.getItem("businessid")
                serviceMongo({
                    url:"/businessinfo/query?businessid="+businessid,
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
            this.querylist()
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
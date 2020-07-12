<template>
    <div>
        <div style="display: flex;flex-direction: row;width: 100%">
            <div style="margin-bottom: 20px;margin-left: 10px;font-size: 20px;width: 70%">优惠券列表（请按照顺序添加）</div>
            <div style="display: flex;flex-direction: row;justify-content: center;width: 20%">
                <div style="margin-top: 5px">优惠券开关</div>
                <el-switch style="margin-top: 3px;margin-left: 3px"
                        v-model="switchflag"
                        active-color="#13ce66"
                        @change="couponswitch">
                </el-switch>
            </div>
            <div style="width: 10%">
                <el-button type="primary" @click="addCoupon">新增优惠券</el-button>
            </div>
        </div>

        <div v-loading.fullscreen.lock="fullscreenLoading">
            <el-table :data="tableData" border stripe>
                <el-table-column label="预览" width="150" align="center">
                    <template slot-scope="scope">
                        <div style="display: flex;justify-content: center">
                            <el-image style="width: 100px; height: 100px" :src="scope.row.picurl"></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="优惠券积分" width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                type="primary"
                                disable-transitions
                        >{{ scope.row.score }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="优惠券名称" prop="name" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="优惠券数量" prop="num" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.num}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="优惠金额" prop="price" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.discountnum}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteCoupon(scope.row._id)" size="small" type="text"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog  :visible.sync="dialogVisible" title="礼物编辑" width="40%">
                <el-form ref="goodsform" :model="formData" :rules="rules" size="medium" label-width="100px"
                         label-position="left">
                    <el-form-item label="优惠券名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入礼物名" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="优惠券积分" prop="score">
                        <el-input v-model="formData.score" type="number" placeholder="请输入礼物积分" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="优惠券数量" prop="num">
                        <el-input v-model="formData.num" placeholder="请输入礼物数量" type="number" clearable :style="{width: '100%'}">
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
        </div>
    </div>
</template>

<script>
    import serviceMongo from "../../../utils/back-request";

    export default {
        name: "coupon",
        data() {
            return {
                srcAction: 'http://mini.yilianjia.top:9090/group1/upload',
                srcfileList: [],
                dialogVisible:false,
                fullscreenLoading: false,
                tableData: [],
                formData:{},
                tempCoupon: null,
                switchflag:false,
                rules: {
                    name: [
                        { required: true, message: '请输入优惠券的名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3-20 个字符内', trigger: 'blur' }
                    ],
                    score: [
                        { type: 'string',required: true, message: '请输入优惠券积分', trigger: 'blur' }
                    ],
                    num: [
                        { type: 'string', required: true, message: '请输入优惠券数量', trigger: 'blur' }
                    ],
                    discountnum: [
                        { type: 'string', required: true, message: '请输入优惠券金额', trigger: 'blur' }
                    ]
                },
            };
        },
        methods:{
            couponswitch(flag){
                var that =this
                serviceMongo({
                    url:"/ticker/update?flag="+flag,
                    method:"get",
                }).then(function (res) {
                    if (res.data.status= "success"){
                        that.$message.success("切换成功")
                        serviceMongo({
                            url:"/ticker/query",
                            method:"get"
                        }).then(function (res) {
                            that.switchflag = res.data.switch
                        })
                    }else{
                        that.$message.error("切换失败")
                        serviceMongo({
                            url:"/ticker/query",
                            method:"get"
                        }).then(function (res) {
                            that.switchflag = res.data.switch
                        })
                    }
                })
            },
            addCoupon(){
                this.dialogVisible =true
            },
            deleteCoupon(item){
                console.log(item)
                var that =this
                serviceMongo({
                    url: "/membergift/delete?membergiftid="+item,
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
            close(){
                this.fullscreenLoading =false
                this.dialogVisible = false
                this.formData =[]
            },
            queryList(){
                var that = this
                that.fullscreenLoading =true
                serviceMongo({
                    url: "/membergift/query?type=coupon",
                    method: "get",
                }).then(function (res) {
                    if (res.data.Status=="success"){
                        that.tableData=res.data.res
                        that.fullscreenLoading =false
                    }else{
                        that.fullscreenLoading =false
                        that.$message.error("网络请求失败")
                    }
                })
                this.formData = []
            },
            handelConfirm(){
                var that = this
                if (this.formData.score!=null&&this.formData.name!=null&&this.formData.num!=null&&this.formData.discountnum!=null){
                    if (this.formData.score!=""&&this.formData.name!=""&&this.formData.num!=""&&this.formData.discountnum!=""){
                        this.formData.score = Number(this.formData.score)
                        this.formData.discountnum  = Number(this.formData.discountnum)
                        this.formData.num = Number(this.formData.num)
                        this.$refs.src.submit()
                    }else{
                        that.$message.warning("有未填内容")
                    }
                }else{
                    that.$message.warning("有未填内容")
                }

            },
            srcBeforeUpload(file) {
                this.fullscreenLoading = true;
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
            uploadSuccess(response, file, fileList){
                var that = this
                that.tempurl = response
                if (that.tempurl!=""){
                    var that = this
                    serviceMongo({
                        url:"/membergift/insert",
                        method:"post",
                        data:{
                            type:"coupon",
                            picurl:that.tempurl,
                            score:that.formData.score,
                            num:that.formData.num,
                            discountnum:that.formData.discountnum,
                            name:that.formData.name
                        }
                    }).then(function (res) {
                        console.log(res)
                        if (res.data.Status=="success"){
                            that.fullscreenLoading = false
                            that.dialogVisible = false
                            that.$message.success("创建成功")
                        }else{
                            that.fullscreenLoading =false
                            that.$message.error("网络请求失败")
                        }
                        that.queryList()
                    })
                }
            },
        },
        created() {
            var that =this
            this.queryList()
            serviceMongo({
                url:"/ticker/query",
                method:"get"
            }).then(function (res) {
                that.switchflag = res.data.switch
            })
        }
    }
</script>

<style scoped>

</style>
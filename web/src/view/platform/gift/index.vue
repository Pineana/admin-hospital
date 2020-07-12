<template>
    <div>
        <div style="display: flex;flex-direction: row;width: 100%">
            <div style="margin-bottom: 20px;margin-left: 10px;font-size: 20px;width: 95%">礼盒列表（请按照顺序添加）</div>
            <div>
                <el-button type="primary" @click="addGift">新增礼盒</el-button>
            </div>
        </div>
        <div v-loading.fullscreen.lock="fullscreenLoading1">
            <el-table :data="tableData1" border stripe>
                <el-table-column label="礼物积分" width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                type="primary"
                                disable-transitions
                        >{{ scope.row.score }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="礼品详细" prop="name" align="center">
                    <template slot-scope="scope">
                        <ul>
                            <li v-for="(item, index) in scope.row.name" :key="index">{{item}}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteGood(scope.row._id)" size="small" type="text"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog  :visible.sync="dialogVisible1" title="礼盒内容编辑" width="40%">
                <el-form ref="giftform" :model="formData1" :rules="rules2" size="medium" label-width="100px"
                         label-position="left">
                    <el-form-item label="礼物积分" prop="score">
                        <el-input v-model="formData1.score" type="number" placeholder="请输入礼物积分" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="礼物介绍" prop="desc">
                        <el-input type="textarea" v-model="formData1.desc" placeholder="多行内容请用 | 符号分割" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="close1">取消</el-button>
                    <el-button type="primary" @click="handelConfirm1">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <div style="display: flex;flex-direction: row;width: 100%">
            <div style="margin-bottom: 20px;margin-left: 10px;font-size: 20px;width: 95%">礼物兑换列表（请按照顺序添加）</div>
            <div>
                <el-button type="primary" @click="addGood">新增礼物</el-button>
            </div>
        </div>

        <div v-loading.fullscreen.lock="fullscreenLoading2">
            <el-table :data="tableData2" border stripe>
                <el-table-column label="预览" width="150" align="center">
                    <template slot-scope="scope">
                        <div style="display: flex;justify-content: center">
                            <el-image style="width: 100px; height: 100px" :src="scope.row.picurl" :preview-src-list="picList"></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="礼物积分" width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                type="primary"
                                disable-transitions
                        >{{ scope.row.score }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="礼物名" prop="name" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="礼物数量" prop="num" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.num}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="礼物价格" prop="price" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.price}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteGood(scope.row._id)" size="small" type="text"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog  :visible.sync="dialogVisible2" title="礼物编辑" width="40%">
                <el-form ref="goodsform" :model="formData2" :rules="rules" size="medium" label-width="100px"
                         label-position="left">
                    <el-form-item label="礼物名称" prop="name">
                        <el-input v-model="formData2.name" placeholder="请输入礼物名" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="礼物积分" prop="score">
                        <el-input v-model="formData2.score" type="number" placeholder="请输入礼物积分" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="礼物数量" prop="num">
                        <el-input v-model="formData2.num" placeholder="请输入礼物数量" type="number" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="礼物价格" prop="price">
                        <el-input v-model="formData2.price" placeholder="请输入礼物价格" type="number" clearable :style="{width: '100%'}">
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
                    <el-button @click="close2">取消</el-button>
                    <el-button type="primary" @click="handelConfirm2">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import infoList from "@/components/mixins/infoList";
    import { getFileList, deleteFile } from "@/api/fileUploadAndDownload";
    import { downloadImage } from "@/utils/downloadImg";
    import { formatTimeToStr } from "@/utils/data";
    import { store } from '@/store/index';
    import serviceMongo from "../../../utils/back-request";
    export default {
        name: "gift",
        mixins: [infoList],
        data() {
            return {
                srcAction: 'http://mini.yilianjia.top:9090/group1/upload',
                srcfileList: [],
                dialogVisible1:false,
                dialogVisible2:false,
                fullscreenLoading1: false,
                fullscreenLoading2: false,
                listApi: getFileList,
                tableData1: [],
                tableData2:[],
                formData1:{},
                formData2:{},
                tempGoods: null,
                tempGifts:null,
                rules: {
                    name: [
                        { required: true, message: '请输入礼物名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3-20 个字符内', trigger: 'blur' }
                    ],
                    score: [
                        { type: 'string',required: true, message: '请输入礼物积分', trigger: 'blur' }
                    ],
                    num: [
                        { type: 'string', required: true, message: '请输入礼物数量', trigger: 'blur' }
                    ],
                    price: [
                        { type: 'string', required: true, message: '请输入礼物金额', trigger: 'blur' }
                    ]
                },
                rules2:{
                    score: [
                        { type: 'string',required: true, message: '请输入礼盒积分', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入礼盒介绍', trigger: 'blur' },
                    ],
                }
            };
        },
        computed: {
            ...mapGetters("user", ["userInfo", "token"]),
        },
        filters: {
            formatDate: function(time) {
                if (time != null && time != "") {
                    var date = new Date(time);
                    return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
                } else {
                    return "";
                }
            },
        },
        methods: {
            addGood(){
                this.dialogVisible2 =true
            },
            addGift(){
                this.dialogVisible1 =true
            },
            deleteGood(item){
                var that =this
                serviceMongo({
                    url: "/membergift/delete?membergiftid="+item,
                    method: "get",
                }).then(function (res) {
                    if (res.data.Status=="success"){
                        that.$message.success("删除成功")
                        that.queryList2()
                    }else{
                        that.$message.error("网络请求失败")
                    }
                })
            },
            close1(){
                this.fullscreenLoading1 =false
                this.dialogVisible1 = false
                this.formData1 =[]
            },
            close2(){
                this.fullscreenLoading2 =false
                this.dialogVisible2 = false
                this.formData2 = []
                this.srcfileList = []
            },
            queryList1(){
                var that = this
                that.fullscreenLoading1 =true
                serviceMongo({
                    url: "/membergift/query?type=gift",
                    method: "get",
                }).then(function (res) {
                    if (res.data.Status=="success"){
                        that.tableData1=res.data.res
                        that.fullscreenLoading1 =false
                    }else{
                        that.fullscreenLoading1 =false
                        that.$message.error("网络请求失败")
                    }
                })
                this.formData1 = []
            },
            queryList2(){
                var that = this
                that.fullscreenLoading2 =true
                serviceMongo({
                    url: "/membergift/query?type=goods",
                    method: "get",
                }).then(function (res) {
                    console.log(res.data)
                    if (res.data.Status=="success"){
                        that.tableData2=res.data.res
                        that.fullscreenLoading2 =false
                    }else{
                        that.fullscreenLoading2 =false
                        that.$message.error("网络请求失败")
                    }
                })
                this.formData2 = []
                this.srcfileList = []
            },
            handelConfirm1(){
                var that = this
                if (this.formData1.score!=null&&this.formData1.desc!=null){
                    if (this.formData1.score!=""&&this.formData1.desc!=""){
                        var name = that.formData1.desc.split('|')
                        serviceMongo({
                            url:"/membergift/insert",
                            method:"post",
                            data:{
                                type:"gift",
                                name:name,
                                score:that.formData1.score
                            }
                        }).then(function (res) {
                            console.log(res)
                            if (res.data.Status=="success"){
                                that.fullscreenLoading1 = false
                                that.dialogVisible1 = false
                                that.$message.success("更新成功")
                            }else{
                                that.fullscreenLoading1 =false
                                that.$message.error("网络请求失败")
                            }
                            that.queryList1()
                        })
                    }else{
                        that.$message.warning("有未填内容")
                    }
                }else{
                    that.$message.warning("有未填内容")
                }

            },
            handelConfirm2(){
                console.log(this.formData2)
                if (this.formData2.num!=null&&this.formData2.score!=null&&this.formData2.price!=null&&this.formData2.name!=null){
                    if (this.formData2.num!=""&&this.formData2.score!=""&&this.formData2.price!=""&&this.formData2.name!=""){
                        this.formData2.score = Number(this.formData2.score)
                        this.formData2.price  = Number(this.formData2.price)
                        this.formData2.num = Number(this.formData2.num)
                        this.$refs.src.submit()
                    }else{
                        this.$message.warning("有未填内容")
                    }
                }else{
                    this.$message.warning("有未填内容")
                }
            },
            srcBeforeUpload(file) {
                this.fullscreenLoading2 = true;
                const isPng = file.type === "image/png";
                const isJPG = file.type === "image/jpg";
                const isJPEG = file.type === "image/jpeg";
                if (!isJPG && !isPng && !isJPEG) {
                    this.$message.error("上传图片只能是 JPG或png 格式!");
                    this.fullscreenLoading2 = false;
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
                console.log(that.tempurl)
                if (that.tempurl!=""){
                    var that = this
                    serviceMongo({
                        url:"/membergift/insert",
                        method:"post",
                        data:{
                            type:"goods",
                            picurl:that.tempurl,
                            score:that.formData2.score,
                            num:that.formData2.num,
                            price:that.formData2.price,
                            name:that.formData2.name
                        }
                    }).then(function (res) {
                        console.log(res)
                        if (res.data.Status=="success"){
                            that.fullscreenLoading2 = false
                            that.dialogVisible2 = false
                            that.$message.success("更新成功")
                        }else{
                            that.fullscreenLoading2 =false
                            that.$message.error("网络请求失败")
                        }
                        that.queryList2()
                    })
                }
            },
        },
        created() {
            this.queryList1()
            this.queryList2()
        },
    };
</script>

<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
            <el-table :data="tableData" border stripe>
                <el-table-column label="预览" width="300" align="center">
                    <template slot-scope="scope">
                        <div style="display: flex;justify-content: center">
                        <el-image style="width: 300px; height: 100px" :src="scope.row.src" :preview-src-list="picList"></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新日期" prop="UpdatedAt" width="200" align="center">
                    <template slot-scope="scope">
                        <div>{{ scope.row.updatetime }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="索引" type="index" width="80" align="center"></el-table-column>
                <el-table-column label="导航链接" prop="url" align="center"></el-table-column>
                <el-table-column label="标签" prop="tag" width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.type === 'jpg' ? 'primary' : 'success'"
                                disable-transitions
                        >{{ scope.row.type }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button @click="updateBanner(scope.row,scope.$index)" size="small" type="text"
                        >更新</el-button
                        >
                        <el-link :href="scope.row.src">
                        <el-button size="small" type="text">下载</el-button>
                        </el-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog  :visible.sync="dialogVisible" title="广告栏编辑">
                <el-form ref="bannerform" :model="formData"  size="medium" label-width="100px"
                         label-position="left">
                    <el-form-item label="链接地址" prop="url">
                        <el-input v-model="formData.url" placeholder="请输入链接地址:请带上https:// 前缀" clearable prefix-icon='el-icon-s-promotion'
                                  :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="图片上传" prop="src" required>
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
</template>

<script>
    import { mapGetters } from "vuex";
    import infoList from "@/components/mixins/infoList";
    import { getFileList, deleteFile } from "@/api/fileUploadAndDownload";
    import { downloadImage } from "@/utils/downloadImg";
    import { formatTimeToStr } from "@/utils/data";
    import { store } from '@/store/index';
    import serviceMongo from "../../../utils/back-request";
    import serviceFile from "../../../utils/file-request";
    const path = store.fileServerURL;
    export default {
        name: "Upload",
        mixins: [infoList],
        data() {
            return {
                tempindex:null,
                temptype:"",
                dialogVisible:false,
                fullscreenLoading: false,
                listApi: getFileList,
                path: path,
                tableData: [],
                formData:{},
                srcAction: 'http://mini.yilianjia.top:9090/group1/upload',
                srcfileList: [],
                picList:[],
                tempurl:"",
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
            updateBanner(item,index){
                this.tempindex = index.toString()
                this.dialogVisible = true
            },
            srcBeforeUpload(file) {
                this.fullscreenLoading = true;
                const isPng = file.type === "image/png";
                const isJPG = file.type === "image/jpg";
                const isJPEG = file.type === "image/jpeg";
                if (!isJPG && !isPng && !isJPEG) {
                    this.$message.error("上传头像图片只能是 JPG或png 格式!");
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
            close(){
                this.dialogVisible = false
            },
            handelConfirm(){
                this.$refs.src.submit()
            },
            uploadSuccess(response, file, fileList){
                var that = this
                that.tempurl = response
                if (that.tempurl!=""){
                    serviceMongo({
                        url: "/index/bannerupdate",
                        method: "post",
                        data:{
                            src:that.tempurl,
                            url:that.formData.url,
                            index:that.tempindex,
                            type:that.temptype,
                        }
                    }).then(function (res) {
                        if (res.data.status= "success"){
                            that.dialogVisible = false
                            that.fullscreenLoading = false
                            that.$message.success("更新成功")
                            that.queryList()
                        }else{
                            that.dialogVisible = false
                            that.fullscreenLoading =false
                            that.$message.error("更新失败")
                            that.queryList()
                        }
                    })
                }
            },
            queryList(){
                var that = this
                serviceMongo({
                    url: "/index/bannerquery",
                    method: "get",
                }).then(function (res) {
                    that.tableData=res.data.res.banner
                    that.formData = {}
                    that.srcfileList = []
                })
            }
        },
        created() {
            var that = this
            serviceMongo({
                url: "/index/bannerquery",
                method: "get",
            }).then(function (res) {
                that.tableData=res.data.res.banner
                for (var i=0;i<5;i++){
                    that.picList.push(that.tableData[i].src)
                }
                console.log(that.picList)
            })
        },
    };
</script>

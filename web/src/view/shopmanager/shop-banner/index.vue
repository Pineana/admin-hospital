<template>
    <div>
        <div class="top">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px">店铺信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text">编辑页面</el-button>
                </div>
                <div style="display: flex;flex-direction: row;justify-content: space-around">
                    <div style="width: 25%;">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div style="width: 75%">
                        <el-row>
                            <el-col :span="4"><div>店名</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                            <el-col :span="4"><div>评分</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                            <el-col :span="4"><div>类别</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>经纬度</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                            <el-col :span="4"><div>电话</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                            <el-col :span="4"><div>起始价</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div>所在区域</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                            <el-col :span="4"><div>详细地址</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                            <el-col :span="4"><div>店长寄语</div></el-col>
                            <el-col :span="4"><div></div></el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import serviceMongo from "../../../utils/back-request";

    export default {
        name: "index",
        data() {
            return {
                imageUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        created() {
            console.log(1)
            var that =this
            this.fullscreenLoading =true
            var businessid = localStorage.getItem("businessid")
            console.log(businessid)
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
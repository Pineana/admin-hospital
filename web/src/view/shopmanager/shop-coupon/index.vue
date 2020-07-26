<template>
    <div>
        <div style="display: flex;flex-direction: row;width: 100%">
            <div style="margin-bottom: 20px;margin-left: 10px;font-size: 20px;width: 70%">优惠券列表</div>
            <div style="display: flex;flex-direction: row;justify-content: center;width: 20%">
            </div>
            <div style="width: 10%">
                <el-button type="primary" @click="addCoupon">新增优惠券</el-button>
            </div>
        </div>

        <div v-loading.fullscreen.lock="fullscreenLoading">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="优惠券名称" prop="name" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top-start">
                            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.name}}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="优惠券标题" prop="title" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top-start">
                            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.title}}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" prop="starttime" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.starttime" placement="top-start">
                            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.starttime}}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" prop="endtime" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.endtime" placement="top-start">
                            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.endtime}}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="优惠券类型" prop="showtype" align="center" width="100px">
                    <template slot-scope="scope">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.showtype?'满减':'折扣'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="折扣数" prop="discountnum" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.discountnum" placement="bottom">
                            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.discountnum}}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="限制金额" prop="limit" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-tag type="primary" disable-transitions>
                            {{ scope.row.limit }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="使用说明" prop="usedescribe" align="center">
                </el-table-column>
                <el-table-column label="条件说明" prop="condition" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteCoupon(scope.row._id)" >
                            <el-button size="small" type="danger" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog  :visible.sync="dialogVisible" title="礼物编辑" width="40%">
                <el-form ref="goodsform" :model="formData" :rules="rules" size="medium" label-width="100px"
                         label-position="left">
                    <el-form-item label="优惠券名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入优惠券名称" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="优惠券标题" prop="title">
                        <el-input v-model="formData.title" placeholder="请输入优惠券标题" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="优惠券类型" prop="showtype">
                        <template>
                            <el-radio v-model="formData.showtype" :label=true>满减</el-radio>
                            <el-radio v-model="formData.showtype" :label=false>折扣</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="折扣数" prop="discountnum">
                        <el-input v-model="formData.discountnum" placeholder="请输入折扣数" type="number" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="限制金额" prop="limit">
                        <el-input v-model="formData.limit" placeholder="请输入限制金额" type="number" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="优惠券标题" prop="title">
                        <el-input v-model="formData.title" placeholder="请输入优惠券标题" type="string" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="使用说明" prop="usedescribe">
                        <el-input v-model="formData.usedescribe" placeholder="请输入使用说明" type="string" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="使用条件" prop="condition">
                        <el-input v-model="formData.condition" placeholder="请输入使用条件" type="string" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="时间" prop="starttime">
                        <el-date-picker
                                v-model="formData.startandendtime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
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
                    discountnum: [
                        { type: 'string',required: true, message: '请输入折扣数', trigger: 'blur' }
                    ],
                    limit: [
                        { type: 'string', required: true, message: '请输入限制金额', trigger: 'blur' }
                    ],
                    title: [
                        { type: 'string', required: true, message: '请输入优惠券标题', trigger: 'blur' }
                    ],
                    usedescribe: [
                        { type: 'string', required: true, message: '请输入使用说明', trigger: 'blur' }
                    ],
                    condition: [
                        { type: 'string', required: true, message: '请输入使用条件', trigger: 'blur' }
                    ]
                },
            };
        },
        methods:{
            addCoupon(){
                this.dialogVisible =true
            },
            deleteCoupon(item){
                console.log(item)
                var that =this
                serviceMongo({
                    url: "/businesscoupon/delete?bscouponid="+item,
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
                var businessid = localStorage.getItem("businessid")
                that.fullscreenLoading =true
                serviceMongo({
                    url: "/businesscoupon/query?businessid="+businessid,
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
                var businessid = localStorage.getItem("businessid")
                var starttime = this.formData.startandendtime[0]
                var endtime = this.formData.startandendtime[1]
                serviceMongo({
                    url: "/businesscoupon/insert",
                    method: "post",
                    data:{
                        name:this.formData.name,
                        title:this.formData.title,
                        businessid:businessid,
                        starttime:starttime,
                        endtime:endtime,
                        showtype:this.formData.showtype,
                        discountnum:this.formData.discountnum,
                        usedescribe:this.formData.usedescribe,
                        condition:this.formData.condition,
                        limit:this.formData.limit,
                        suitstore:1
                    }
                }).then(function (res) {
                    if (res.data.Status=="success"){
                        that.tableData=res.data.res
                        that.fullscreenLoading =false
                        that.dialogVisible = false
                        that.formData = {}
                        that.$message.success("插入成功")
                        that.queryList()
                    }else{
                        that.fullscreenLoading =false
                        that.dialogVisible = false
                        that.$message.error("网络请求失败")
                    }
                })
            }
        },
        created() {
            var that =this
            this.queryList()
        }
    }
</script>

<style scoped>

</style>
<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期" prop="time" width="100">
            </el-table-column>
            <el-table-column label="姓名" prop="name" width="80">
            </el-table-column>
            <el-table-column label="性别" prop="sex" width="50">
            </el-table-column>
            <el-table-column label="手机号" prop="mobile" width="120">
            </el-table-column>
            <el-table-column label="备用手机号" prop="mobileback" width="120">
            </el-table-column>
            <el-table-column label="邮箱" prop="email" width="180">
            </el-table-column>
            <el-table-column label="地址" prop="location" width="250">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.location" placement="top-start">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{scope.row.location}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="个体工商户注册号" prop="businessid" width="140">
            </el-table-column>
            <el-table-column align="center" prop="status" width="180">
                <template slot="header" slot-scope="scope">
                    <div style="display: flex;flex-direction: column;justify-content: center">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </template>
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status == 0 ? 'danger' : 'success'"
                            disable-transitions
                    >{{ scope.row.status == 0 ? "未处理":"已完成" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="finish(scope.row._id)" size="small" icon="el-icon-check">完成</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total" page-size="10">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import serviceMongo from "../../utils/back-request";

    export default {
        name: 'Table',
        data() {
            return {
                fullscreenLoading: false,
                tableData: [],
                options: [{
                    value: 0,
                    label: '未处理'
                }, {
                    value: 1,
                    label: '已处理'
                }],
                value: 0,
                total:0,
            }
        },
        methods: {

        },
        created() {
            this.fullscreenLoading = true
            var that = this
            serviceMongo({
                url: "/businessin/query?status=0&page=1&limit=10",
                method: "get",
            }).then(function (res) {
                if (res.data.status= "success"){
                    that.fullscreenLoading = false
                    that.tableData=res.data.res
                    that.total = res.data.total
                }else{
                    that.$message.success("网络错误")
                    that.fullscreenLoading = false
                }
            })
        }
    }
</script>
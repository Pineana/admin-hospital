<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="2" :offset="22" >
                <el-button type="primary">添加店铺</el-button>
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
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="店铺名称">
                                    <span>{{ props.row.shop }}</span>
                                </el-form-item>
                                <el-form-item label="店铺评分">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="评论人数">
                                    <span>{{ props.row.shopId }}</span>
                                </el-form-item>
                                <el-form-item label="联系电话">
                                    <span>{{ props.row.category }}</span>
                                </el-form-item>
                                <el-form-item label="课程">
                                    <span>{{ props.row.address }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述">
                                    <span>{{ props.row.desc }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="店铺 ID"
                            prop="id">
                    </el-table-column>
                    <el-table-column
                            label="店铺名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            prop="desc">
                        <el-button @click="editShopInfo" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

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

<script>
    export default {
        data() {
            return {
                tableData: [{
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }]
            }
        },
        methods:{}
    }
</script>
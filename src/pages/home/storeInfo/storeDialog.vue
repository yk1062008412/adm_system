<!--
 * @Author: yk1062008412
 * @Date: 2019-12-04 22:36:35
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-16 21:42:05
 * @Description: store 新增编辑弹框
 -->
<template>
  <div>
    <el-form ref="formData" :rules="formRule" :model="formData" label-width="80px" size="small">
      <el-row>
        <el-col :span="8" v-if="dialogStatus === 'edit'">
          <el-form-item label="商品ID">
            <span>{{ goodsId }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="formData.goodsName" placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品分类" prop="categoryId">
            <el-select v-model="formData.categoryId" filterable placeholder="请选择商品分类" class="select-container">
              <el-option
                v-for="item in categoryList"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进价" prop="stockPrice">
            <el-input v-model="formData.stockPrice" placeholder="请输入进价" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原价" prop="costPrice">
            <el-input v-model="formData.costPrice" placeholder="请输入原价" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="折扣价" prop="offPrice">
            <el-input v-model="formData.offPrice" placeholder="请输入折扣价" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="库存" prop="stock">
            <el-input-number v-model.number="formData.stock" placeholder="请输入库存" class="select-container" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序" prop="goodsIndex">
            <el-input-number v-model.number="formData.goodsIndex" controls-position="right" placeholder="请输入排序" class="select-container" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="goodsStatus">
            <el-select v-model="formData.goodsStatus" class="select-container">
              <el-option :value="0" label="下架" />
              <el-option :value="1" label="上架" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品描述" prop="goodsDesc">
            <el-input v-model="formData.goodsDesc" placeholder="请输入商品描述" :maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input v-model="formData.comments" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品图片" required>
            <img-upload :img-url="formData.goodsImgUrl" @picUploadSuccess="uploadSuccess"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="button-group">
        <el-button v-if="dialogStatus === 'add'" type="primary" size="small" @click="addStore">确 定</el-button>
        <el-button v-else type="primary" size="small" @click="editStore">确 定</el-button>
        <el-button type="primary" size="small" @click="cancelOperate">取 消</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import imgUpload from '@/components/imgUpload/index';
import { addStoreItem, getGoodsDetail, goodsUpdate } from "@/api/home/storeInfo";
import { FILEURL } from '@/config/config.js';
export default {
  props: {
    categoryList: {
      type: Array,
      required: true
    },
    dialogStatus: {
      type: String,
      default: 'add'
    },
    goodsId: {
      type: Number
    }
  },
  components: {
    imgUpload
  },
  mounted() {
    if(this.dialogStatus === 'edit'){
      this.getGoodsInfo(this.goodsId);
    }
  },
  data() {
    // 价格校验
    const checkPrice = (rule, value, callback) => {
      if(!value) {
        callback();
      }
      if(!(/^[0-9]+(.[0-9]{1,2})?$/.test(value))){
        callback(new Error('请输入正确的金额'));
      }else{
        callback();
      }
    }
    // 库存为正整数或0校验
    const checkStork = (rule, value, callback) => {
      if(!value){
        callback();
      }
      if(!Number.isInteger(value)){
        callback(new Error('库存数只能为整数数字'));
      }else if(+value < 0){
        callback(new Error('库存数不能小于0'));
      }else{
        callback();
      }
    }
    return {
      formData: {
        categoryId: '',
        goodsName: '',
        stockPrice: '',
        costPrice: '',
        offPrice: '',
        goodsDesc: '',
        stock: '',
        goodsImgUrl: '',
        imgUrlId: '',
        goodsIndex: '',
        goodsStatus: 0,
        comments: ''
      },
      formRule: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在1-30个字符之间', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        stockPrice: [
          { validator: checkPrice, trigger: 'blur'}
        ],
        costPrice: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur'}
        ],
        offPrice: [
          { validator: checkPrice, trigger: 'blur'}
        ],
        goodsDesc: [
          { min: 1, max: 50, message: '长度在1-50个字符之间', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { validator: checkStork, trigger: 'blur'}
        ],
        goodsIndex: [
          { type: 'number', message: '必须为数字值'}
        ],
        goodsStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    addStore() { // 添加商品
      this.$refs['formData'].validate((valid) => {
        if(!valid){
          return false;
        }
        if(!this.formData.goodsImgUrl){
          this.$notify({
            title: '提示',
            message: '请上传商品图片',
            type: 'warning'
          });
          return false;
        }
        // add操作
        addStoreItem(this.formData).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.$emit('handleSuccess');
          }
        })
      })
    },
    cancelOperate() { // 取消操作
      this.$emit('handleCancel');
    },
    uploadSuccess(data) { // 图片上传成功
      const {file_id, file_url} = data;
      this.formData.goodsImgUrl = FILEURL + file_url;
      this.formData.imgUrlId = file_id;
    },
    getGoodsInfo(goodsId){
      getGoodsDetail({goodsId: goodsId}).then(({ data }) => {
        const param = {
          categoryId: data.category_id,
          goodsName: data.goods_name,
          stockPrice: data.stock_price || '',
          costPrice: data.cost_price,
          offPrice: data.off_price,
          goodsDesc: data.goods_desc,
          stock: data.stock,
          goodsImgUrl: data.goods_img_url,
          imgUrlId: data.img_url_id,
          goodsIndex: data.goods_index,
          goodsStatus: data.goods_status,
          comments: data.comments
        }
        Object.assign(this.formData, param);
      })
    },
    editStore() { // 编辑商品
      this.$refs['formData'].validate((valid) => {
        if(!valid){
          return false;
        }
        if(!this.formData.goodsImgUrl){
          this.$notify({
            title: '提示',
            message: '请上传商品图片',
            type: 'warning'
          });
          return false;
        }
        const param = {
          ...this.formData,
          goodsId: this.goodsId
        }
        // add操作
        goodsUpdate(param).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.$emit('handleSuccess');
          }
        })
      })
    }
  },
}
</script>

<style lang="less" scoped>
.select-container{
  width: 100%;
}
.button-group{
  margin-top: 20px;
  text-align: center;
}
</style>

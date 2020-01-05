<!--
 * @Author: yk1062008412
 * @Date: 2020-01-05 13:01:24
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-05 16:07:47
 * @Description: banner 新增，编辑
 -->
<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="120px" size="small">
      <el-alert
        title="banner图片建议尺寸为 375px * 150px"
        :closable="false"
        type="warning"
        class="form-warning">
      </el-alert>
      <el-form-item label="banner图ID" v-if="dialogType === 'edit'">
        <span>{{ bannerId }}</span>
      </el-form-item>
      <el-form-item label="banner状态" prop="bannerStatus">
        <el-select v-model="formData.bannerStatus" placeholder="请选择上下线状态" class="select-width">
          <el-option label="下线" :value="0" />
          <el-option label="上线" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="banner排序" prop="bannerIndex">
        <el-input-number v-model.number="formData.bannerIndex" controls-position="right" placeholder="请输入排序" class="select-width" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.comments" />
      </el-form-item>
      <el-form-item label="banner图片" required>
        <img-upload :img-url="formData.bannerImgUrl" @picUploadSuccess="uploadSuccess"/>
      </el-form-item>
      <el-row class="button-group">
        <el-button v-if="dialogType === 'add'" type="primary" size="small" @click="addBanner">确 定</el-button>
        <el-button v-else type="primary" size="small" @click="editBanner">确 定</el-button>
        <el-button type="primary" size="small" @click="cancelOperate">取 消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import imgUpload from '@/components/imgUpload/index';
import { addBannerItem, getBannerInfo, updateBannerItem } from "@/api/home/bannerSetting";
import { FILEURL } from '@/config/config.js';
export default {
  props: {
    dialogType: {
      type: String,
      default: 'add'
    },
    bannerId: {
      type: Number
    }
  },
  components: {
    imgUpload
  },
  mounted() {
    if(this.dialogType === 'edit'){
      this.getBannerDetail(this.bannerId);
    }
  },
  data() {
    return {
      formData: {
        bannerImgUrl: '',
        bannerStatus: 0,
        bannerIndex: 0,
        imgUrlId: '',
        comments: ''
      }
    }
  },
  methods: {
    uploadSuccess (data) { // 图片上传成功
      const {file_id, file_url} = data;
      this.formData.bannerImgUrl = FILEURL + file_url;
      this.formData.imgUrlId = file_id;
    },
    addBanner () { // 添加banner图
      if(!this.formData.bannerImgUrl){
        this.$notify({
          title: '提示',
          message: '请上传banner图片',
          type: 'warning'
        });
        return false;
      }
      // add操作
      addBannerItem(this.formData).then(({ code }) => {
        if(code === 0){
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.$emit('handleSuccess');
        }
      })
    },
    editBanner () { // 编辑修改banner
      if(!this.formData.bannerImgUrl){
        this.$notify({
          title: '提示',
          message: '请上传banner图片',
          type: 'warning'
        });
        return false;
      }
      const param = {
        ...this.formData,
        bannerId: this.bannerId
      }
      // add操作
      updateBannerItem(param).then(({ code }) => {
        if(code === 0){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.$emit('handleSuccess');
        }
      })
    },
    getBannerDetail(bannerId){
      getBannerInfo({bannerId: bannerId}).then(({ data }) => {
        const param = {
          bannerImgUrl: data.banner_img_url,
          bannerStatus: data.banner_status,
          bannerIndex: data.banner_index,
          imgUrlId: data.img_url_id,
          comments: data.comments
        }
        Object.assign(this.formData, param);
      })
    },
    cancelOperate () { // 取消操作
      this.$emit('handleCancel');
    }
  }
}
</script>
<style lang="less" scoped>
.form-warning{
  margin-bottom: 20px;
}
.select-width{
  width: 100%;
}
.button-group{
  margin-top: 20px;
  text-align: center;
}
</style>
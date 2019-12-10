<!--
 * @Author: yk1062008412
 * @Date: 2019-12-07 20:46:50
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-09 22:21:26
 * @Description: 图片上传组件
 -->

<template>
  <div class="pic-upload">
    <div v-if="imgUrl" class="pic-container">
      <img :src="imgUrl" class="pic-img">
      <div class="img-label label-toolbar">
        <a :href="imgUrl" target="blank">
          <i class="el-icon-zoom-in"/>
        </a>
        <el-upload
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :before-upload="beforePicUpload"
          class="refresh-upload"
          name="upload"
          :action="fileUPloadUrl"
          :headers="authHeader"
        >
          <i class="el-icon-refresh"/>
        </el-upload>
      </div>
    </div>
    <el-upload
      v-else
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforePicUpload"
      class="pic-container"
      name="upload"
      :action="fileUPloadUrl"
      :headers="authHeader"
    >
      <div class="pic-plus-area">
        <i class="el-icon-plus pic-uploader-icon" />
      </div>
    </el-upload>
    <!-- 图片大图 -->
    <div v-if="showImgViewer">
      <el-image-viewer
        v-if="showImgViewer && imgUrl"
        :on-close="closeViewer"
        :url-list="[imgUrl]" />
    </div>
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
import { REQUESTURL } from '@/config/config.js';
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  components: {
    ElImageViewer
  },
  data() {
    const token = `Bearer ${localStorage.getItem('_token_')}`;
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      showImgViewer: false,
      fileUPloadUrl: '',
      authHeader: {
        'Authorization': token
      }
    }
  },
  created() {
    this.fileUPloadUrl = REQUESTURL + 'file/uploadFile';
  },
  methods: {
    beforePicUpload(file) {
      const allowFileType = ['image/jpeg', 'image/png', 'image/gif']
      const isJPG = allowFileType.includes(file.type)
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、GIF、PNG 格式!')
      }
      return isJPG
    },
    handleUploadSuccess(res) {
      if (res.code === 0) {
        const data = res.data;
        this.$emit('picUploadSuccess', data)
      } else {
        this.$message.error(res.bstatus.des)
      }
    },
    handleViewer() { // 开启预览
      this.showImgViewer = !this.showImgViewer
    },
    closeViewer() { // 关闭预览
      this.showImgViewer = !this.showImgViewer
    }
  }
}
</script>

<style lang="less" scoped>
.pic-upload{
  width: 90%;
  margin: 0 auto;
  .pic-container{
    overflow: hidden;
    background-color: #fff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .pic-img{
      max-width: 100%;
      max-height: 150px;
    }
    .img-label{
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .5);
      height: 100%;
      width: 100%;
      color: #fff;
      text-align: center;
      font-size: 20px;
      line-height: 150px;
      i {
        cursor: pointer;
        padding: 3px;
        margin: 3px;
      }
      .refresh-upload{
        display: inline;
      }
    }
    &:hover .label-toolbar{
      display: block;
    }
    .pic-plus-area{
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      .pic-uploader-icon{
        font-size: 30px;
      }
    }
  }
}
</style>


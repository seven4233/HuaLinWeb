<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息</Button>
  </CollapseContainer>
</template>
<script lang="ts">
import { Button, Row, Col } from "ant-design-vue";
import { computed, defineComponent, onMounted } from "vue";
import { BasicForm, useForm } from "/@/components/Form/index";
import { CollapseContainer } from "/@/components/Container";
import { CropperAvatar } from "/@/components/Cropper";

import { useMessage } from "/@/hooks/web/useMessage";

import headerImg from "/@/assets/images/header.jpg";
import { baseSetschemas } from "./data";
import { useUserStore } from "/@/store/modules/user";
import { uploadApi } from "/@/api/sys/upload";
import { UserInfo } from "#/store";

export default defineComponent({
  components: {
    BasicForm,
    CollapseContainer,
    Button,
    ARow: Row,
    ACol: Col,
    CropperAvatar
  },
  setup() {
    const { createMessage } = useMessage();
    const userStore = useUserStore();

     // const redo =  useRedo()
    const [register,  { setFieldsValue, validate }] = useForm({
      labelWidth: 120,
      schemas: baseSetschemas,
      showActionButtonGroup: false
    });

    onMounted(async () => {
      await setFieldsValue(userStore.userInfo!);
    });

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo;
      console.log(userStore.getUserInfo);
      return avatar || headerImg;
    });

      function updateAvatar() {
        userStore.getUserInfoAction();
      }

    return {

      avatar,
      register,
      uploadApi: uploadApi as any,
      updateAvatar,
      handleSubmit: async () => {
        // 更新用户信息的接口
        const userInfo = await  validate()

        const res = await userStore.updateUserInfo(userInfo as UserInfo);
        await userStore.getUserInfoAction()
        createMessage.success(res.message);
      }
    };
  }
});
</script>

<style lang="less" scoped>
.change-avatar {
  img {
    display: block;
    margin-bottom: 15px;
    border-radius: 50%;
  }
}
</style>

<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          :sendCodeApi="sendCode"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"

        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ "登录 / 注册" }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useUserStore } from "@/store/modules/user";
  import { sendCodeAPI } from "@/api/sys/user";
  import { validatePhoneNumber } from "@/utils/validate";
  import { useMessage } from "@/hooks/web/useMessage";
  import { prefixCls } from "@/settings/designSetting";
  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const userStore = useUserStore()
  const formData = reactive({
    mobile: '',
    sms: '',
  });

  const { validForm} = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);
  const {createMessage, notification,createErrorModal} = useMessage()
  async function sendCode():Promise<boolean>{
    console.log(formData.mobile);
    // 参数校验
    if (!validatePhoneNumber(formData.mobile) ){
        createMessage.error("请输入正确的手机号")
       return false
    }
    let res = await sendCodeAPI({mobile: formData.mobile,mode:'login' })
    if(res.code === 0 ){
      createMessage.success(res.message)
      return true
    }else {
      createMessage.error(res.message)
      return false
    }
  }
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try{
      loading.value = true
      let userInfo =  await userStore.loginByMobileAction(data)
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName ||userInfo.username || userInfo.account}`,
          duration: 3,
        });
      }
    }catch (error){
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as any).response.data.message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    }finally {
      loading.value = false
    }
    // 处理登录逻辑


  }
</script>

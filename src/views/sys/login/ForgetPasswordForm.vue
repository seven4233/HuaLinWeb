<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x"  />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          :sendCodeApi="sendCode"
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';
  import { useAdminStore } from "@/store/modules/adminStore";
  import { useMessage } from "@/hooks/web/useMessage";
  import { validatePhoneNumber } from "@/utils/validate";
  import { sendCodeAPI } from "@/api/sys/user";

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const adminStore = useAdminStore()
  const {createMessage} = useMessage()
  const formData = reactive({
    account: '',
    mobile: '',
    sms: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);


  async function sendCode():Promise<boolean>{
    console.log(formData.mobile);
    // 参数校验
    if (!validatePhoneNumber(formData.mobile) ){
      createMessage.error("请输入正确的手机号")
      return false
    }
    let res = await sendCodeAPI({mobile: formData.mobile,mode:'reset' })
    if(res.code!==0){
       createMessage.error(res.message)
       return false
    }
    createMessage.success(res.message)
    return true
  }

  async function handleReset() {
    const form = unref(formRef);
    if (!form) return;
    // 重置密码的操作
    const res:any = await adminStore.resetPassAction(formData)
    if(res.code!==0 ){
      return createMessage.error(res.message)
    }
    createMessage.success(res.message)
    await form.resetFields();
  }
</script>

<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
  import { useAdminStore } from "@/store/modules/adminStore";
  import { useMessage } from "@/hooks/web/useMessage";
  import { useUserStore } from "@/store/modules/user";

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const {createMessage} = useMessage()
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        baseColProps: { span: 24 },
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      const userStore = useUserStore()

    const adminStore = useAdminStore()
      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;
          // TODO custom api
          let res:any
          if(passwordOld){
            res =  await adminStore.updatePassAction(values)
          }else{
            res= await adminStore.setPassAction({ password: passwordNew })
          }

          if(res.code === 0 ){
              createMessage.success(res.message)
          }else {
            createMessage.error(res.message)
            return
          }
          console.log(passwordOld, passwordNew);
          userStore.logout(true)
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>

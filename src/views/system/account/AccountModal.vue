<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit"  :destroyOnClose="true">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './account.data';
  import { isAccountExist } from "@/api/sys/system";
  import { useAdminStore } from "@/store/modules/adminStore";

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, getFieldsValue,updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        updateSchema([
          {
            field: 'password',
            show: !unref(isUpdate),
          },
          {
            field:'account',
            rules: [
              {
                required: true,
                message: '请输入账号',
              },
              {
                min:4,
                max:12,
                message:'账号的长度为4-12'
              },
              {
                validator: async(_, value) =>{
                  let userInfo =  getFieldsValue()
                  let res = await isAccountExist(userInfo as any, unref(isUpdate))
                  if(res.code===-1){
                    return Promise.reject(res.message)
                  }else{
                    return Promise.resolve()
                  }
                },
              },
            ],
          }
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));
      const adminStore = useAdminStore()
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          //
          if(unref(isUpdate)){
            await adminStore.updateAccountAction(values)
          }else{
            await adminStore.createAccountAction(values)
          }
          console.log(values);
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

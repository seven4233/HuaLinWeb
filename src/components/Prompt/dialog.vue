<template>
  <Modal
    v-model:visible="visible"
    :title="title"
    @ok="handleSubmit"
    :destroyOnClose="true"
    :width="width || '500px'"
    okText="确定"
    cancelText="取消"
  >
    <div class="pt-5 pr-3px">
      <BasicForm @register="register" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { FormSchema } from '/@/components/Form';
  import { BasicForm, useForm } from '/@/components/Form/index';

  const visible = ref<boolean>(true);
  const props = defineProps<{
    title: string;
    addFormSchemas: FormSchema[];
    onOK?: Fn;
    width?: string;
    labelWidth?: number;
    layout?: 'horizontal' | 'vertical' | 'inline';
  }>();

  const [register, { validate }] = useForm({
    schemas: props.addFormSchemas,
    showActionButtonGroup: false,
    labelWidth: props.labelWidth || 80,
    layout: props.layout || 'horizontal',
  });

  async function handleSubmit() {
    const row = await validate();
    if (props.onOK) {
      await props.onOK(row.txt);
    }
    visible.value = false;
  }
</script>

<style scoped></style>

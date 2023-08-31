<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getRoleListByPage } from '@/api/sys/system';

  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from "@/views/system/role/RoleDrawer.vue";

  import { columns, searchFormSchema } from './role.data';
  import { usePermission } from "@/hooks/web/usePermission";
  import { RoleEnum } from "@/enums/roleEnum";
  import { useMessage } from "@/hooks/web/useMessage";

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const {hasPermission} = usePermission()
      const {createMessage} = useMessage()
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleListByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        if(!hasPermission(RoleEnum.SUPER)){
          return  createMessage.error("您没有操作权限")
        }
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        if(!hasPermission(RoleEnum.SUPER)){
          return  createMessage.error("您没有操作权限")
        }
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        if(!hasPermission(RoleEnum.SUPER)){
          return  createMessage.error("您没有操作权限")
        }
        console.log(record);
      }
      // 提交修改
     async function handleSuccess(record:Recordable) {
        // const res = await adminStore.updateRoleAction()
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

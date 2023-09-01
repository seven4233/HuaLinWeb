import { getAllRoleList } from '@/api/sys/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { formatToDateTime } from "@/utils/dateUtil";
import { h } from "vue";

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
    width: 120,

  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 60,
    customRender({text}){
      return h('img', {src:text, style:{width:'30px',borderRadius:'50%'} })
    }
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 140,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    format:(text, record, index)=>{
      return formatToDateTime(text)
    }
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
    format:(text, record, index)=>{
      if(text==='admin'){
        return '管理员'
      }else if(text ==='super'){
        return '超级管理员'
      }else{
        return '普通用户'
      }
    }

  },

];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field:'id',
    component:'Input',
    show:false,
  },
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],

  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: true,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },

  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },


];

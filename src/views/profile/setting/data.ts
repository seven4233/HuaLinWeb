import { FormSchema } from '/@/components/Form/index';
import { validateEmail, validatePhoneNumber } from "@/utils/validate";

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  // {
  //   key: '2',
  //   name: '安全设置',
  //   component: 'SecureSetting',
  // },
  // {
  //   key: '3',
  //   name: '账号绑定',
  //   component: 'AccountBind',
  // },
  // {
  //   key: '4',
  //   name: '新消息通知',
  //   component: 'MsgNotify',
  // },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'realName',
    component: 'Input',
    label: '真实姓名',
    componentProps:{
      placeholder:'请输入真实姓名'
    },

    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    componentProps:{
      placeholder:'请输入邮箱'
    },
    rules:[{validator:(_, value)=>{
        if(!value){
          return Promise.resolve()
        }
        if(!validateEmail(value)){
          return Promise.reject("邮箱格式不正确")
        }
        return Promise.resolve()
    }}],
    colProps: { span: 18 },
  },
  {
    field: 'nickname',
    component: 'Input',
    label: '昵称',
    colProps: { span: 18 },
  },
  {
    field: 'gender',
    component: 'RadioGroup',
    label: '性别',
    componentProps:{
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
        { label: '保密', value: 0 },
      ],
    },
    colProps: { span: 18 },
  },
  {
    field: 'sign',
    component: 'InputTextArea',
    label: '个性签名',
    colProps: { span: 18 },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '联系电话',
    colProps: { span: 18 },
    rules:[{validator:(_, value)=>{
        if(!value){
          return Promise.resolve()
        }
        if(!validatePhoneNumber(value)){
          return Promise.reject("手机号格式不正确")
        }
        return Promise.resolve()
      }}],
  },
  {
    field: 'address',
    component: 'Input',
    label: '所在地区',
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '已绑定手机：：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：：ant***sign.com',
    extra: '修改',
  },
  {
    key: '5',
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    extra: '修改',
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];

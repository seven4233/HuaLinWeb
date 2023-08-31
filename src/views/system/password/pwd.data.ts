import { FormSchema } from '/@/components/Form';
import { useUserStore } from "@/store/modules/user";
import { validatePassword } from "@/utils/validate";
const userStore = useUserStore()
export const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: '当前密码',
    component: 'InputPassword',
    required: true,
    show: !!userStore.userInfo?.password,
  },
  {
    field: 'passwordNew',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空');
            }
            if (value.length>18 || value.length<6) {
              return Promise.reject('密码长度为6-18');
            }
            if(!validatePassword(value)){
              return Promise.reject('密码必须包含字母和数字!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('确认密码不能为空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!');
            }
            if(!validatePassword(value)){
              return Promise.reject('密码必须包含字母和数字!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];

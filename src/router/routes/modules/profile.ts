import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const profile: AppRouteModule = {
  path: '/profile',
  name: 'Profile',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:book-outlined',
    title: t('routes.profile.profile'),
    orderNo: 100000,
    hideMenu: true,
  },
  children: [
    {
      path: '',
      name: 'AccountCenter',
      component: () => import('@/views/profile/center/index.vue'),
      meta: {
        title: t('routes.profile.accountCenter'),
        icon: 'ant-design:book-outlined',
        hideMenu: true,
      },
    },
    {
      path: 'settings',
      name: 'AccountSetting',
      component: () => import('@/views/profile/setting/index.vue'),
      meta: {
        title: t('routes.profile.accountSetting'),
        icon: 'ant-design:book-outlined',
        hideMenu: true,
      },
    },

  ],
};

export default profile;

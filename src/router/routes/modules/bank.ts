import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const bank: AppRouteModule = {
  path: '/bank',
  name: 'Bank',

  component: LAYOUT,
  meta: {
    hideChildrenInMenu: false,
    icon: 'ant-design:book-outlined',
    title: t('routes.bank.bank'),
    orderNo: 2,
  },
  children: [
    {
      path: 'list',
      name: 'BankPage',
      component: () => import('/@/views/bank/index.vue'),
      meta: {
        title: t('routes.bank.list'),
        icon: 'ant-design:book-outlined',
      },
    },
    {
      path: ':id/sort',
      name: 'QuestionSort',
      component: () => import('/@/views/bank/components/Sort.vue'),
      meta: {
        title: t('routes.bank.sort'),
        icon: 'ant-design:book-outlined',
        hideMenu:true
      },
    },
    {
      path: 'rank',
      name: 'Rank',
      component: () => import('/@/views/bank/components/Rank.vue'),
      meta: {
        title: t('routes.bank.rank'),
        icon: 'bi:bar-chart-line-fill',
      },
    },
    {
      path: ':id/single',
      name: 'Single',
      component: () => import('/@/views/bank/components/Single.vue'),
      meta: {
        title: t('routes.bank.single'),
        icon: 'ant-design:book-outlined',
        hideMenu:true
      },
    },
  ],
};

export default bank;

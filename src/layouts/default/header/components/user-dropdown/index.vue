<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="center"
          :text="t('layout.header.dropdownItemProfile')"
          icon="ant-design:user-outlined"
        />
        <MenuDivider  />
        <MenuItem
          key="settings"
          :text="t('layout.header.dropdownItemSetting')"
          icon="ant-design:setting-filled"
        />
        <MenuDivider  />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  import { defineComponent, computed } from 'vue';


  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';

  import headerImg from '/@/assets/images/header.jpg';
  import { propTypes } from '/@/utils/propTypes';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useGo } from "@/hooks/web/usePage";
  import { PageEnum } from "@/enums/pageEnum";

  type MenuEvent = 'logout' | 'doc' | 'lock' | 'center' |'settings';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc, getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();

      const getUserInfo = computed(() => {
        const { realName = '', avatar, desc } = userStore.getUserInfo || {};
        return { realName, avatar: avatar || headerImg, desc };
      });

      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }
      const go = useGo()

      function openAccountCenter() {
        go(PageEnum.ACCOUNT_CENTER)
        // openWindow(DOC_URL);
      }
      function openAccountSettings() {
        go(PageEnum.ACCOUNT_SETTINGS)
      }

      function handleMenuClick(e: MenuInfo) {
        switch (e.key as MenuEvent) {
          case 'logout':
            handleLoginOut();
            break;
          case 'center':
            openAccountCenter();
            break;
          case 'settings':
            openAccountSettings();
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        register,
        getUseLockPage,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    align-items: center;
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>

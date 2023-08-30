<template>
  <div :class="prefixCls">
    <a-row :class="`${prefixCls}-top`">
      <a-col :span="9" :class="`${prefixCls}-col`">
        <a-row>
          <a-col :span="8">
            <div :class="`${prefixCls}-top__avatar`">
              <img alt="" width="70" :src="avatar" />
              <span>{{ userStore.userInfo?.nickname || userStore.userInfo?.account}}</span>
              <div>{{userStore.userInfo?.sign || "未设置"}}</div>
            </div>
          </a-col>
          <a-col :span="16">
            <div :class="`${prefixCls}-top__detail`">
<!--              电话-->
              <p>
                <Icon color="" icon="material-symbols:smartphone" />
                电话：{{ userStore.userInfo?.phone || '未设置'}}
              </p>
              <p>
<!--                邮箱-->
                <Icon color="" icon="ic:outline-mail" />
                邮箱：{{ userStore.userInfo?.email || '未设置'}}
              </p>
              <p>
                <Icon color="" icon="bx:bx-home-circle" />
                地址： {{ userStore.userInfo?.address ||'未设置'}}
              </p>
                <p>
                  <Icon :color="userStore.userInfo?.gender === 0?'blue': userStore.userInfo?.gender === 1?'red':''"
                        :icon="userStore.userInfo?.gender === 0?'mdi:face-man-shimmer-outline': userStore.userInfo?.gender === 1?'mdi:face-woman-shimmer-outline':'pajamas:severity-unknown'" />
                  性别：{{ userStore.userInfo?.gender === 0?'男': userStore.userInfo?.gender === 1?'女':'保密'}}
                </p>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="7" :class="`${prefixCls}-col`">
        <CollapseContainer title="标签" :canExpan="false">
          <template v-for="tag in tags" :key="tag">
            <Tag class="mb-2" >
              {{ tag }}
            </Tag>
          </template>
        </CollapseContainer>
      </a-col>
      <a-col :span="8" :class="`${prefixCls}-col`">
        <a-button @click="editClick"  type="primary">  <Icon  icon='material-symbols:edit-square-outline-rounded' />编辑资料</a-button>
      </a-col>
    </a-row>
    <div :class="`${prefixCls}-bottom`">
      <Tabs>
        <template v-for="item in achieveList" :key="item.key">
          <TabPane :tab="item.name">
            <component :is="item.component" />
          </TabPane>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
  import { Tag, Tabs, Row, Col } from 'ant-design-vue';
  import { defineComponent, computed, h } from "vue";
  import { CollapseContainer } from '@/components/Container/index';
  import Icon from '@/components/Icon/Icon.vue';
  import Article from './Article.vue';
  import Application from './Application.vue';
  import Project from './Project.vue';

  import headerImg from '/@/assets/images/header.jpg';
  import { tags, teams, details, achieveList } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { useGo } from "@/hooks/web/usePage";

  export default defineComponent({
    methods: { h },
    components: {
      CollapseContainer,
      Icon,
      Tag,
      Tabs,
      TabPane: Tabs.TabPane,
      Article,
      Application,
      Project,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const userStore = useUserStore();
      const go = useGo()
      const avatar = computed(() => userStore.getUserInfo.avatar || headerImg);
      const editClick = ()=>{
        go('/profile/settings')
      }
      return {
        prefixCls: 'account-center',
        avatar,
        tags,
        teams,
        details,
        achieveList,
        userStore,
        editClick
      };
    },
  });
</script>
<style lang="less" scoped>
  .account-center {
    &-col:not(:last-child) {
      padding: 0 10px;

      &:not(:last-child) {
        border-right: 1px dashed rgb(206 206 206 / 50%);
      }
    }

    &-top {
      margin: 16px 16px 12px;
      padding: 10px;
      border-radius: 3px;
      background-color: @component-background;

      &__avatar {
        text-align: center;

        img {
          margin: auto;
          border-radius: 50%;
        }

        span {
          display: block;
          font-size: 20px;
          font-weight: 500;
        }

        div {
          margin-top: 3px;
          font-size: 12px;
        }
      }

      &__detail {
        margin-top: 15px;
        padding-left: 20px;
      }

      &__team {
        &-item {
          display: inline-block;
          padding: 4px 24px;
        }

        span {
          margin-left: 3px;
        }
      }
    }

    &-bottom {
      margin: 0 16px 16px;
      padding: 10px;
      border-radius: 3px;
      background-color: @component-background;
    }
  }
</style>

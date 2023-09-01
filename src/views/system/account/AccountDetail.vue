<template>
  <PageWrapper
    :title="`用户 ` + adminStore.accountDetail?.nickname + ` 的资料`"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger> 禁用账号 </a-button>
      <a-button type="primary"> 修改密码 </a-button>
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用户资料" />
        <a-tab-pane key="logs" tab="操作日志" />
      </a-tabs>
    </template>
  <!--    详情-->
    <div :class="`${prefixCls}`">
      <template v-if="currentKey == 'detail'">
        <a-row :class="`${prefixCls}-top`" class="flex">
          <a-col :span="9" class="w-100" :class="`${prefixCls}-col`">
            <a-row>
              <a-col :span="8">
                <div :class="`${prefixCls}-top__avatar`">
                  <img alt="" width="70" :src="adminStore.accountDetail?.avatar" />
                  <span>{{ adminStore.accountDetail?.nickname || adminStore.accountDetail?.account}}
                    <Icon size="20" :color="adminStore.accountDetail?.gender === 0?'blue': adminStore.accountDetail?.gender === 1?'red':''"
                          :icon="adminStore.accountDetail?.gender === 0?'': adminStore.accountDetail?.gender === 1?'man|svg':'woman|svg'" />
                  </span>
                  <div>个性签名：{{adminStore.accountDetail?.sign || "未设置"}}</div>
                </div>
              </a-col>
              <a-col :span="16">
                <div :class="`${prefixCls}-top__detail`">
                  <p>
                    <Icon color="" icon="pajamas:severity-unknown" />
                    真实姓名：{{ adminStore.accountDetail?.realName || '已隐藏'}}
                  </p>
                  <!--              电话-->
                  <p>
                    <Icon color="" icon="material-symbols:smartphone" />
                    电话：{{ adminStore.accountDetail?.phone || '未设置'}}
                  </p>
                  <p>
                    <!--                邮箱-->
                    <Icon color="" icon="ic:outline-mail" />
                    邮箱：{{ adminStore.accountDetail?.email || '未设置'}}
                  </p>

                  <p>
                    <Icon color="" icon="bx:bx-home-circle" />
                    地址： {{ adminStore.accountDetail?.address ||'未设置'}}
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
          </a-col>
        </a-row>
      </template>
      <template v-if="currentKey == 'logs'">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}操作日志Tab</div>
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
  import { PageWrapper } from '@/components/Page';
  import { Tabs, Tag } from "ant-design-vue";
  import { CollapseContainer } from "@/components/Container";
  import Icon from "@/components/Icon/Icon.vue";
  import { tags } from "@/views/profile/center/data";
  import { useAdminStore } from "@/store/modules/adminStore";

  defineOptions({ name: 'AccountDetail' });
  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const prefixCls = 'account-detail'
  const route = useRoute();
 const router = useRouter()

  // 此处可以得到用户ID
  const userId = ref(route.params?.id);
  const currentKey = ref('detail');
  const adminStore = useAdminStore()
  // TODO
  // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

  onMounted(()=>{
    adminStore.getDetailAction({id: +userId.value})
  })
  // 设置Tab的标题（不会影响页面标题）

  // 页面左侧点击返回链接时的操作
  function goBack() {
    // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
    router.back()
  }
</script>

<style lang="less">
.account-detail {
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

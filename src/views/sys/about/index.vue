<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ "Lin Space" }}</a>
          是一个基于Vue3.0、Vite、 Ant-Design-Vue 、TypeScript
          的后台管理系统，目标是为方便一些个人操作。
        </span>
      </div>
    </template>
    <Card title="通知公告" style="width: 500px" >
      <template #extra><a href="#">更多</a></template>
      <div class="item" v-for="(item, index) in notifyList" :key="index">
          <span class="news-type type-gonggao">{{ item.type }}</span>
          <span class="news-title">{{item.content}}</span>
          <em class="fr news-time">{{ formatToDate(item.createTime) }}</em>
      </div>

    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { getNotifyListAPI } from '/@/api/sys/user';
import { PageWrapper } from '/@/components/Page';
  import { GITHUB_URL } from '/@/settings/siteSetting';
  import {Card} from 'ant-design-vue'
  import { onMounted, ref } from 'vue';
import { formatToDate } from '/@/utils/dateUtil';
  type NotifyItem = {
    type: string;
    content: string;
    createTime: Date
  }
  const notifyList = ref<NotifyItem[]>([])
  onMounted(async()=>{
    let res = await getNotifyListAPI()
    notifyList.value = res.result
  })

</script>

<style lang="less" scoped>

.item{
  display: flex;
  width: 500px;
  margin-bottom: 11px;
  color: #666;
  font-size: 14px;
  cursor: pointer;

  .news-type{
    display: inline-block;
    width: 32px;
    margin-top: 2px;
    margin-right: 5px;
    border: 1px solid currentcolor;
    border-radius: 2px;
    color: #ff3636;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    vertical-align: top;
  }

  .news-title{
    display: inline-block;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    white-space: nowrap;
  }

  .news-time{
    flex: 1;
    margin-right: 50px;
    color: #999;
    font-style: normal;
    text-align: right;
  }
}
</style>

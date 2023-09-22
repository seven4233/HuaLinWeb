<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ "Lin Web" }}</a>
          是一个基于Vue3.0、Vite、 Ant-Design-Vue 、TypeScript
          的后台管理系统，目标是为方便一些个人操作。
        </span>
      </div>
    </template>
    <Card title="通知公告" style="width: 500px" >
      <template #extra><a href="#">更多</a></template>
      <div class="item">
          <span class="news-type type-gonggao">公告</span>
          <span class="news-title">新增判断题页面和更换头像功能</span>
          <em class="fr news-time">09/21</em>
      </div>

    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { GITHUB_URL } from '/@/settings/siteSetting';
  import {Card} from 'ant-design-vue'

</script>

<style lang="less" scoped>

.item{
  width: 500px;
  margin-bottom: 11px;
  color: #666;
  font-size: 14px;
  display: flex;
  cursor: pointer;
  .news-type{
    color: #ff3636;
    margin-right: 5px;
    font-size: 12px;
    display: inline-block;
    line-height: 16px;
    border: 1px solid currentColor;
    vertical-align: top;
    margin-top: 2px;
    width: 32px;
    text-align: center;
    border-radius: 2px;
  }

  .news-title{
    width: 230px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
  }
  .news-time{
    flex: 1;
    text-align: right;
    margin-right: 50px;
    color: #999;
    font-style: normal;
  }
}
</style>

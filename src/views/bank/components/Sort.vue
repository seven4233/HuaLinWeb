<script lang="ts" setup>
import {Card, Tag} from 'ant-design-vue'
import { useQuestionStore } from "@/store/modules/questionStore";
import { useGo } from "@/hooks/web/usePage";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const questionStore = useQuestionStore()
const go = useGo()
const route = useRoute()
// 拿到题库id
const bankId = route.params.id

onMounted(() => {
  // 根据题库id获取题库分类
  questionStore.getSortInfoAction(+bankId)
})
const itemClick = (item: any) => {
  console.log(item);
  go(`/bank/${bankId}/${item.value}`)
}
</script>
<template>
  <div class="question_sort">
      <Card class="card">

        <div class="sort_list">

          <div class="sort_item" @click="itemClick(item)" v-for="item in questionStore.sortArr" :key="item.type">
            <div class="sort_name">
              <div class="title">{{ item.type }}
                <Tag v-if="item.type==='判断题'" color="#cd201f" style="transform: scale(0.7)" >new</Tag>
              </div>
            </div>
            <div class="sort_num">
              已做
              <span>{{ item.doneCount }}</span>
              /{{ item.count }}题
            </div>
          </div>

        </div>
      </Card>
  </div>
</template>

<style lang="less" scoped>
.question_sort {
    .card {
      height: 80vh;

      .sort_list {
        margin-right: -20px;
        margin-bottom: -20px;
        display: flex;
        flex-wrap: wrap;

        .sort_item {
          margin-bottom: 20px;
          margin-right: 20px;
          width: 202px;
          height: 80px;
          cursor: pointer;
          border-radius: 12px;
          border-width: 1px;
          border-color: transparent;
          background-color: rgba(248, 248, 248, 1);
          padding: 12px 16px 14px;
          font-size: 14px;
          line-height: 21px;
          color: rgba(51, 51, 51, 1);
          transition: all 0.2s ease;

          &:hover {

            color: rgba(50, 202, 153, 1);
            transform: translateY(-4px);
            background: #fff;
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.02), 0 2px 12px 0 rgba(0, 0, 0, 0.04),
            0 2px 6px 0 rgba(0, 0, 0, 0.02);

            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
            var(--tw-shadow);
          }

          .sort_name {
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            position: relative;


            .title {
              max-width: 154px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .new{
                color: red;
                font-size: 12px;
                border: 1px solid red;
                border-radius: 10px;
                padding: 0 2px;
                top: -3px;
                left: 5px;
                position: absolute;
              }
            }
          }

          .sort_num {
            color: rgba(187, 187, 187, 1);

            span {
              color: rgba(50, 202, 153, 1);
            }

          }
        }
      }
    }
}
</style>

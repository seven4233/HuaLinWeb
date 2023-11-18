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
                <!-- <Tag v-if="item.type==='判断题'" color="#cd201f" style="transform: scale(0.7)" >new</Tag> -->
                <Tag v-if="item.type!=='填空题' && bankId=== '2'" color="#cd201f" style="transform: scale(0.7)" >new</Tag>
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
        display: flex;
        flex-wrap: wrap;
        margin-right: -20px;
        margin-bottom: -20px;

        .sort_item {
          width: 202px;
          height: 80px;
          margin-right: 20px;
          margin-bottom: 20px;
          padding: 12px 16px 14px;
          transition: all 0.2s ease;
          border-width: 1px;
          border-radius: 12px;
          border-color: transparent;
          background-color: rgb(248 248 248 / 100%);
          color: rgb(51 51 51 / 100%);
          font-size: 14px;
          line-height: 21px;
          cursor: pointer;

          &:hover {
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 1px 4px 0 rgb(0 0 0 / 2%), 0 2px 12px 0 rgb(0 0 0 / 4%),
            0 2px 6px 0 rgb(0 0 0 / 2%);

            transform: translateY(-4px);
            background: #fff;
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
            var(--tw-shadow);
            color: rgb(50 202 153 / 100%);
          }

          .sort_name {
            display: flex;
            position: relative;
            align-items: center;
            margin-bottom: 8px;


            .title {
              max-width: 154px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              .new{
                position: absolute;
                top: -3px;
                left: 5px;
                padding: 0 2px;
                border: 1px solid red;
                border-radius: 10px;
                color: red;
                font-size: 12px;
              }
            }
          }

          .sort_num {
            color: rgb(187 187 187 / 100%);

            span {
              color: rgb(50 202 153 / 100%);
            }

          }
        }
      }
    }
}
</style>

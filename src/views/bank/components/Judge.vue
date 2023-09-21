<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { SingleOption } from "@/api/sys/model/questionModel";
import { Modal } from "ant-design-vue";
import { useGo } from "@/hooks/web/usePage";
import { useQuestionStore } from "@/store/modules/questionStore";
import {useJudgeStore} from "@/store/modules/judgeStore";

const judgeStore = useJudgeStore();

const route = useRoute();
const questionStore = useQuestionStore()
const cardNumList = ref([
  {
    value: 1,
    done: false
  }, {
    value: 2,
    done: false
  }, {
    value: 3,
    done: false
  }, {
    value: 4,
    done: false
  }, {
    value: 5,
    done: false
  }
]);
const currentCardIndex = ref(0);
onMounted(() => {
  judgeStore.isSubmit = false;
  // 获取单选题列表
  judgeStore.getJudgeListAction(Number(route.params.id));

});

const itemClick = (item: SingleOption, index: number) => {
  judgeStore.selectedAction(item);
  console.log(item);

  // index
};

// 提交
const handleSubmit = () => {
  console.log(judgeStore.selectedValue);

  if (!judgeStore.isFinished) {
    Modal.confirm({
      title: `你还有 ${judgeStore.leftQuestion} 道未完成的题目, 确定交卷?`,
      zIndex:99999999,
      cancelText:'再想想',
      onOk: async () => {
        //   发送提交请求
        await judgeStore.addFinishedQuestion({bankId: +route.params.id, sort:'判断题', correctList: judgeStore.correctList as any});
        // TODO 跳转已提交页面
        go(`/bank/${Number(route.params.id)}/judge_submit`)
      },
      onCancel() {

      }
    });

  } else {
    Modal.confirm({
      title: `小伙子我劝你检查一下?`,
      zIndex:99999999,
      onOk: async () => {
        //   发送提交请求
        await judgeStore.addFinishedQuestion({bankId: +route.params.id, sort:'判断题', correctList: judgeStore.correctList as any});
        go(`/bank/${Number(route.params.id)}/judge_submit`)
      },
      onCancel() {

      }
    });
  }
};
const go = useGo()
// 退出答题
const exitQuestion = () => {
  go("/bank/list" );
};


const scrollToSection = (sectionId: string) => {
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: "smooth" });
  }
};
const cardNumClick = (index: number) => {
  currentCardIndex.value = index;
  scrollToSection(index + "");
};
</script>

<template>
  <div id="single" class="single">
    <div class="header">
      <div class="header-content">
        <div class="customer-exit" @click="exitQuestion">
          <span class="ncicon">
            <svg focusable="false" viewBox="0 0 1024 1024" fill="currentColor" width="16"
                 height="16" aria-hidden="true"
                 data-v-79ba69ea="">
              <path fill="currentColor" fill-rule="nonzero"
                    d="M289.3514 187.8043c-19.8576-17.5625-21.7181-47.8974-4.1557-67.755 17.3869-19.659 47.292-21.679 67.1561-4.6767l.5989.521L723.848 443.9236c33.096 29.2708 36.1968 79.829 6.926 112.9249a80 80 0 0 1-6.115 6.1989l-.811.7271-370.8973 328.0299c-19.8576 17.5624-50.1925 15.7019-67.755-4.1557-17.3868-19.659-15.7371-49.5868 3.5654-67.2242l.5903-.5307L646.696 503.85 289.3514 187.8043z">
              </path>
            </svg>
          </span>
          退出答题
        </div>
        <div class="header-title">{{ questionStore.bankInfo?.name }}</div>

        <!-- 答题卡圈圈 -->
        <div  class="answer_card_list">
          <span style="margin-right: 10px; font-size: 14px; color: #666">答题卡</span>
          <div class="answer_card_item" v-for="(item, index) in cardNumList" :key="item.value"
               @click="cardNumClick(index)">
            <div style="margin-right: 8px; padding-top: 4px">
              <div class="card_num empty" :class="{
                running: index === currentCardIndex,
                'done': judgeStore.doneArr?.includes(index)
              }">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
        <div  class="header-submitter">
          <div class="ab" @click="handleSubmit">
            <div class="cd">交卷</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交之前 -->
    <div  class="page-wrapper">
      <template v-for="(item, index) in judgeStore.judgeList" :key="index">
        <!-- 一题 -->
        <div class="item" :id="index + ''">
          <div class="title">
            <div class="question-desc-header">
              <div class="commonClass singleClass">判断题</div>
              <div class="rightAction">
                <div class="collectIcon">
                      <span>
                        <svg focusable="false" viewBox="0 0 20 20" fill="currentColor" width="20"
                             height="20"
                             aria-hidden="true" data-v-79ba69ea="">
                          <path fill="currentColor"
                                d="M6.1915 16.7207a1.48 1.48 0 0 1-.8554-.2734 1.4765 1.4765 0 0 1-.6172-1.2266l.0683-3.5488-2.1894-2.8067a1.4696 1.4696 0 0 1-.2442-1.3496 1.4729 1.4729 0 0 1 .9746-.9648l3.3965-1.0332L8.717 2.5664a1.4727 1.4727 0 0 1 1.209-.6504h.0117c.4805 0 .9317.2344 1.207.6309l2.0313 2.9101.0098.0078 3.414.9746a1.472 1.472 0 0 1 .9922.9493c.1543.461.0703.9668-.2226 1.3535l-2.1407 2.832.1231 3.5586a1.472 1.472 0 0 1-.5957 1.2363 1.4676 1.4676 0 0 1-1.3574.2071l-3.3536-1.1621-3.3457 1.2168a1.4823 1.4823 0 0 1-.5078.0898zM9.9513 3.3789 7.9396 6.3242a1.468 1.468 0 0 1-.793.586L3.7501 7.9414l2.1797 2.8223c.209.2656.3184.5996.3125.9355l-.0684 3.5488 3.3575-1.2011a1.4729 1.4729 0 0 1 .9863-.0078l3.3535 1.1621-.1016-3.5645a1.4738 1.4738 0 0 1 .2969-.9394l2.1406-2.832-3.4238-1.002a1.4888 1.4888 0 0 1-.8027-.5723L9.9513 3.379z">
                          </path>
                        </svg>
                      </span>
                </div>
              </div>
            </div>

            <div class="question-info">
              <div class="question-num">
                <em>{{ index + 1 }}</em> 【{{ item.question_num }}】
              </div>
              <div class="question-name">
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
          <!-- 选项区 -->
          <div class="question-select">
            <div class="option-item" :class="{ 'option-item-selected': i.selected === true }"
                 v-for="(i, index) in item.options" :key="i.value" @click="itemClick(i, index)">
              <div class="label">{{ i.label }}</div>
              <div class="content">{{ i.value}}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- 操作区(提交 -->
      <div class="test-submit">
        <a-button type="primary" @click="handleSubmit">交卷</a-button>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.single {
  .header {
    height: 56px;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    position: sticky;
    top: 0px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.02),
    0 2px 12px 0 rgba(0, 0, 0, 0.04);
    z-index: 999;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      height: 56px;
      padding: 0 20px;

      .customer-exit {
        --tw-text-opacity: 1;
        color: rgba(85, 85, 85, var(--tw-text-opacity));
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          color: rgba(50, 202, 153, 1);
        }

        .ncicon {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          display: inline-block;
          font-style: normal;
          line-height: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          vertical-align: -0.15em;
          --tw-transform: translateX(0) translateY(0) rotate(180deg) skewX(0) skewY(0) scaleX(1) scaleY(1);
          transform: var(--tw-transform);
        }
      }

      .header-title {
        --tw-text-opacity: 1;
        color: rgba(85, 85, 85, var(--tw-text-opacity));
        line-height: 18px;
        font-weight: 400;
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 500px;
      }

      // 答题卡圈圈
      .answer_card_list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .answer_card_item {
          position: relative;

          .card_num {
            align-items: center;
            border-radius: 100%;
            border-width: 1px;
            cursor: pointer;
            display: flex;
            font-size: 14px;
            font-weight: 400;
            height: 30px;
            justify-content: center;
            line-height: 16px;
            position: relative;
            width: 30px;

            &:hover {
              background-color: rgba(50, 202, 153, 1);
              border: 1px solid rgba(50, 202, 153, 1);
              border-style: none;
              color: rgba(255, 255, 255, 1);
            }
          }

          .empty {
            border: 1px solid rgba(240, 240, 240, 1);
            color: rgba(153, 153, 153, 1);
          }

          .running {
            border: 1px solid rgba(240, 240, 240, 1);
            border-color: rgba(50, 202, 153, 1);
          }

          .done {
            border: 1px solid rgba(148, 227, 201, 1);
            background-color: rgba(238, 250, 247, 1);
            color: rgba(50, 202, 153, 1);
          }

          .error {
            border: 1px solid rgba(255, 154, 118, 1);
            background-color: rgba(255, 246, 243, 1);
            color: rgba(255, 86, 27, 1);
          }
        }
      }

      .header-submitter {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        --tw-text-opacity: 1;
        color: rgba(153, 153, 153, var(--tw-text-opacity));

        .ab {
          margin-right: 16px;
          display: flex;
          height: 32px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          border: 1px solid rgba(50, 202, 153, 1);
          padding-left: 12px;
          padding-right: 12px;
          color: rgba(50, 202, 153, 1);

          &:hover {
            color: rgba(255, 255, 255, 1);
            background-color: rgba(50, 202, 153, 1);
          }

          .cd {
            width: 68px;
            text-align: center;
            font-size: 16px;
            line-height: 16px;
            font-weight: 400;
          }
        }
      }
    }
  }

  .page-wrapper {
    background: #fff;
    padding: 24px 40px;
    position: relative;
    z-index: 998;

    .item {
      border-bottom: 1px dashed #f0f0f0;
      padding: 30px 0;

      // 题目
      .title {
        margin-bottom: 20px;

        .question-desc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;

          .commonClass {
            border-radius: 4px;
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            padding: 4px 8px;
          }

          .singleClass {
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;
            background-color: rgba(227, 243, 255, var(--tw-bg-opacity));
            color: rgba(0, 117, 255, var(--tw-text-opacity));
          }

          .rightAction {
            .collectIcon {
              --tw-text-opacity: 1;
              color: rgba(153, 153, 153, var(--tw-text-opacity));
              cursor: pointer;

              &:hover {
                --tw-text-opacity: 1;
                color: rgba(255, 187, 77, var(--tw-text-opacity));
              }
            }
          }
        }

        .question-info {
          --tw-text-opacity: 1;
          color: rgba(51, 51, 51, var(--tw-text-opacity));
          line-height: 28px;
          font-weight: 600;
          font-size: 16px;
          display: flex;

          .question-num {
            margin-right: 4px;
            height: 28px;
            line-height: 28px;

            em {
              font-style: normal;
              border-radius: 99%;
              padding: 0 5px;
              border: 1px solid #32ca99;
              background-color: #fff;
            }
          }

          .question-name {
            word-wrap: break-word;
            line-height: 28px;
            word-break: break-all;
            flex: 1 1 0%;
            width: 0;
          }
        }
      }

      // 选项区
      .question-select {
        .option-item {
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          display: flex;
          margin-top: 16px;
          padding: 8px 12px;

          &:not(.option-item-selected):hover {
            --tw-bg-opacity: 1;
            background-color: rgba(248, 248, 248, var(--tw-bg-opacity));

            .label {
              --tw-border-opacity: 1;
              --tw-bg-opacity: 1;
              --tw-text-opacity: 1;
              background-color: rgba(50, 202, 153, var(--tw-bg-opacity));
              border-color: rgba(50, 202, 153, var(--tw-border-opacity));
              color: rgba(255, 255, 255, var(--tw-text-opacity));
            }
          }

          &:first-child {
            margin-top: 0;
          }

          .label {
            --tw-border-opacity: 1;
            align-items: center;
            border-radius: 9999px;
            border: 1px solid;
            border-color: rgba(221, 221, 221, var(--tw-border-opacity));

            display: flex;
            flex-shrink: 0;
            height: 28px;
            justify-content: center;
            margin-right: 8px;
            white-space: pre-wrap;
            width: 28px;
          }

          .content {
            --tw-text-opacity: 1;
            align-items: center;
            color: rgba(51, 51, 51, var(--tw-text-opacity));
            display: flex;
            flex: 1 1 0%;
            font-size: 16px;
            line-height: 24px;
          }
        }

        .option-item-selected {
          --tw-border-opacity: 1;
          --tw-bg-opacity: 1;
          background-color: rgba(238, 250, 247, var(--tw-bg-opacity));
          border: 1px solid rgba(148, 227, 201, var(--tw-border-opacity));

          .label {
            --tw-border-opacity: 1;
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;
            background-color: rgba(50, 202, 153, var(--tw-bg-opacity));
            border-color: rgba(50, 202, 153, var(--tw-border-opacity));
            color: rgba(255, 255, 255, var(--tw-text-opacity));
          }
        }

        .option-item-error {
          --tw-border-opacity: 1;
          --tw-bg-opacity: 1;
          background-color: rgba(255, 246, 243, var(--tw-bg-opacity));
          border-color: rgba(255, 187, 164, var(--tw-border-opacity));
        }
      }
    }

    .operation {
      position: relative;
      width: 400px;
      margin-top: 50px;
      margin-left: 50%;
      transform: translateX(-50%);

      .submit {
        position: absolute;
        right: 0;
      }
    }
  }


  .test-submit {
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-bottom: 180px;
    padding-top: 48px;
    text-align: center;
  }
}
</style>

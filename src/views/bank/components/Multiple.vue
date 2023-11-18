<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { MultipleOption } from "@/api/sys/model/questionModel";
import { Modal } from "ant-design-vue";
import { useGo } from "@/hooks/web/usePage";
import { useQuestionStore } from "@/store/modules/questionStore";
import { useMultipleStore } from "/@/store/modules/multipleStore";

const multipleStore = useMultipleStore();
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
  multipleStore.isSubmit = false;
  // 获取多选题列表
  multipleStore.getMultipleListAction(Number(route.params.id));

});


const itemClick = (item: MultipleOption, index: number) => {
  multipleStore.selectedAction(item);
  console.log(item);

  // index
};

// 提交
const handleSubmit = () => {
  console.log(multipleStore.selectedValue);

  if (!multipleStore.isFinished) {
    Modal.confirm({
      title: `你还有 ${multipleStore.leftQuestion} 道未完成的题目, 确定交卷?`,
      zIndex:99999999,
      cancelText:'再想想',
      onOk: async () => {
        //   发送提交请求
        await multipleStore.addFinishedQuestion({bankId: +route.params.id, sort:'多选题', correctList: multipleStore.correctList as any});
        // TODO 跳转已提交页面
        go(`/bank/${Number(route.params.id)}/multiple_submit`)
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
          await multipleStore.addFinishedQuestion({bankId: +route.params.id, sort:'多选题', correctList: multipleStore.correctList as any});
          go(`/bank/${Number(route.params.id)}/multiple_submit`)
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
  <div id="multiple" class="multiple">
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
          <span style="margin-right: 10px; color: #666; font-size: 14px">答题卡</span>
          <div class="answer_card_item" v-for="(item, index) in cardNumList" :key="item.value"
               @click="cardNumClick(index)">
            <div style="margin-right: 8px; padding-top: 4px">
              <div class="card_num empty" :class="{
                running: index === currentCardIndex,
                'done': multipleStore.doneArr?.includes(index)
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
      <template v-for="(item, index) in multipleStore.multipleList" :key="index">
        <!-- 一题 -->
        <div class="item" :id="index + ''">
          <div class="title">
            <div class="question-desc-header">
              <div class="commonClass multipleClass">多选题</div>
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
            <div v-show="i.label" class="option-item" :class="{ 'option-item-selected': i.selected === true }"
                 v-for="(i, index) in item.options" :key="i.value" @click="itemClick(i, index)">
              <div class="label">{{ i.value }}</div>
              <div class="content">{{ i.label }}</div>
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
.multiple {
  .header {
    --tw-bg-opacity: 1;

    position: sticky;
    z-index: 999;
    top: 0;
    height: 56px;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 2%),
    0 2px 12px 0 rgb(0 0 0 / 4%);

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      margin-right: auto;
      margin-left: auto;
      padding: 0 20px;

      .customer-exit {
        --tw-text-opacity: 1;

        display: flex;
        align-items: center;
        color: rgb(85 85 85 / var(--tw-text-opacity));
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        cursor: pointer;

        &:hover {
          color: rgb(50 202 153 / 100%);
        }

        .ncicon {
          --tw-transform: translateX(0) translateY(0) rotate(180deg) skewX(0) skewY(0) scaleX(1) scaleY(1);

          display: inline-block;
          transform: var(--tw-transform);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-style: normal;
          line-height: 0;
          text-align: center;
          text-rendering: optimizelegibility;
          text-transform: none;
          vertical-align: -0.15em;
        }
      }

      .header-title {
        --tw-text-opacity: 1;

        max-width: 500px;
        overflow: hidden;
        color: rgb(85 85 85 / var(--tw-text-opacity));
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // 答题卡圈圈
      .answer_card_list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .answer_card_item {
          position: relative;

          .card_num {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-width: 1px;
            border-radius: 100%;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            cursor: pointer;

            &:hover {
              border: 1px solid rgb(50 202 153 / 100%);
              border-style: none;
              background-color: rgb(50 202 153 / 100%);
              color: rgb(255 255 255 / 100%);
            }
          }

          .empty {
            border: 1px solid rgb(240 240 240 / 100%);
            color: rgb(153 153 153 / 100%);
          }

          .running {
            border: 1px solid rgb(240 240 240 / 100%);
            border-color: rgb(50 202 153 / 100%);
          }

          .done {
            border: 1px solid rgb(148 227 201 / 100%);
            background-color: rgb(238 250 247 / 100%);
            color: rgb(50 202 153 / 100%);
          }

          .error {
            border: 1px solid rgb(255 154 118 / 100%);
            background-color: rgb(255 246 243 / 100%);
            color: rgb(255 86 27 / 100%);
          }
        }
      }

      .header-submitter {
        --tw-text-opacity: 1;

        display: flex;
        align-items: center;
        color: rgb(153 153 153 / var(--tw-text-opacity));
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;

        .ab {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          margin-right: 16px;
          padding-right: 12px;
          padding-left: 12px;
          border: 1px solid rgb(50 202 153 / 100%);
          border-radius: 20px;
          color: rgb(50 202 153 / 100%);
          cursor: pointer;

          &:hover {
            background-color: rgb(50 202 153 / 100%);
            color: rgb(255 255 255 / 100%);
          }

          .cd {
            width: 68px;
            font-size: 16px;
            font-weight: 400;
            line-height: 16px;
            text-align: center;
          }
        }
      }
    }
  }

  .page-wrapper {
    position: relative;
    z-index: 998;
    padding: 24px 40px;
    background: #fff;

    .item {
      padding: 30px 0;
      border-bottom: 1px dashed #f0f0f0;

      // 题目
      .title {
        margin-bottom: 20px;

        .question-desc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;

          .commonClass {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
          }

          .multipleClass {
            background-color: rgb(255 0 0);
            color: rgb(255 255 255);
          }

          .rightAction {
            .collectIcon {
              --tw-text-opacity: 1;

              color: rgb(153 153 153 / var(--tw-text-opacity));
              cursor: pointer;

              &:hover {
                --tw-text-opacity: 1;

                color: rgb(255 187 77 / var(--tw-text-opacity));
              }
            }
          }
        }

        .question-info {
          --tw-text-opacity: 1;

          display: flex;
          color: rgb(51 51 51 / var(--tw-text-opacity));
          font-size: 16px;
          font-weight: 600;
          line-height: 28px;

          .question-num {
            height: 28px;
            margin-right: 4px;
            line-height: 28px;

            em {
              padding: 0 5px;
              border: 1px solid #32ca99;
              border-radius: 99%;
              background-color: #fff;
              font-style: normal;
            }
          }

          .question-name {
            flex: 1 1 0%;
            width: 0;
            line-height: 28px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
      }

      // 选项区
      .question-select {
        .option-item {
          display: flex;
          margin-top: 16px;
          padding: 8px 12px;
          border: 1px solid transparent;
          border-radius: 8px;
          cursor: pointer;

          &:not(.option-item-selected):hover {
            --tw-bg-opacity: 1;

            background-color: rgb(248 248 248 / var(--tw-bg-opacity));

            .label {
              --tw-border-opacity: 1;
              --tw-bg-opacity: 1;
              --tw-text-opacity: 1;

              border-color: rgb(50 202 153 / var(--tw-border-opacity));
              background-color: rgb(50 202 153 / var(--tw-bg-opacity));
              color: rgb(255 255 255 / var(--tw-text-opacity));
            }
          }

          &:first-child {
            margin-top: 0;
          }

          .label {
            --tw-border-opacity: 1;

            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            border: 1px solid;
            border-radius: 9999px;
            border-color: rgb(221 221 221 / var(--tw-border-opacity));
            white-space: pre-wrap;
          }

          .content {
            --tw-text-opacity: 1;

            display: flex;
            flex: 1 1 0%;
            align-items: center;
            color: rgb(51 51 51 / var(--tw-text-opacity));
            font-size: 16px;
            line-height: 24px;
          }
        }

        .option-item-selected {
          --tw-border-opacity: 1;
          --tw-bg-opacity: 1;

          border: 1px solid rgb(148 227 201 / var(--tw-border-opacity));
          background-color: rgb(238 250 247 / var(--tw-bg-opacity));

          .label {
            --tw-border-opacity: 1;
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;

            border-color: rgb(50 202 153 / var(--tw-border-opacity));
            background-color: rgb(50 202 153 / var(--tw-bg-opacity));
            color: rgb(255 255 255 / var(--tw-text-opacity));
          }
        }

        .option-item-error {
          --tw-border-opacity: 1;
          --tw-bg-opacity: 1;

          border-color: rgb(255 187 164 / var(--tw-border-opacity));
          background-color: rgb(255 246 243 / var(--tw-bg-opacity));
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

    padding-top: 48px;
    padding-bottom: 180px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    text-align: center;
  }
}
</style>

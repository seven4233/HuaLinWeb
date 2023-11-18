<script lang="ts" setup>
import { Card, Tag } from "ant-design-vue";
import { onMounted } from "vue";
import { useBankStore } from "@/store/modules/bankStore";
import { useGo } from "@/hooks/web/usePage";
const go = useGo()
const bankStore = useBankStore()
onMounted(()=>{
  bankStore.getBankListAction()
})
const itemClick = (bank: any) => {
  const {id} = bank
  go(`/bank/${id}/sort`)
}

</script>

<template>
  <div class="bank">
      <Card class="card" size="small" >
        <!-- 应该加个面包屑 -->
        <div class="question_list">
          <div class="question_item mr-6" v-for="item in bankStore.bankList" :key="item.id" @click="itemClick(item)">
            <div class="center">
              <div class="picture">
                <img src="@/assets/images/avatar.jpg" alt="图片" />
              </div>
              <div class="text">
                <a href="#" @click.prevent class="">
                  <img
                    class="inline-block"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABiUlEQVR4Ad3VQ9sWURzH8ZNt7YbZfhd5m2tVr6GWnTPZtm23q1XWLq4zNrlvzz/r3Pc4/K5rjM/Mofon4q2jYceFNCgF8yMGO4ZrruZqMJtBxf3VbLq6hi012HtHgyyy7xo2+RFdckG6LqaNEzHGNRz9Bv1mEVhzRO6VZ+IX12xc17DL0ZxyDXfkZWmWz8+ekncFBsdebDPpmw6xL/4sepcLGvr8H2D3uRBEJYFDN8Czl7DnegmgYM9rsHfvYfKeFGBabOr+nOpQXrTqHIQz7dgUC5YK3HgJCaduCvoj9vYblg4MDL1+fqDzLDhz9xs6arPlzyxLOIueVrDjQprLTZVQiI/J0iWimaoU13DXhp6+C2/excfkXapaHMP0Ci+g9/wEg3jEtKqgP58OruaZ/UWx/+5pOIv2Kk7ciEmZQc1ElSQyu2fANqukGbCCeq7mWIqiPCrPqjTpvpP6rmFtAmxNCsxap48rYI/lHpVnpMU5Bu1q7n+BPu/PiN0a0wSo5Wk8WWRf/e35AK/ieZgxo/sWAAAAAElFTkSuQmCC"
                    alt=""
                  />
                  <span >【{{item?.year}}】{{ item?.name }}</span>
                </a>
              </div>
            </div>
            <div class="bottom">
              <span>{{ item.fever }}</span>
              <span class="ncicon">
                <svg
                  focusable="false"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  width="14"
                  height="14"
                  aria-hidden="true"
                  data-v-79ba69ea=""
                >
                  <path
                    fill="currentColor"
                    fill-rule="nonzero"
                    d="M402.9903 66.186a8.1175 8.1175 0 0 1 8.2143-.138l41.6807 24.5195c57.062 33.6635 102.7632 81.928 135.6282 143.8718 39.7627 74.48 57.8735 142.95 54.185 203.6403a5.8983 5.8983 0 0 0 1.9918 4.867 5.571 5.571 0 0 0 4.3525 1.4748 6.2715 6.2715 0 0 0 4.1311-1.991c21.283-23.7083 36.3323-47.7852 44.484-71.3829l13.0944-37.6087a8.1505 8.1505 0 0 1 5.6798-5.162 8.154 8.154 0 0 1 7.4515 1.8436l29.361 26.916a350.3552 350.3552 0 0 1 83.5826 116.1447C856.93 518.2378 867 566.023 867 615.2093c.0969 93.5791-37.4068 183.2768-104.0915 248.9551a351.6027 351.6027 0 0 1-112.8698 75.2912 356.7534 356.7534 0 0 1-61.2226 19.3034 159.417 159.417 0 0 0 36.9762-27.3884c30.243-29.781 47.2516-70.4532 47.2077-112.8854 0-22.303-4.567-43.9705-13.684-64.4009a158.8649 158.8649 0 0 0-37.9065-52.6642l-13.3158-12.2048a3.6985 3.6985 0 0 0-3.3794-.8359 3.6962 3.6962 0 0 0-2.576 2.3406l-5.9385 17.0532c-3.697 10.7-10.5222 21.6174-20.1744 32.3676a2.8445 2.8445 0 0 1-1.8736.9028 2.5269 2.5269 0 0 1-1.974-.6687 2.6743 2.6743 0 0 1-.9033-2.2069c1.6728-27.5192-6.5408-58.566-24.574-92.338-14.905-28.0876-35.6315-49.9725-61.5103-65.2368l-18.903-11.118a3.682 3.682 0 0 0-3.7254.0626 3.6776 3.6776 0 0 0-1.7616 3.2812l1.0037 21.935c.6859 14.9968-1.0539 28.2549-5.169 39.2893a130.3383 130.3383 0 0 1-21.496 37.2495c-6.4906 7.8578-13.7675 14.9466-21.7302 21.0657a161.2231 161.2231 0 0 0-45.8692 55.5566c-20.5999 41.5477-22.0234 90.0133-3.8977 132.6972 14.4106 33.5552 39.7605 61.0533 71.687 78.1757a355.0208 355.0208 0 0 1-61.4524-19.443c-84.9195-35.4725-152.7011-102.58-189.0017-187.1219-39.9666-94.1341-36.8277-201.0191 8.5943-292.6476 24.0373-47.9437 58.6137-89.8303 101.1403-122.5233 17.5575-13.495 33.6027-29.1284 47.9143-46.4579a287.4584 287.4584 0 0 0 47.398-82.1492c9.0738-24.3351 12.91-53.574 11.3976-86.6476l-2.213-48.3752c-.1127-2.9375 1.3733-5.706 3.8841-7.2363z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
</template>

<style lang="less" scoped>
.bank {
    .card {
      .question_list {
        display: flex;
        flex-wrap: wrap;

        .question_item {
          position: relative;
          width: 376px;
          height: 94px;
          padding: 16px 20px 16px 16px;
          transition: all 0.2s ease;
          border-radius: 12px;
          background-color: rgb(248 248 248 / 100%);
          cursor: pointer;

          &:hover {
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 1px 4px 0 rgb(0 0 0 / 2%), 0 2px 12px 0 rgb(0 0 0 / 4%),
            0 2px 6px 0 rgb(0 0 0 / 2%);

            transform: translateY(-4px);
            transition: all 0.2s ease;
            background-color: #fff;
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
            var(--tw-shadow);
            color: rgb(50 202 153 / 100%);

            .center .text a {
              color: rgb(50 202 153 / 100%);
            }
          }

          .center {
            display: flex;
            align-items: center;
            height: 48px;

            .picture {
              width: 48px;
              height: 48px;
              margin-top: 4px;
              margin-right: 8px;
              overflow: hidden;
              border-radius: 12px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .text {
              flex: 1 1 0%;
              transition: all 0.2s ease;
              color: rgb(51 51 51 / 100%);

              a {
                font-size: 14px;
                line-height: 21px;

                img {
                  width: 14px;
                  height: 14px;
                  vertical-align: -1px;
                }

                span {
                }
              }
            }
          }

          .bottom {
            color: rgb(153 153 153 / 100%);
            font-size: 14px;
            line-height: 14px;
            text-align: right;

            .ncicon {
              display: inline-block;
              margin-left: 4px;
              color: rgb(204 204 204 / 100%);
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
        }
      }
    }
}
</style>

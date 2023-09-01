<script lang="ts" setup>
import { useAdminStore } from "@/store/modules/adminStore";
import { onMounted } from "vue";
import SvgIcon from "@/components/Icon/src/SvgIcon.vue";
import {Progress} from "ant-design-vue";
import { AccountListItem } from "@/api/sys/model/systemModel";
import { useGo } from "@/hooks/web/usePage";
const go = useGo()
const adminStore = useAdminStore()
onMounted(()=>{
  adminStore.getRankListAction()
})

const itemClick = (account:AccountListItem)=>{
  go('/system/account_detail/'+account.id)
  console.log(account);
}
</script>

<template>
  <div class="home_mp">
    <span class="home_mp_icon"></span>
    <span  class="h-reward-info">修仙榜</span>
    <div class="content_list">
      <template v-for="(item, index) in adminStore.rankList" :key="item.id">
        <div class="list_item" @click="itemClick(item)">
          <div class="rate-num" :class="`rating-${index+1}`">{{index+1}}
          </div>
          <div class="list_icon">
            <img alt="" :src="item.avatar">
          </div>
          <div class="list_info">
            <p class="list_name">{{ item.nickname }}
              <span v-if="item.gender!==0" id="h-gender" class="icon gender" :class="{'female':item.gender===2, 'male':item.gender===1}"></span>
              <svg-icon :name="`lv_${item.levelInfo?.level}`" :size="item.levelInfo?.level===1?28:38" class="ml-2" :class="{'mr-3':item.levelInfo?.level===1}"/>
              <span  class="duan"
              :style="{backgroundColor:item.levelInfo?.bgColor, color:'#fff'}">{{ item.levelInfo?.name }}</span>
            </p>

            <p class="list_level mt-2">刷题：{{ item.doneCount }}</p>
          </div>

          <div class="progress">
            <Progress  :stroke-color="item.levelInfo?.bgColor" :format="percent=>`${item.doneCount}/${item.levelInfo?.doneCount}`"
                       :percent="item.doneCount/ item.levelInfo?.doneCount * 100"  />
          </div>
        </div>
      </template>


    </div>
  </div>

</template>

<style lang="less" scoped>
.home_mp{
  padding: 20px 10px 30px;
  position: relative;
  .home_mp_icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(//s1.hdslb.com/bfs/static/jinkela/account/assets/icons_m_2.png) no-repeat;
    margin-right: 6px;
    margin-left: 10px;
    background-position: -145px -82px;
  }
  .h-reward-info{
    font-size: 20px;
    color: #222;
    margin-right: 6px;
    vertical-align: top;
  }
  .content_list{
    margin-top: 10px;
    padding-bottom: 4px;
    .list_item{
      background: #fff;
      width: 50%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      margin-right: 14px;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid #fff;
      margin-bottom: 10px;
      &:hover{
        border: 1px solid #e5e9ef;
        box-shadow: 0 2px 4px rgba(0,0,0,.14);
      }
      .rate-num{
        display: inline-block;
        width: 22px;
        height: 22px;
        font-weight: 600;
        font-style: italic;
        line-height: 22px;
        text-align: center;
        color: #333;
        white-space: nowrap;
        margin-right: 20px;
      }
      .list_icon{
        width: 68px;
        height: 68px;
        float: left;
        //border: 1px solid #e5e9ef;
        img{
          border-radius: 50%;
          max-width: 100%;
          margin: 0 auto;
          vertical-align: middle;
        }
      }
      .list_info{
        width: 250px;
        margin-left: 20px;
        overflow: hidden;
        float: left;
        vertical-align: top;
        .list_name{
          font-size: 16px;
          display: flex;
          align-items: center;
          color: #222;
          margin: 0 10px 13px 0;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .icon{
            transform: translateY(-1px);
            width: 22px;
            margin-left: 3px;
            height: 18px;
            vertical-align: middle;
            background-image: url(//s1.hdslb.com/bfs/static/jinkela/space/asserts/icons.png);
          }
          .duan{
            font-size: 12px;
            padding: 2px 4px;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
          }
          .male{
            display: inline-block;
            background-position: -212px -472px;
          }
          .female{
            display: inline-block;
            background-position: -212px -404px;
          }
        }
        .list_level{
          line-height: 12px;
          font-size: 14px;
          color: #99a2aa;
          width: 100%;
        }

      }
      .progress{
        width: 200px;
      }
      .rating-1{
        color: #fff;
        background: url(https://static.nowcoder.com/images/img/platform/rating-num.png) no-repeat;
        background-position: 0 0;

      }
      .rating-2{
        color: #fff;
        background: url(https://static.nowcoder.com/images/img/platform/rating-num.png) no-repeat;
        background-position: 0 -32px;
      }
      .rating-3{
        color: #fff;
        background: url(https://static.nowcoder.com/images/img/platform/rating-num.png) no-repeat;
        background-position: 0 -64px;
      }
    }
  }
}
</style>

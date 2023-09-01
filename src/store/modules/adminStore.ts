import { defineStore } from 'pinia'
import {
  createAccountAPI,
  createRoleAPI, getRankListAPI, getUserDetail, resetPassAPI,
  setPassAPI,
  updateAccountInfo,
  updatePassAPI,
  updateRoleAPI
} from "@/api/sys/system";
import {
  AccountListItem,
  PassParam, ResetPassParam,
  RoleListItem,
  SetPassParam
} from "@/api/sys/model/systemModel";
import { ref } from "vue";


export const useAdminStore = defineStore('admin', () => {
const rankList = ref<AccountListItem[]>()
  const accountDetail = ref<AccountListItem>()

//   更新账号信息
  const updateAccountAction = async(params: AccountListItem)=>{
    let res = await updateAccountInfo(params)
    console.log(res);
  }
  // 获取用户详情
  const getDetailAction = async(params: {id:number})=>{
    const res = await getUserDetail(params)
    accountDetail.value = res
  }

  // 创建账号
  const createAccountAction = async (params:AccountListItem)=>{
    let res = await createAccountAPI(params)
    console.log(res);
  }

  //   更新角色信息
  const updateRoleAction = async(params: RoleListItem)=>{
    let res = await updateRoleAPI(params)
    console.log(res);
  }

  // 创建角色
  const createRoleAction = async (params:RoleListItem)=>{
    let res = await createRoleAPI(params)
    console.log(res);
  }

  //更新密码
  const updatePassAction = async(params: PassParam )=>{
    const res = await updatePassAPI(params)
    return res
  }
  // 设置密码
  const setPassAction = async (params:SetPassParam)=>{
     return  await setPassAPI(params)
  }
  // 重置密码
  const resetPassAction = async(params: ResetPassParam)=>{
    return await resetPassAPI(params)
  }
  //   获取用户列表
  const getRankListAction = async () => {
    const res:any = await getRankListAPI()
    rankList.value = res
  }


  return {
  rankList,
    accountDetail,
    getDetailAction,
    getRankListAction,
    updateAccountAction,
    createAccountAction,
    updateRoleAction,
    createRoleAction,
    updatePassAction,
    setPassAction,
    resetPassAction
  }
})

import { defineStore } from 'pinia'
import {
  createAccountAPI,
  createRoleAPI, resetPassAPI,
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


export const useAdminStore = defineStore('admin', () => {
  // const bankList = ref<BankItem[]>()

//   更新账号信息
  const updateAccountAction = async(params: AccountListItem)=>{
    let res = await updateAccountInfo(params)
    console.log(res);
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
    console.log(res);
  }
  // 设置密码
  const setPassAction = async (params:SetPassParam)=>{
     return  await setPassAPI(params)
  }
  // 重置密码
  const resetPassAction = async(params: ResetPassParam)=>{
    return await resetPassAPI(params)
  }



  return {
    updateAccountAction,
    createAccountAction,
    updateRoleAction,
    createRoleAction,
    updatePassAction,
    setPassAction,
    resetPassAction
  }
})

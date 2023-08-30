import { defineStore } from 'pinia'
import { createAccountAPI, createRoleAPI, updateAccountInfo, updateRoleAPI } from "@/api/sys/system";
import { AccountListItem, RoleListItem } from "@/api/sys/model/systemModel";


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




  return {
    updateAccountAction,
    createAccountAction,
    updateRoleAction,
    createRoleAction
  }
})

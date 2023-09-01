import {
  AccountParams,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel, AccountListItem, RoleListItem, PassParam, SetPassParam, ResetPassParam
} from "./model/systemModel";
import { defHttp } from '@/utils/http/axios';

enum Api {
  AccountList = '/user',
  GetAllRoleList = '/admin/role',
  SetPassword='/user/setPassword',
  ResetPassword='/user/resetPassword',
  IsAccountExist = '/user/accountExist',
  UpdateAccountInfo = '/admin/update',
  GetRankList='/user/rank',
  CreateAccount = '/admin/create',
  RolePageList = '/admin/getRoleListByPage',
  setRoleStatus = '/admin/setRoleStatus',
  UpdateRole= '/admin/role',
  CreateRole='/admin/role',
  UpdatePassword='/user/password',
  GetUserInfoById = '/user/detail',
  DeptList = '/system/getDeptList',
  MenuList = '/system/getMenuList',
}

/**
 * 获取用户排行榜列表
 */
export const getRankListAPI = ()=>
   defHttp.get({url:Api.GetRankList})


// 获取用户详情
export const getUserDetail = (params:{id:number})=>
  defHttp.get({url:Api.GetUserInfoById, params})
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const updateAccountInfo = (params: AccountListItem) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.UpdateAccountInfo, params });

export const createAccountAPI = (params: AccountListItem) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.CreateAccount, params });

export const updateRoleAPI = (params: RoleListItem) =>
  defHttp.put<AccountListGetResultModel>({ url: Api.UpdateRole, params });

export const updatePassAPI = (params: PassParam) =>
  defHttp.put<AccountListGetResultModel>({ url: Api.UpdatePassword, params });

export const setPassAPI = (params: SetPassParam) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.SetPassword, params });

export const resetPassAPI = (params: ResetPassParam) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.ResetPassword, params });

export const createRoleAPI = (params: RoleListItem) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.CreateRole, params });

// 获取角色列表(分页
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (accountInfo: AccountListItem, isUpdate: boolean) =>
  defHttp.post({ url: Api.IsAccountExist, params: { accountInfo,isUpdate } }, { errorMessageMode: 'none' });

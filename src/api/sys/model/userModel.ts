import { UserInfo } from "#/store";

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
}
export interface RegisterParams {
  account: string;
  password: string;
  confirmPass:string;
  sms:string;
  mobile:string;
  policy:boolean
}

export interface LoginMobileParams {
  mobile: string;
  sms: string;
}
export interface GetCodeParams {
  mobile: string;
  mode:'login'|'register'|'reset',
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel extends UserInfo{

}

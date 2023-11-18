import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  LoginMobileParams,
  GetCodeParams,
  RegisterParams
} from "./model/userModel";

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/user/login',
  Register = '/user/register',
  LoginMobile='/user/login/mobile',
  GetCode='/user/smsCode',
  Logout = '/logout',
  GetUserInfo = '/user/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  UpdateUserInfo = '/user/update',

  GetNotifyList = '/user/notify'
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}
//发送验证码
export function sendCodeAPI(params: GetCodeParams) {
  return defHttp.get<any>({ url: Api.GetCode, params }, { errorMessageMode: 'none' });
}

// 手机号登录
export function loginByMobile(params: LoginMobileParams) {
  return defHttp.post<any>({ url: Api.LoginMobile , params}, { errorMessageMode: 'none' });
}

// 更新用户信息
export function updateUserInfo(params){
  return defHttp.put({url: Api.UpdateUserInfo, params})
}

// 获取通知公告
export function getNotifyListAPI(){
  return defHttp.get({url: Api.GetNotifyList})
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

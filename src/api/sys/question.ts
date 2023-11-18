import { defHttp } from "@/utils/http/axios";
import {
  BankItem,
  SortInfo,
  SingleListReturnType,
  SubmitQuestionParams, JudgeListReturnType, MulListReturnType
} from "./model/questionModel";

enum Api {
  GetBankList = '/question/bank',
}

// 获取题库列表  bank
export function getBankListAPI(){
  return defHttp.get<BankItem[]>({url: Api.GetBankList })
}

// 获取分类信息
export function getSortInfo(bankId: number){
  return defHttp.get<SortInfo>({url:`/question/${bankId}/sort` },)
}

// 获取单选题列表
export function getSingleListAPI(bankId: number){
  return defHttp.get<SingleListReturnType>({url:`/question/${bankId}/single`})
}

// 获取多选题列表
export function getMulListAPI(bankId: number){
  return defHttp.get<MulListReturnType>({url:`/question/${bankId}/multiple`})
}

// 获取判断题题列表
export function getJudgeListAPI(bankId: number){
  return defHttp.get<JudgeListReturnType>({url:`/question/${bankId}/judge`})
}

// 提交題目
export function submitQuestionAPI(params: SubmitQuestionParams){
  return defHttp.post({url:`/question/finish`, params})
}


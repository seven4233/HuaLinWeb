export type BankItem = {
  id: number;
  year: string;
  name: string;
  fever: number;

}

export type SortInfo = {
  bankInfo: BankItem;
  count:{
    singleCount: number;
    multipleCount: number;
    blankCount: number;
    judgeCount: number;
  },
  doneCount: {
    singleDoneCount: number;
    multipleDoneCount: number;
    blankDoneCount: number;
    judgeDoneCount: number;
  }

}
export type SingleOption = {
  label: string
  value: string
  question_num: string
  selected: boolean
  question_index:number
}
export type SingleItem = {
  question_num: string
  type: string
  name: string
  source: string
  source_dic:string;
  options: SingleOption[]
  answer: string
  question_index: number;
  your?:string;
}
export type JudgeItem = {
  question_num: string
  type: string
  name: string
  source: string
  source_dic:string;
  answer: string
  options: SingleOption[],
  question_index: number;
  your?:string;
}


export type SingleListReturnType = {
  doneCount: number;
  totalCount: number;
  list: SingleItem[]
}
export type JudgeListReturnType = {
  doneCount: number;
  totalCount: number;
  list: JudgeItem[]
}

export type UserInfo = {
  id: number;
  account: string;
  password: string;
  nickname: string;
  avatar: string;
  gender: number;
  phone: string;
  email: string;
  access: number;
  level: number;
  desc:string ;// 签名
  doneCount: number; //刷题总数
  duan: string; //段位
}

export type SubmitQuestionParams = {
  bankId: number, sort:string, correctList:any[]
}

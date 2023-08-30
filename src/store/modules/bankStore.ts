import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBankListAPI } from "@/api/sys/question";
import { BankItem } from "@/api/sys/model/questionModel";


export const useBankStore = defineStore('bank', () => {
  const bankList = ref<BankItem[]>()

//   获取题库列表
  const getBankListAction  = async()=>{
    const res = await getBankListAPI()
    console.log(res);
    bankList.value = res
    
  }

//   根据题库id 获取题库分类

  return { 
    bankList, 
    getBankListAction,
  }
})

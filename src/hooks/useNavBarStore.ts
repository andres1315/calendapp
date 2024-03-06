import { useAppDispatch, useAppSelector } from "../store/hook"
import { changeTab } from "../store/navbar/navBarSlice"
import type { Tab } from "../store/navbar/navBarSlice"

export const useNavBarStore = ()=>{
  const navbar    = useAppSelector((state) => state.navbar)
  const dispatch  = useAppDispatch()

  


  const onChangeTab = (tab:Tab)=>{
  
    dispatch(changeTab(tab))
  }

  const currentActiveTab = ()=>{
    const activeTab = navbar.tabs.find(tab => tab.active)
    if(!activeTab) throw new Error('tab not found')
    return activeTab
  }



  return{
    navbarLinks:navbar.tabs,
    onChangeTab,
    currentActiveTab:currentActiveTab()
  }

}
import { useAppDispatch, useAppSelector } from "../store/hook"
import { changeTab } from "../store/navbar/navBarSlice"
import type { Tab } from "../store/navbar/navBarSlice"
import { CalendarTab } from "../calendar/tabs/CalendarTab"
import { CustomersTab } from "../calendar/tabs/CustomersTab";
import { EmployesTab } from "../calendar/tabs/EmployesTab";
import { ExpendituresTab } from "../calendar/tabs/ExpendituresTab";
import { IncomesTab } from "../calendar/tabs/IncomesTab";
import { ServicesTab } from "../calendar/tabs/ServicesTab";
import { useEffect } from "react";
export interface ComponentsTabs {
  Calendar: ()=>JSX.Element;
  Customers:()=> JSX.Element;
  Employes:()=> JSX.Element;
  Expenditures:()=> JSX.Element;
  Incomes:()=> JSX.Element;
  Services:()=> JSX.Element
}
export const useNavBarStore = ()=>{
  const navbar    = useAppSelector((state) => state.navbar)
  const dispatch  = useAppDispatch()



  const componentsTabs: ComponentsTabs = {
    Calendar: CalendarTab,
    Customers: CustomersTab ,
    Employes: EmployesTab ,
    Expenditures: ExpendituresTab ,
    Incomes: IncomesTab ,
    Services:ServicesTab
  };


  const onChangeTab = (tab:Tab)=>{
  
    dispatch(changeTab(tab))
  }


  const componentToRender = ()=>{
    const activeTab = navbar.tabs.find(tab => tab.active)
    if(!activeTab) throw new Error('tab not found')
    return activeTab.componentName as keyof ComponentsTabs
  }


  return{
    navbarLinks:navbar.tabs,
    onChangeTab,
    componentToRender:componentToRender(),
    componentsTabs,

  }

}
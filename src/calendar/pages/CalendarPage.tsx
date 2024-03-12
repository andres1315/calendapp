import { useNavBarStore } from "../../hooks/useNavBarStore";
import { CalendarTab } from "../tabs/CalendarTab";
import { CustomersTab } from "../tabs/CustomersTab";
import { EmployesTab } from "../tabs/EmployesTab";
import { ExpendituresTab } from "../tabs/ExpendituresTab";
import { IncomesTab } from "../tabs/IncomesTab";
import { ServicesTab } from "../tabs/ServicesTab";

interface ComponentsTabs {
  Calendar: JSX.Element;
  Customers: JSX.Element;
  Employes: JSX.Element;
  Expenditures: JSX.Element;
  Incomes: JSX.Element;
  Services: JSX.Element
}

export const CalendarPage = () => {
  const { currentActiveTab } = useNavBarStore();

  const componentsTabs: ComponentsTabs = {
    Calendar: <CalendarTab />,
    Customers: <CustomersTab />,
    Employes: <EmployesTab />,
    Expenditures: <ExpendituresTab />,
    Incomes: <IncomesTab />,
    Services:<ServicesTab/>
  };
  const componentRender =
    currentActiveTab.componentName as keyof ComponentsTabs;

  return componentsTabs[componentRender];
};

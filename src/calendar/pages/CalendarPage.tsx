import { useNavBarStore } from "../../hooks/useNavBarStore";
import { CalendarTab } from "../tabs/CalendarTab";
import { CustomersTab } from "../tabs/CustomersTab";
import { EmployesTab } from "../tabs/EmployesTab";
import { ExpendituresTab } from "../tabs/ExpendituresTab";
import { IncomesTab } from "../tabs/IncomesTab";

interface ComponentsTabs {
  Calendar: JSX.Element;
  Customer: JSX.Element;
  Employes: JSX.Element;
  Expenditures: JSX.Element;
  Incomes: JSX.Element;
}

export const CalendarPage = () => {
  const { currentActiveTab } = useNavBarStore();

  const componentsTabs: ComponentsTabs = {
    Calendar: <CalendarTab />,
    Customer: <CustomersTab />,
    Employes: <EmployesTab />,
    Expenditures: <ExpendituresTab />,
    Incomes: <IncomesTab />,
  };
  const componentRender =
    currentActiveTab.componentName as keyof ComponentsTabs;

  return componentsTabs[componentRender];
};

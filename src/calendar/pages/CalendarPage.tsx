import { useNavBarStore} from "../../hooks/useNavBarStore";



export const CalendarPage = () => {
  const { componentsTabs,componentToRender } = useNavBarStore();
  const ComponentRender =componentsTabs[componentToRender] 

  return <ComponentRender/>
};

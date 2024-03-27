
import { NewEmploye } from "../components/employes/NewEmploye";
import { TableEmploye } from "../components/employes/TableEmploye";

export const EmployesTab = () => {



  return (
    <>
      <div className="grid grid-cols-12 ">
        <section className="col-span-12 md:col-span-3 md:border-r-2 min-h-[90vh] px-2">
          <NewEmploye />
        </section>
        <section className="col-span-12 md:col-span-9 mx-2 ">
          <TableEmploye />
        </section>
      </div>
    </>
  );
};

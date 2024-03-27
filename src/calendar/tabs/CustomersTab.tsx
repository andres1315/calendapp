
import { NewCustomer } from "../components/customer/NewCustomer";
import { TableCustomer } from "../components/customer/TableCustomer";

export const CustomersTab = () => {



  return (
    <>
      <div className="grid grid-cols-12 ">
        <section className="col-span-12 md:col-span-3 md:border-r-2 min-h-[90vh] px-2">
          <NewCustomer />
        </section>
        <section className="col-span-12 md:col-span-9 mx-2  ">
          <TableCustomer />
        </section>
      </div>
    </>
  );
};

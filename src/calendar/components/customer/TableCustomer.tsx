import { Table } from "flowbite-react";
import { useCustomers } from "../../../hooks/useCustomers";

export const TableCustomer = () => {
  const {customers} = useCustomers()
  return (
    <div className="overflow-x-auto ">
      <Table hoverable className="flex-1 w-full">
        <Table.Head >
          <Table.HeadCell className="bg-rose-100/40">Nombre</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">Telefono</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            customers.map(customer=>(

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {customer.firstName.toUpperCase()} {customer.lastName.toUpperCase()}
            </Table.Cell>
            <Table.Cell>{customer.phone}</Table.Cell>

            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
            ))
          }
          
        </Table.Body>
      </Table>
    </div>
  );
};

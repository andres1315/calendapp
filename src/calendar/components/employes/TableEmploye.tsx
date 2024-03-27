import { Table } from "flowbite-react"
import { useEmployeStore } from "../../../hooks/useEmployeStore"

export const TableEmploye = () => {
  const {employes} = useEmployeStore()
  return (
    <div className="overflow-x-auto ">
      <Table hoverable className="flex-1 w-full">
        <Table.Head >
          <Table.HeadCell className="bg-rose-100/40">Nombre</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">Usuario</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">Telefono</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            employes.map(employe=>(

          <Table.Row className="bg-white [&>*]:py-2" key={employe.id}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
              {employe.firstName.toUpperCase()} {employe.lastName.toUpperCase()}
            </Table.Cell>
            <Table.Cell>{employe.user}</Table.Cell>
            <Table.Cell>{employe.phone}</Table.Cell>

            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline "
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
  )
}

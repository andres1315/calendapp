import { Table } from "flowbite-react"
import { useServiceStore } from "../../../hooks/useServiceStore"

export const TableServices = () => {
  const {service} =  useServiceStore()
  return (
    <div className = 'overflow-x-auto'>
      <Table hoverable className="flex-1 w-full">
        <Table.Head >
          <Table.HeadCell className="bg-rose-100/40">Servicio</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">Tiempo en Min</Table.HeadCell>
          <Table.HeadCell className="bg-rose-100/40">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            service.map(serv=>(

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={serv.id}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {serv.service.toUpperCase()} 
            </Table.Cell>
            <Table.Cell>{serv.time}</Table.Cell>

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
  )
}

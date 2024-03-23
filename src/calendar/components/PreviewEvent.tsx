import { formatToPriceCop } from "../../helpers/formatNumber"
import { useAppSelector } from "../../store/hook"
import { EventDatabase } from "../../types"



export const PreviewEvent = () => {
  const {activeEvent} = useAppSelector(state => state.calendar) 
  if(!activeEvent) return

  const event:EventDatabase  =activeEvent
  const fullNameCustomer = `${event.customer.firstName} ${event.customer.lastName}`.toUpperCase()
  const contactCustomer = event.customer.phone
  const title =  event.title
  const notes =  event.notes
  const time =  `${event.service.time}`
  return (
    <>
    <div className="flex flex-col  mx-12 ">
      

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Notas: {notes}</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cliente</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{fullNameCustomer}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Telefono</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{contactCustomer}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Servicio</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{event.service.service}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Duracion</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{time}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Precio</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formatToPriceCop(event.price)}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Restante</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formatToPriceCop(event.price  - event.payment)}</dd>
          </div>
         
        </dl>
        <div className='flex justify-center'>
          <button className="bg-rose-400 w-1/4 rounded-lg text-white font-bold hover:bg-rose-500">Editar / Pagar</button>
        </div>
      </div>
    </div>

 
    </>
  )
}

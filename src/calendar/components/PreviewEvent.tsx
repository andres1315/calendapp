import {  useState } from "react";
import { formatToPriceCop } from "../../helpers/formatNumber";

import { EventDatabase } from "../../types";
import Swal from "sweetalert2";
import { useIncome } from "../../hooks/useIncomeStore";
import { useModalStore } from "../../hooks/useModalStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

const valuesPayment = {
  valuePay  :0,
  methodPay :1 //1=> efectivo. 2=> transferencia
}

export interface PayToEvent{
  description:string,
  value:number,
  third:number,
  typeTransaction:number,
  transactionId:number,
  userCreated:number,
  methodPayment:number
}

export const PreviewEvent = () => {

 
 
  const [payValues, setPayValues] = useState(valuesPayment);
  const {onCreateIncomeToEvent} = useIncome()
  const {removeActiveEvent,activeEvent,updateEvent}= useCalendarStore()
  const {closeModal} = useModalStore()


  if (!activeEvent) return;
  const event: EventDatabase = activeEvent;
  const fullNameCustomer =
    `${event.customer.firstName} ${event.customer.lastName}`.toUpperCase();
  const contactCustomer = event.customer.phone;
  const title = event.title;
  const notes = event.notes;
  const time = `${event.service.time}`;

  const onChangeValuePay = (valuePay: string) => {
    const value = Number(valuePay);
    setPayValues(prev => ({...prev,valuePay:value}));
  };

  const onChangeMethodPay = (valueMethodPay:string)=>{
    setPayValues(prev=> ({...prev, methodPay: Number(valueMethodPay)}))
    console.log('method pay is',valueMethodPay)
  }
  const onClickPayment = () => {
    if(event.payment == event.price) return  Swal.fire('Opps','No tiene saldo pendiente','warning')
    if(payValues.valuePay <= 0) return Swal.fire('Opps','El valor del pago debe ser mayor a 0','warning')
    const pricePendingPay = event.price- event.payment
    if(pricePendingPay < payValues.valuePay) return Swal.fire('Opps','El valor ingresado el superior al valor restante','warning')
    const createPayToEvent:PayToEvent  ={
      description:`Pago de cita por valor de ${payValues.valuePay}`,
      value:payValues.valuePay,
      third:event.customerId,
      typeTransaction:1,
      transactionId:event.id,
      userCreated:1,
      methodPayment:payValues.methodPay
    }
    onCreateIncomeToEvent(createPayToEvent)
    .then((res)=>{
      if(res.status == 201) Swal.fire('Exito','Pago registrado','success')
      const eventToUpdate = {
        ...event,
        payment:event.payment+payValues.valuePay
      }
      updateEvent(eventToUpdate)
      removeActiveEvent()
      closeModal()
    })

  };
  return (
    <>
      <div className="grid grid-cols-12  gap-4">
        <div className="col-span-12 md:col-span-6 flex flex-col  mx-12 ">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Notas: {notes}
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Cliente
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {fullNameCustomer}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Telefono
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {contactCustomer}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Servicio
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {event.service.service}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Duracion
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {time}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col  mx-12 md:bg-gray-100/80 md:rounded-xl p-8">
          <h5 className="font-semibold">Resumen Pagos</h5>
          <div className="my-2  divide-y-2 ">
            <div className="py-4 flex justify-between">
              <span className="font-semibold ">Precio</span>
              <span>{formatToPriceCop(event.price)}</span>
            </div>
            <div className="py-4 flex justify-between">
              <span className="font-semibold">Restante</span>
              <span>{formatToPriceCop(event.price - event.payment)}</span>
            </div>
            <section className="flex flex-col ">
              <div className="relative mt-2 rounded-md shadow-sm w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={payValues.valuePay}
                  onChange={(e) => onChangeValuePay(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Metodo de pago
              </p>
              <div className="mt-2 flex justify-around ">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="methodPayment"
                    type="radio"
                    checked = {payValues.methodPay ==1}
                    value={1}
                    onChange={(e)=>onChangeMethodPay(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Efectivo
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="methodPayment"
                    type="radio"
                    checked = {payValues.methodPay ==2}

                    value={2}
                    onChange={(e)=>onChangeMethodPay(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Transferencia
                  </label>
                </div>
              </div>
              <div className="flex justify-center">

              <button
                className="bg-rose-400 w-2/4 p-2 rounded-lg text-white font-bold hover:bg-rose-500 mt-2 disabled:bg-gray-300"
                onClick={()=>onClickPayment()}
                disabled={event.payment == event.price}
              >
                Pago / Abono
              </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

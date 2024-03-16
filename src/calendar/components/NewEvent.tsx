import { addHour, addMinute, format } from "@formkit/tempo";
import { FormEvent, useEffect, useState } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { CustomComboBox } from "./employes/ComboBoxEmploye";
import { useCustomers } from "../../hooks/useCustomers";
import { useEmployeStore } from "../../hooks/useEmployeStore";
import { useServiceStore } from "../../hooks/useServiceStore";
import { Label, Select } from "flowbite-react";

export const NewEvent = () => {
  const currentDate = new Date();
  const formatDateInput ='YYYY-MM-DDTHH:mm:s'
  const [formValues, setFormValues] = useState({
    customerId: "",
    service: "",
    employeId: 2,
    start: format(currentDate, formatDateInput, "es"),
    end: format(addHour(currentDate, 2), formatDateInput, "es"),
    notes: "",
  });



  const { addNewEvent } = useCalendarStore();
  const { findCustomer } = useCustomers();
  const {onFindEmploye} =  useEmployeStore()
  const {service} = useServiceStore()

  const [customerSelected, setCustomerSelected] = useState(null);
  const [employeSelected, setEmployeSelected] = useState(null);
  const timeOnHour = (time:number)=>{
    const hours = Math.floor(time/60)
    const minutes = time % 60
    return `${hours}:${minutes}`
  }
    
  
  const onInputChange = ({
    target,
  }: {
    target: HTMLInputElement ;
  }) => {
    const { name, value } = target;
    console.log(value)
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  const onChangeService = (e:HTMLSelectElement)=>{
    const serviceSelected = e.value
    if(!serviceSelected) return
    const serviceData = service.find(ser => ser.id === Number(serviceSelected))
    const timeServiceSelected = serviceData!.time
    const newEndTIme =format(addMinute(formValues.start, timeServiceSelected), formatDateInput, "es")
    setFormValues(prev=>{
      return {
        ...prev,
        service:(serviceSelected),
        end:newEndTIme
      
      }
    })
/*     document.querySelector('#end').value=newEndTIme */
  }
  
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCalendarEvent = formValues;

    addNewEvent(newCalendarEvent);
  };
  return (
    <form onSubmit={(e) => handleSubmitForm(e)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informacion cita
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <CustomComboBox
                placeholder="..."
                name="customer"
                label="Cliente"
                fnFind={findCustomer}
                selectedItem={customerSelected}
                setSelectedItem={setCustomerSelected}
              />
            </div>

            <div className="sm:col-span-3">
            <CustomComboBox
                placeholder=" .."
                name="employe"
                label="Especialista"
                fnFind={onFindEmploye}
                selectedItem={employeSelected}
                setSelectedItem={setEmployeSelected}
              />
   
            </div>

            <div className="sm:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="services" value="Servicio" />
              </div>
              <Select id="services" required onChange={(e)=>onChangeService(e.target)} defaultValue={formValues.service}

              >
                <option value="" disabled >Seleccione ...</option>
                {service?.map((servi)=>(
                  <option key={servi.id} value={servi.id}>{servi.service} / {timeOnHour(servi.time)} Hrs</option>
                ))}
              </Select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha Inicio
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  name="start"
                  onChange={onInputChange}
                  required
                  value={formValues.start}
                  id="start"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha Fin
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  name="end"
                  required
                  onChange={onInputChange}
                  value={formValues.end}
                  id="end"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Notas
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="notes"
                  onChange={onInputChange}
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agendar
        </button>
      </div>
    </form>
  );
};

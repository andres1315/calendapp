import { addHour, format } from "@formkit/tempo";
import { FormEvent, useState} from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";


export const NewEvent = () => {
  const currentDate = new Date();
  const [formValues,setFormValues] =useState({
    customerId:'',
    service:'',
    employeId:2,
    start:format(currentDate, "YYYY-MM-DDTHH:mm:ss", 'es'),
    end:format(addHour(currentDate,2), "YYYY-MM-DDTHH:mm:ss", 'es'),
    notes:''
  
  })

  const {addNewEvent,} = useCalendarStore();

  const onInputChange =({target}:{target:HTMLInputElement|HTMLSelectElement })=>{
    const {name,value} = target;
    setFormValues(prev => ({...prev, [name]:value}))
  }


  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCalendarEvent = formValues
    addNewEvent(newCalendarEvent);
  }
  return (
    <form onSubmit={e=>handleSubmitForm(e)} >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informacion cita
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="customerId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cliente
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="customerId"
                  required
                  onChange={onInputChange}
                  id="customerId"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Servicio
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={onInputChange}
                  required
                  name="service"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Especialista
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  onChange={onInputChange}
                  name="employeId"
                  required
                  defaultValue={formValues.employeId}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={1}>Tatiana Murillo</option>
                  <option value={2}>Lashista 1</option>
                  <option value={3}>Lashista 2</option>
                </select>
              </div>
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
                  defaultValue={formValues.start}
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
                  defaultValue={formValues.end}
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

import { Label, Select, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form"
import { useServiceStore } from "../../../hooks/useServiceStore";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";

type Inputs ={
  service:string;
  time:number
  isMounting:number
}

export const NewServices = () => {

  const {register, handleSubmit,reset, formState:{errors}} = useForm<Inputs>()
  const {onAddService} = useServiceStore()

  const onSumbit:SubmitHandler<Inputs> = (data)=>{
    const dataHandle ={
      ...data,
      isMounting: (data.isMounting>0)
    
    }
    onAddService(dataHandle)
      .then((res:AxiosResponse)=>{
        const {status} =  res
        if(Number(status) === 201){
          Swal.fire({
            title:'Nuevo Servicio',
            text:'Creado con exito',
            icon:'success'
          })
          reset()
        }
      })
  }
  return (
    <form
      onSubmit={handleSubmit(onSumbit)}
      className="flex flex-col  items-center [&>*]:w-full"
    >
      <div className="mt-2">
        <Label htmlFor="small" value="Nombre Servcio" className="text-rose-500/50" />
        <TextInput
          id="service"
          type="text"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="extension de pestañas clasica"
          {...register("service", { required: true })}
        />
        {errors.service && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>
      
      <div className="mt-2">
        <Label htmlFor="small" value="Tiempo en minutos" className="text-rose-500/50" />
        <TextInput
          id="time"
          type="number"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="60"
          {...register("time", { required: true })}
        />
        {errors.time && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>
      <div className="mt-2">
        <div className="mb-2 block ">
          <Label htmlFor="isMounting" value="Es montaje?" className="text-rose-500/50" />
        </div>
        <Select 
          id="isMounting" 
          required 
          defaultValue={1}
          {...register('isMounting',{required: true})}
          >
          <option value={1}>Si</option>
          <option value={0}>No</option>
        </Select>
      </div>
      <div className="flex justify-center">
        <button className="border bg-rose-500/50 hover:bg-rose-500/70 text-white w-3/5 mt-5 py-1 rounded-lg text-lg ">
          Guardar
        </button>
      </div>
      
    </form>
  )
}

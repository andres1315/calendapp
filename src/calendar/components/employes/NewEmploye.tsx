import { Label, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form"
import { useEmployeStore } from "../../../hooks/useEmployeStore"
import Swal from "sweetalert2"
import { AxiosResponse } from "axios"

type Inputs ={
  firstName:string
  lastName:string
  phone:number
  user:string
  password:string 
}
export const NewEmploye = () => {
  const {reset,register, handleSubmit, formState:{errors}} = useForm<Inputs>()
  const {onNewEmploye} = useEmployeStore()
  const onSumbitForm=(data:Inputs)=>{
    console.log(data)
    onNewEmploye(data)
      .then((res:AxiosResponse)=>{
        const {status} =res
        if(Number(status) === 201 ){
          Swal.fire({
            title:'Nuevo Empleado',
            text:'Creado con exito',
            icon:'success'
          })
          reset()
        }
      })
  }
  return (
    <form
      onSubmit={handleSubmit(onSumbitForm)}
      className="flex flex-col  items-center [&>*]:w-full"
    >
      <div className="mb-2">
        <Label htmlFor="small" value="Nombres" className="text-rose-500/50" />
        <TextInput
          id="firstname"
          type="text"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="Angie tatiana"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>

      <div className="mb-2">
        <Label htmlFor="small" value="Apellido" className="text-rose-500/50" />
        <TextInput
          id="lastName"
          type="text"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="Murillo Vargas"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>

      <div className="mb-2">
        <Label htmlFor="small" value="Telefono" className="text-rose-500/50" />
        <TextInput
          id="phone"
          type="text"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="311XXXXXXX"
          {...register("phone", { required: true })}
        />
        {errors.phone && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>

      <div className="mb-2">
        <Label htmlFor="small" value="Usuario" className="text-rose-500/50" />
        <TextInput
          id="user"
          type="text"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="tatiana.m"
          {...register("user", { required: true })}
        />
        {errors.user && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>

      <div className="mb-2">
        <Label htmlFor="small" value="Contraseña" className="text-rose-500/50" />
        <TextInput
          id="password"
          type="password"
          className="border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full"
          sizing="sm"
          placeholder="***"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>
      <div className="flex justify-center">
        <button className="border bg-rose-500/50 hover:bg-rose-500/70 text-white w-3/5 mt-5 py-1 rounded-lg text-lg ">
          Guardar
        </button>
      </div>

    </form>
  )
}

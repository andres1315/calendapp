import { Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCustomers } from "../../../hooks/useCustomers";
import Swal from "sweetalert2";
type Inputs = {
  firstName: string;
  lastName: string;
  phone: number;
};
export const NewCustomer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const {createCustomer} =  useCustomers()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createCustomer(data)
      .then(response=>{
        const {status}=response
        Swal.fire({
          title:'Registro',
          text:'Se guardo el cliente con exito',
          icon:'success'
        })
        reset()
      })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <Label htmlFor="small" value="Apellidos" className="text-rose-500/50" />
        <TextInput
          id="lastname"
          type="text"
          sizing="sm"
          placeholder="Murillo"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <span className="font-bold text-rose-500 text-[10px]">
            Esta campo es requerido
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="small" value="Numero" className="text-rose-500/50" />
        <TextInput
          id="phone"
          type="number"
          sizing="sm"
          placeholder="314XXXXXXX"
          {...register("phone")}
        />
      </div>
      <div className="flex justify-center">
        <button className="border bg-rose-500/50 hover:bg-rose-500/70 text-white w-3/5 mt-5 py-1 rounded-lg text-lg ">
          Guardar
        </button>
      </div>
    </form>
  );
};

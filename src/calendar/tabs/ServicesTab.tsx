import { NewServices } from "../components/services/NewServices"


export const ServicesTab = () => {
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-12 md:col-span-3 md:border-r-2 min-h-[90vh] px-2">
        <NewServices/>
      </section>
      <section className="col-span-12 md:col-span-">

      </section>

    </div>
  )
}

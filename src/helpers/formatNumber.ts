export const formatToPriceCop = (value:number) => {
  return value.toLocaleString('es-CO',{currency: 'COP', style: 'currency', minimumFractionDigits: 0}) 
}
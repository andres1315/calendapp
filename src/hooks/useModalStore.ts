import { useAppDispatch, useAppSelector } from "../store/hook";
import { onCloseModal, onOpenModal } from "../store/modal/modalSlice";

export const useModalStore = ()=>{
  const dispatch = useAppDispatch();
  const {isOpen,modalTitle} =  useAppSelector((state)=>state.modal); 


  const openModal = ({title}:{title:string})=>{
    if(!title) return;
    dispatch(onOpenModal({title}));
  }

  const closeModal = ()=>{
    dispatch(onCloseModal());
  }


  return {
    openModal,
    closeModal,
    modalIsOpen:isOpen,
    modalTitle
  }
}
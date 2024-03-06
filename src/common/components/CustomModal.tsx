import {  Modal } from "flowbite-react";
import { useModalStore } from "../../hooks/useModalStore";

interface Props{
  children: JSX.Element;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" ;
}

export const CustomModal = ({  children,size='7xl' }: Props) => {
    const {closeModal, modalIsOpen,modalTitle} = useModalStore();
    return (
      <>
        <Modal show={modalIsOpen} onClose={closeModal} size={size}>
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>
      </>
    );
  
};

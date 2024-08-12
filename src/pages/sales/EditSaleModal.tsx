import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import { Sale } from "../../api/types";
import EditSaleForm from "./EditSaleForm";
  
  export interface Props {
    isOpen: boolean;
    onClose: () => void;
    sale: Sale;
  }
  
  const EditPurchaseModal = ({ isOpen, onClose, sale }: Props) => {
    return (
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"fit-content"}>
          <ModalHeader>Editar Venta</ModalHeader>
          <ModalCloseButton />
          <ModalBody w={"fit-content"} minW={"40vw"}>
            <EditSaleForm onClose={onClose} sale={sale} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditPurchaseModal;
  
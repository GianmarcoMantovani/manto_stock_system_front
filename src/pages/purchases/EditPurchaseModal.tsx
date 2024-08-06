import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Purchase } from "../../api/types";
import EditPurchaseForm from "./EditPurchaseForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  purchase: Purchase;
}

const EditPurchaseModal = ({ isOpen, onClose, purchase }: Props) => {
  return (
    <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader>Editar Compra</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <EditPurchaseForm onClose={onClose} purchase={purchase} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPurchaseModal;

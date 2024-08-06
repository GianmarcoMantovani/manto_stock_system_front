import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import CreatePurchaseForm from "./CreatePurchaseForm";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CreatePurchaseModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader color={"#448F85"}>Crear Compra</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <CreatePurchaseForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePurchaseModal;

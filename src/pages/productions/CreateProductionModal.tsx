import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import CreateProductionForm from "./CreateProductionForm";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CreateProductionModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader color={"#448F85"}>Crear Produccion</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <CreateProductionForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductionModal;

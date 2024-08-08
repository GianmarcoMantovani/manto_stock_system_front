import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import CreateProductForm from "./CreateProductForm";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader color={"#448F85"}>Crear Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <CreateProductForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;

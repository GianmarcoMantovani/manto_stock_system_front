import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import CreateSaleForm from "./CreateSaleForm";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CreateSaleModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader color={"#448F85"}>Crear Venta</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <CreateSaleForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateSaleModal;

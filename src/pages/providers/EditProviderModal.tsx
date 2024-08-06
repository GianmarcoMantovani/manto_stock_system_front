import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Provider } from "../../api/types";
import EditProviderForm from "./EditProviderForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}

const EditProviderModal = ({ isOpen, onClose, provider }: Props) => {
  return (
    <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader>Editar Proveedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <EditProviderForm onClose={onClose} provider={provider} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProviderModal;

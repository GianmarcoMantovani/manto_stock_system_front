import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Client } from "../../api/types";
import EditClientForm from "./EditClientForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
}

const EditClientModal = ({ isOpen, onClose, client }: Props) => {
  return (
    <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader>Editar Proveedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <EditClientForm onClose={onClose} client={client} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditClientModal;

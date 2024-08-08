import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Product } from "../../api/types";
import EditProductForm from "./EditProductForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const EditProductModal = ({ isOpen, onClose, product }: Props) => {
  return (
    <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <EditProductForm onClose={onClose} product={product} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;

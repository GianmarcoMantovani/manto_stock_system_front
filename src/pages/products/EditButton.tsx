import { Icon, useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Product } from "../../api/types";
import EditProductModal from "./EditProductModal";

export interface Props {
  product: Product;
}

const EditButton = ({ product }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Icon
        as={FaEdit}
        w={"2rem"}
        h={"2rem"}
        cursor={"pointer"}
        onClick={onOpen}
        _hover={{ transform: "scale(1.1)" }}
      />
      <EditProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
};

export default EditButton;

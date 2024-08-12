import { Icon, useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Sale } from "../../api/types";
import EditSaleModal from "./EditSaleModal";

export interface Props {
  sale: Sale;
}

const EditButton = ({ sale }: Props) => {
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
      <EditSaleModal isOpen={isOpen} onClose={onClose} sale={sale} />
    </>
  );
};

export default EditButton;
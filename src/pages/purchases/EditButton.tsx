import { Icon, useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Purchase } from "../../api/types";
import EditPurchaseModal from "./EditPurchaseModal";

export interface Props {
  purchase: Purchase;
}

const EditButton = ({ purchase }: Props) => {
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
      <EditPurchaseModal isOpen={isOpen} onClose={onClose} purchase={purchase} />
    </>
  );
};

export default EditButton;

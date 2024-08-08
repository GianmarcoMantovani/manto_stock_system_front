import { Icon, useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Client } from "../../api/types";
import EditClientModal from "./EditClientModal";

export interface Props {
  client: Client;
}

const EditButton = ({ client }: Props) => {
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
      <EditClientModal isOpen={isOpen} onClose={onClose} client={client} />
    </>
  );
};

export default EditButton;

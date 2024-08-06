import { Icon, useDisclosure } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Provider } from "../../api/types";
import EditProviderModal from "./EditProviderModal";

export interface Props {
  provider: Provider;
}

const EditButton = ({ provider }: Props) => {
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
      <EditProviderModal isOpen={isOpen} onClose={onClose} provider={provider} />
    </>
  );
};

export default EditButton;

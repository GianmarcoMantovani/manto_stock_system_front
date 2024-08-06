import { Icon, useDisclosure } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import DeleteModal from "./DeleteModal";

export interface Props {
  id: number;
  queryKey: string;
  toastMessage: string;
  resource: string;
  mutationKey: string;
}

const DeleteButton = ({
  id,
  queryKey,
  toastMessage,
  resource,
  mutationKey,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Icon
        as={MdDeleteForever}
        w={"2rem"}
        h={"2rem"}
        cursor={"pointer"}
        onClick={onOpen}
        _hover={{ transform: "scale(1.1)", color: "red.600" }}
        color="red.500"
      />
      <DeleteModal
        id={id}
        isOpen={isOpen}
        onClose={onClose}
        queryKey={queryKey}
        toastMessage={toastMessage}
        resource={resource}
        mutationKey={mutationKey}
      />
    </>
  );
};

export default DeleteButton;

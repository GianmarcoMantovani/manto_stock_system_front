import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Production } from "../../../api/types";
import { getResource } from "../../../api/api";
import ProductionViewData from "./ProductionViewData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productionId: number;
}

const ProductionViewModal = ({ isOpen, onClose, productionId }: Props) => {
  const getAuthHeader = useAuthHeader();

  const { data: production, isSuccess } = useQuery({
    queryKey: [`production/${productionId}`],
    queryFn: () => getResource<Production>(`production/${productionId}`, getAuthHeader),
    select: (r) => r.data,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader color={"#448F85"}>PRODUCCION</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          w={"fit-content"}
          minW={"40vw"}
          overflowY={"scroll"}
          maxHeight={"60vh"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#F1F1F1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {isSuccess && <ProductionViewData production={production} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductionViewModal;

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
import { Sale } from "../../../api/types";
import { getResource } from "../../../api/api";
import SaleViewData from "./SaleViewData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  saleId: number;
}

const SaleViewModal = ({ isOpen, onClose, saleId }: Props) => {
  const getAuthHeader = useAuthHeader();

  const { data: sale, isSuccess } = useQuery({
    queryKey: [`sale/${saleId}`],
    queryFn: () => getResource<Sale>(`sale/${saleId}`, getAuthHeader),
    select: (r) => r.data,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader color={"#448F85"}>VENTA</ModalHeader>
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
          {isSuccess && <SaleViewData sale={sale} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SaleViewModal;

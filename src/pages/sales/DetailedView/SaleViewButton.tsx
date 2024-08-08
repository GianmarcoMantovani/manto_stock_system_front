import { Box, Button, useDisclosure } from "@chakra-ui/react";
import SaleViewModal from "./SaleViewModal";

interface Props {
  saleId: number;
}

const SaleViewButton = ({ saleId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button colorScheme={"orange"} variant={"solid"} onClick={onOpen}>
        DETALLE
      </Button>
      {isOpen && (
        <SaleViewModal isOpen={isOpen} onClose={onClose} saleId={saleId} />
      )}
    </Box>
  );
};

export default SaleViewButton;

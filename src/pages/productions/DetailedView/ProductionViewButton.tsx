import { Box, Button, useDisclosure } from "@chakra-ui/react";
import ProductionViewModal from "./ProductionViewModal";

interface Props {
  productionId: number;
}

const ProductionViewButton = ({ productionId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button colorScheme={"orange"} variant={"solid"} onClick={onOpen}>
        DETALLE
      </Button>
      {isOpen && (
        <ProductionViewModal
          isOpen={isOpen}
          onClose={onClose}
          productionId={productionId}
        />
      )}
    </Box>
  );
};

export default ProductionViewButton;

import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  VStack,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ProductionItemCreation } from "../../api/types";
import SyncField from "../../components/Dropdowns/SyncField";

interface Props {
  addProdItem: (price: ProductionItemCreation) => void;
}

const AddItemPopover = ({ addProdItem }: Props) => {
  const [productId, setProductId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover
      placement="auto-end"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button size={"xs"} colorScheme={"green"}>
          Agregar
        </Button>
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Agregar produccion</PopoverHeader>
        <PopoverBody>
          <VStack spacing={5}>
            <SyncField
              setter={setProductId}
              isRequired
              defaultValue={undefined}
              resource={"product"}
              title={"Producto"}
            />
            <Input
              type="number"
              placeholder="Ingrese cantidad"
              value={amount ? amount : ""}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button
              size={"sm"}
              colorScheme="green"
              w="full"
              isDisabled={productId === null || amount === null}
              onClick={() => {
                addProdItem({
                  productId,
                  amount,
                });
                setProductId(null);
                setAmount(null);
                onClose();
              }}
            >
              Agregar
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default AddItemPopover;

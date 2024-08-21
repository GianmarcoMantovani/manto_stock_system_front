import { HStack, Icon, VStack, Text, IconButton } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { IoPricetag } from "react-icons/io5";
import { Product, SaleItemCreation } from "../../api/types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import { getResource } from "../../api/api";

interface Props {
  saleItem: SaleItemCreation;
  removeItem: () => void;
}

const SaleItem = ({ saleItem, removeItem }: Props) => {
  const getAuthHeader = useAuthHeader();

  const { data: product, isSuccess } = useQuery({
    queryKey: [`product/${saleItem.productId}`],
    queryFn: () =>
      getResource<Product>(
        `product/${saleItem.productId}`,
        getAuthHeader
      ),
    select: (r) => r.data,
  });

  return (
    <HStack alignItems={"center"} spacing={3}>
      <Icon fontSize={"3xl"} as={IoPricetag} />
      <VStack alignItems="flex-start" spacing={1}>
        <Text fontSize={"md"} fontWeight={"bold"}>{isSuccess && product.name}</Text>
        <Text fontSize={"sm"}>Cantidad: {saleItem.amount}</Text>
        <Text fontSize={"sm"}>${saleItem.unitPrice} C/U</Text>
      </VStack>
      <IconButton
        icon={<AiFillDelete />}
        aria-label="Delete"
        size="sm"
        variant="ghost"
        colorScheme="red"
        onClick={removeItem}
      />
    </HStack>
  );
};

export default SaleItem;

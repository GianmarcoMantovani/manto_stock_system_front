import { HStack, Input, VStack, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  setName: (name: string) => void;
}

const ProductsFilters = ({
  name,
  setName
}: Props) => {
  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"}>
        <Text
          fontWeight="semibold"
          fontSize={"md"}
        >
          Nombre
        </Text>
        <Input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          bgColor="white"
          height="3rem"
        />
      </VStack>
    </HStack>
  );
};

export default ProductsFilters;
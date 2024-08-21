import { HStack, Input, VStack, Text } from "@chakra-ui/react";
import SyncField from "../../components/Dropdowns/SyncField";
import DatesFilters from "../../components/Dropdowns/DatesFilters";

interface Props {
  products: string;
  setProducts: (products: string) => void;
  providerId: number | null;
  setProviderId: (providerId: number | null) => void;
  from: string;
  setFrom: (from: string) => void;
  to: string;
  setTo: (to: string) => void;
}

const PurchasesFilters = ({
  products,
  setProducts,
  providerId,
  setProviderId,
  from,
  setFrom,
  to,
  setTo,
}: Props) => {
  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
          Productos
        </Text>
        <Input
          type={"text"}
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          bgColor="white"
          height="3rem"
        />
      </VStack>
      <VStack alignItems={"flex-start"} w={"12rem"}>
        <SyncField
          labelProp="company"
          title="Proveedor"
          setter={setProviderId}
          resource={"provider"}
          defaultValue={undefined}
          isClearable={providerId != null ? true : false}
        />
      </VStack>
      <DatesFilters from={from} setFrom={setFrom} to={to} setTo={setTo} />
    </HStack>
  );
};

export default PurchasesFilters;

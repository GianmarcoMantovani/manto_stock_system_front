import { HStack, Input, VStack, Text } from "@chakra-ui/react";
import SyncField from "../../components/Dropdowns/SyncField";

interface Props {
  name: string;
  setName: (name: string) => void;
  products: string;
  setProducts: (products: string) => void;
  company: string;
  setCompany: (company: string) => void;
  cityId: number | null;
  setCityId: (cityId: number | null) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const ProvidersFilters = ({
  name,
  setName,
  products,
  setProducts,
  company,
  setCompany,
  cityId,
  setCityId,
  phoneNumber,
  setPhoneNumber,
}: Props) => {
  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
          Nombre Persona
        </Text>
        <Input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          bgColor="white"
          height="3rem"
        />
      </VStack>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
          Nombre Empresa
        </Text>
        <Input
          type={"text"}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          bgColor="white"
          height="3rem"
        />
      </VStack>
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
      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
          Numero de Telefono
        </Text>
        <Input
          type={"text"}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          bgColor="white"
          height="3rem"
        />
      </VStack>
      <VStack alignItems={"flex-start"} w={"12rem"}>
        <SyncField
          title="Ciudad"
          setter={setCityId}
          resource={"provider/cities"}
          defaultValue={undefined}
          isClearable={cityId != null ? true : false}
        />
      </VStack>
    </HStack>
  );
};

export default ProvidersFilters;

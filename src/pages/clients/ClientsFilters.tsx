import { HStack, Input, VStack, Text } from "@chakra-ui/react";
import SyncField from "../../components/Dropdowns/SyncField";
import LabeledReactSelectInput from "../../components/Dropdowns/LabeledReactSelectInput";
import { getClientTypes } from "../../api/api";

interface Props {
  name: string;
  setName: (name: string) => void;
  clientTypeEnum: number | null;
  setClientTypeEnum: (clientTypeEnum: number | null) => void;
  cityId: number | null;
  setCityId: (cityId: number | null) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const ClientsFilters = ({
  name,
  setName,
  clientTypeEnum,
  setClientTypeEnum,
  cityId,
  setCityId,
  phoneNumber,
  setPhoneNumber,
}: Props) => {
  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
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
      <VStack alignItems={"flex-start"} w={"12rem"}>
        <LabeledReactSelectInput
          name="clientTypeEnum"
          value={clientTypeEnum}
          isClearable={true}
          label="Tipo de Cliente"
          options={getClientTypes().map((ct) => ({
            value: ct.id,
            label: ct.code,
          }))}
          setter={setClientTypeEnum}
        />
      </VStack>
    </HStack>
  );
};

export default ClientsFilters;

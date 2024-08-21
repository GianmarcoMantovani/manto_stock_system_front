import { HStack, VStack } from "@chakra-ui/react";
import SyncField from "../../components/Dropdowns/SyncField";
import DatesFilters from "../../components/Dropdowns/DatesFilters";
import SwitchField from "../../components/SwitchField";

interface Props {
  sold: boolean;
  setSold: (sold: boolean) => void;
  clientId: number | null;
  setClientId: (clientId: number | null) => void;
  from: string;
  setFrom: (from: string) => void;
  to: string;
  setTo: (to: string) => void;
}

const SalesFilters = ({
  sold,
  setSold,
  clientId,
  setClientId,
  from,
  setFrom,
  to,
  setTo,
}: Props) => {
  const onSoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSold(event.target.checked);
  };

  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"} w={"30rem"}>
        <SyncField
          title="Cliente"
          setter={setClientId}
          resource={"client"}
          defaultValue={undefined}
          isClearable={clientId != null ? true : false}
        />
      </VStack>
      <DatesFilters from={from} setFrom={setFrom} to={to} setTo={setTo} />
      <SwitchField
        isChecked={sold}
        size={"lg"}
        label="Cobrada"
        name="sold"
        id="sold"
        onChange={onSoldChange}
      />
    </HStack>
  );
};

export default SalesFilters;

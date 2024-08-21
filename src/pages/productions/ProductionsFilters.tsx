import { HStack, Input, VStack, Text } from "@chakra-ui/react";
import moment from "moment";

interface Props {
  from: string;
  setFrom: (from: string) => void;
  to: string;
  setTo: (to: string) => void;
}

const ProductionsFilters = ({ from, setFrom, to, setTo }: Props) => {
    const onFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFrom = e.target.value;
        setFrom(newFrom);
        
        if (to && moment(newFrom).isAfter(moment(to))) {
          setTo("");
        }
      };
    
      const onToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTo = e.target.value;
        setTo(newTo);
    
        if (from && moment(newTo).isBefore(moment(from))) {
          setFrom("");
        }
      };
    
  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
          Desde
        </Text>
        <Input
          type="date"
          value={from}
          onChange={onFromChange}
          bgColor="white"
          height="3rem"
        />
      </VStack>

      <VStack alignItems={"flex-start"}>
        <Text fontWeight="semibold" fontSize={"md"}>
          Hasta
        </Text>
        <Input
          type="date"
          value={to}
          onChange={onToChange}
          bgColor="white"
          height="3rem"
        />
      </VStack>
    </HStack>
  );
};

export default ProductionsFilters;

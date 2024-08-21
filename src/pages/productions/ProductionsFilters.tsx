import { HStack } from "@chakra-ui/react";
import DatesFilters from "../../components/Dropdowns/DatesFilters";

interface Props {
  from: string;
  setFrom: (from: string) => void;
  to: string;
  setTo: (to: string) => void;
}

const ProductionsFilters = ({ from, setFrom, to, setTo }: Props) => {
  return (
    <HStack w={"70%"} spacing={5} mt={3} mr={3}>
      <DatesFilters from={from} setFrom={setFrom} to={to} setTo={setTo} />
    </HStack>
  );
};

export default ProductionsFilters;

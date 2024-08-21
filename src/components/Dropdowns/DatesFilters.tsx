import { Input, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

interface Props {
  from: string;
  setFrom: (from: string) => void;
  to: string;
  setTo: (to: string) => void;
}

const DatesFilters = ({ from, setFrom, to, setTo }: Props) => {
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
    <>
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
    </>
  );
};

export default DatesFilters;

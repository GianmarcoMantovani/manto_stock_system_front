import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResource } from "../../api/api";
import { Balance as TotalBalance } from "../../api/types";
import { HStack, VStack, Text, Center } from "@chakra-ui/react";
import Loading from "../../components/Loading";
import LastSalesModal from "./LastSalesModal";
import LastPurchasesModal from "./LastPurchasesModal";

const Balance = () => {
  const getAuthHeader = useAuthHeader();

  const {
    data: balance,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["provider/balance"],
    queryFn: () => getResource<TotalBalance>("provider/balance", getAuthHeader),
    select: (r) => r.data,
  });

  return (
    <>
      {isSuccess && (
        <Center>
          <VStack width="100%">
            <HStack justifyContent={"center"} width={"100%"} mt={10}>
              <Text
                fontWeight={"bold"}
                fontSize={{
                  base: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                  xl: "4rem",
                }}
              >
                CAPITAL ACTUAL: ${balance.totalCapital}
              </Text>
            </HStack>
            <HStack w={"50%"} ml={200} mt={10} alignSelf={"flex-start"}>
              <LastSalesModal />
              <LastPurchasesModal />
            </HStack>
          </VStack>
        </Center>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Balance;

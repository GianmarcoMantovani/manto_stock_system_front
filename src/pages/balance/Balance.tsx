import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResource } from "../../api/api";
import { Balance as TotalBalance } from "../../api/types";
import { HStack, VStack, Text, Center } from "@chakra-ui/react";
import Loading from "../../components/Loading";

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
          <VStack width="80%" borderRadius={"0.5rem"} bg={"white"} p={1} m={5}>
            <HStack justifyContent={"flex-start"} width={"90%"} mt={4}>
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                  xl: "2rem",
                }}
              >
                {balance.totalCapital}
              </Text>
            </HStack>
          </VStack>
        </Center>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Balance;

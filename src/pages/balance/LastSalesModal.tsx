import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResourceList } from "../../api/api";
import { Sale } from "../../api/types";
import LastSalesData from "./LastSalesData";
import Loading from "../../components/Loading";

const LastSalesModal = () => {
  const getAuthHeader = useAuthHeader();

  const {
    data: sales,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [`sale/last`],
    queryFn: () => getResourceList<Sale>(`sale/last`, getAuthHeader),
    select: (r) => r.data,
  });

  return isLoading ? (
    <Loading />
  ) : (
    <VStack
      w={"fit-content"}
      minW={"35vw"}
      overflowY={"hidden"}
      maxHeight={"100%"}
      borderRadius={"0.5rem"}
    >
      {isSuccess && <LastSalesData sales={sales.items} />}
    </VStack>
  );
};

export default LastSalesModal;

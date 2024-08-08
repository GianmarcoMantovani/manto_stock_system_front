import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResourceList } from "../../api/api";
import { Purchase } from "../../api/types";
import LastPurchasesData from "./LastPurchasesData";
import Loading from "../../components/Loading";

const LastPurchasesModal = () => {
  const getAuthHeader = useAuthHeader();

  const {
    data: purchases,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [`purchase/last`],
    queryFn: () => getResourceList<Purchase>(`purchase/last`, getAuthHeader),
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
      {isSuccess && <LastPurchasesData purchases={purchases.items} />}
    </VStack>
  );
};

export default LastPurchasesModal;

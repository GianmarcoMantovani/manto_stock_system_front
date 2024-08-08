import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Purchase } from "../../api/types";
import DetailedViewBody from "../../components/DetailedViewBody";

interface Props {
  purchases: Purchase[];
}

const LastPurchasesData = ({ purchases }: Props) => {
  return (
    <VStack w={"100%"}>
      <Box alignItems={"center"} paddingTop={1} w={"100%"}>
        <VStack
          align={"center"}
          justify={"center"}
          bgColor={"#FFFFFF"}
          borderRadius={"1.18rem"}
          boxShadow={"md"}
          padding={"0.5rem"}
          alignItems={"center"}
        >
          <VStack>
            <Text
              justifyContent={"center"}
              align={"center"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
              mt={5}
              mb={2}
            >
              ULTIMAS 5 COMPRAS
            </Text>
          </VStack>
          {purchases.map((purchase) => (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={5}
                width={"90%"}
                mb={5}
              >
                <DetailedViewBody
                  resource={purchase.products}
                  label={"Productos"}
                />
                <DetailedViewBody
                  resource={"$" + purchase.amount}
                  label={"Gasto Total"}
                />
              </SimpleGrid>
            </>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default LastPurchasesData;

import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Sale } from "../../api/types";
import DetailedViewBody from "../../components/DetailedViewBody";

interface Props {
  sales: Sale[];
}

const LastSalesData = ({ sales }: Props) => {
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
              ULTIMAS 5 VENTAS
            </Text>
          </VStack>
          {sales.map((sale) => (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={5}
                width={"80%"}
                mb={5}
              >
                <DetailedViewBody
                  resource={sale.client.name}
                  label={"Cliente"}
                />
                <DetailedViewBody
                  resource={"$" + sale.totalPrice.toString()}
                  label={"Precio Total"}
                />
              </SimpleGrid>
            </>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default LastSalesData;

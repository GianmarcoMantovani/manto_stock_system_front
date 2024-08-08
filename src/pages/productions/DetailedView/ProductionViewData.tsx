import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Production } from "../../../api/types";
import DetailedViewBody from "../../../components/DetailedViewBody";
import moment from "moment";

interface Props {
  production: Production;
}

const ProductionViewData = ({ production }: Props) => {
  return (
    <VStack>
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
          <VStack w={"100%"}>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={5}
              width={"80%"}
              mb={5}
            >
              <DetailedViewBody
                resource={production.totalProduction.toString()}
                label={"CANTIDAD TOTAL"}
              />
              <DetailedViewBody
                resource={moment.utc(production.date).format("DD-MM-yyyy")}
                label={"FECHA PRODUCCION"}
              />
            </SimpleGrid>
            <Text
              justifyContent={"center"}
              align={"center"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
              mt={5}
              mb={2}
            >
              PRODUCTOS
            </Text>
          </VStack>
          {production.items.map((item) => (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={5}
                width={"80%"}
                mb={5}
              >
                <DetailedViewBody
                  resource={item.product.name}
                  label={"Producto"}
                />
                <DetailedViewBody
                  resource={item.amount.toString()}
                  label={"Cantidad"}
                />
              </SimpleGrid>
            </>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default ProductionViewData;
